// Imports
const {
  EC2Client,
  AuthorizeSecurityGroupIngressCommand,
  CreateKeyPairCommand,
  CreateSecurityGroupCommand,
  DescribeSecurityGroupsCommand,
  RunInstancesCommand
} = require('@aws-sdk/client-ec2')
const helpers = require('./helpers')

function sendCommand (command) {
  const client = new EC2Client({ region: 'us-east-1', profile: 'Admin' })
  const response = client.send(command)
  console.debug("Here")
  return response
}

// Declare local variables
const sgName = 'hamster_sg_60'
const keyName = 'hamster_key_60'

// Do all the things together
async function execute () {
  try {
    await createSecurityGroup(sgName)
    console.debug('Created security group')
    const keyPair = await createKeyPair(keyName)
    await helpers.persistKeyPair(keyPair)
    console.debug('Created key pair')
    const data = await createInstance(sgName, keyName)
    console.log('Created instance with:', data)
  } catch (err) {
    console.error('Failed to create instance with:', err)
  }
}

// Create functions
async function createSecurityGroupHelper(sgName) {
  const sgParams = {
    Description: sgName,
    GroupName: sgName
  }

  try {
    const createCommand = new CreateSecurityGroupCommand(sgParams)
    const data = await sendCommand(createCommand)
    return data
  } catch (err) {
    const params = {
      GroupNames: [ sgName ]
    }
    const command = new DescribeSecurityGroupsCommand(params)
    const data = await sendCommand(command)
    console.debug("Describe security group: ", data)
    return data.SecurityGroups[0]
  }
}
async function createSecurityGroup (sgName) {
  const data = await createSecurityGroupHelper(sgName)

  const rulesParams = {
    GroupId: data.GroupId,
    IpPermissions: [
      {
        IpProtocol: 'tcp',
        //Allow ssh
        FromPort: 22,
        ToPort: 22,
        //Give access to everybody
        IpRanges: [{ CidrIp: '0.0.0.0/0' }]
      },
      {
        IpProtocol: 'tcp',
        //Allow traffic to the hamster ball fantasy league app server
        FromPort: 3000,
        ToPort: 3000,
        //Give access to everybody
        IpRanges: [{ CidrIp: '0.0.0.0/0'}]
      }
    ]
  }

  const authCommand = new AuthorizeSecurityGroupIngressCommand(rulesParams)
  return sendCommand(authCommand)
}

async function createKeyPair (keyName) {
  const params = {
    KeyName: keyName
  }
  const command = new CreateKeyPairCommand(params)
  return sendCommand(command)
}

async function createInstance (sgName, keyName) {
  const params = {
    ImageId: 'ami-008840b11ff67e7b1', // hamsterImage which has NodeJS and git installed
    InstanceType: 't2.micro',
    KeyName: keyName,
    MaxCount: 1,
    MinCount: 1,
    SecurityGroups: [ sgName ],
    UserData: 'IyEvYmluL2Jhc2gKY2QgaG9tZS9lYzItdXNlcgpjZCBoYmZsCmdpdCBwdWxsCnN1ZG8gbnBtIGkKc3VkbyBucG0gYXVkaXQgZml4IC0tZm9yY2UKc3VkbyBucG0gcnVuIHN0YXJ0'
  }
  const command = new RunInstancesCommand(params)
  return sendCommand(command)
}

execute()
