const { CloudWatchClient } = require('@aws-sdk/client-cloudwatch')
const { SNSClient } = require('@aws-sdk/client-sns')
const { KMSClient } = require('@aws-sdk/client-kms')

async function sendKMSCommand(command) {
  const client  = new KMSClient({ region: "us-east-1", profile: "Admin" })
  return client.send(command)
}
async function sendSNSCommand (command) {
  const client = new SNSClient({ region: 'us-east-1', profile: 'Admin' })
  return client.send(command)
}

async function sendCloudWatchCommand (command) {
  const client = new CloudWatchClient({ region: 'us-east-1', profile: 'Admin' })
  return client.send(command)
}

module.exports = {
  sendCloudWatchCommand,
  sendSNSCommand,
  sendKMSCommand
}
