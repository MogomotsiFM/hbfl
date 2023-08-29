// Imports
const {
    CreateLaunchTemplateVersionCommand
  } = require('@aws-sdk/client-ec2')
  
  const helpers = require('./helpers')
  
  const ltName = 'hamsterLT'
  
  async function execute () {
    try {
      const lt = await helpers.getLaunchTemplateVersion(ltName)
      const response = await updateLaunchTemplate(lt)
      console.log('Created a new version of launch template with:', response)
    } catch (err) {
      console.error('Failed to create a new version of launch template with:', err)
    }
  }

  
  // The profileArn role gives the instance permission to talk to AWS services.
  async function updateLaunchTemplate (lt) {
    const params = {
        LaunchTemplateName: lt.LaunchTemplateName,
        LaunchTemplateData: lt.LaunchTemplateData
    }
    params.LaunchTemplateData.UserData = 'IyEvYmluL2Jhc2gKc3VkbyBhcHQtZ2V0IHVwZGF0ZQpzdWRvIGFwdC1nZXQgLXkgaW5zdGFsbCBnaXQKcm0gLXJmIC9ob21lL2JpdG5hbWkvaGJmbApnaXQgY2xvbmUgaHR0cHM6Ly9naXRodWIuY29tL01vZ29tb3RzaUZNL2hiZmwuZ2l0IC9ob21lL2JpdG5hbWkvaGJmbApjaG93biAtUiBiaXRuYW1pOiAvaG9tZS9iaXRuYW1pL2hiZmwKY2QgL2hvbWUvYml0bmFtaS9oYmZsCm5wbSBjaQpzdWRvIG5wbSBhdWRpdCBmaXggLS1mb3JjZQpucG0gcnVuIHN0YXJ0'
    
    const command = new CreateLaunchTemplateVersionCommand(params)
    return helpers.sendCommand(command)
  }
  
  execute()