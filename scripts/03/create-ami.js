// Imports
const {
  EC2Client,
  CreateImageCommand
} = require('@aws-sdk/client-ec2')

function sendCommand (command) {
  const client = new EC2Client({ region: 'us-east-1', profile: 'Admin' })
  return client.send(command)
}

createImage('i-00f3ac00d4d254346', 'hamsterImage')
  .then(() => console.log('Complete'))

async function createImage (seedInstanceId, imageName) {
    const params = {
      InstanceId: seedInstanceId,
      Name: imageName
    }
    const command = new CreateImageCommand(params)
    return sendCommand(command)
}
