// Imports
const {
  CreateLaunchTemplateCommand,
  CreateLaunchTemplateVersionCommand
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
      UserData: 'IyEvYmluL2Jhc2gKc3VkbyBhcHQtZ2V0IHVwZGF0ZQpzdWRvIGFwdC1nZXQgLXkgaW5zdGFsbCBnaXQKcm0gLXJmIC9ob21lL2JpdG5hbWkvaGJmbApnaXQgY2xvbmUgaHR0cHM6Ly9naXRodWIuY29tL01vZ29tb3RzaUZNL2hiZmwuZ2l0IC9ob21lL2JpdG5hbWkvaGJmbApjaG93biAtUiBiaXRuYW1pOiAvaG9tZS9iaXRuYW1pL2hiZmwKY2QgL2hvbWUvYml0bmFtaS9oYmZsCnN1ZG8gbnBtIGNpCnN1ZG8gbnBtIGF1ZGl0IGZpeCAtLWZvcmNlCnN1ZG8gbnBtIHJ1biBzdGFydA=='
    }
  }
  const command = new CreateLaunchTemplateCommand(params)
  return helpers.sendCommand(command)
}

execute()