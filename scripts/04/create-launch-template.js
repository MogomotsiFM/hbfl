// Imports
const {
  CreateLaunchTemplateCommand
} = require('@aws-sdk/client-ec2')

const helpers = require('./helpers')

const ltName = 'hamsterLT'
const roleName = 'hamsterLTRole0'
const sgName = 'hamster_sg_60'
const keyName = 'hamster_key_60'

async function execute () {
  try {
    const profileArn = await helpers.createIamRole(roleName)
    const response = await createLaunchTemplate(ltName, profileArn)
    console.log('Created launch template with:', response)
  } catch (err) {
    console.error('Failed to create launch template with:', err)
  }
}

// The profileArn role gives the instance permission to talk to AWS services.
async function createLaunchTemplate (ltName, profileArn) {
  const params = {
    LaunchTemplateName: ltName,
    LaunchTemplateData: {
      IamInstanceProfile: {
        Arn: profileArn
      },
      ImageId: 'ami-008840b11ff67e7b1',
      InstanceType: 't2.micro',
      KeyName: keyName,
      SecurityGroups: [sgName],
      // This calls git update on hbfl and then starts the server.
      UserData: 'IyEvYmluL2Jhc2gKY2QgaG9tZS9lYzItdXNlcgpjZCBoYmZsCmdpdCBwdWxsCnN1ZG8gbnBtIGkKc3VkbyBucG0gYXVkaXQgZml4IC0tZm9yY2UKc3VkbyBucG0gcnVuIHN0YXJ0'
    }
  }
  const command = new CreateLaunchTemplateCommand(params)
  return helpers.sendCommand(command)
}

execute()