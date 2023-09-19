const { CloudWatchClient } = require('@aws-sdk/client-cloudwatch')
const { SNSClient } = require('@aws-sdk/client-sns')
const { SecretsManagerClient } = require('@aws-sdk/client-secrets-manager')

async function sendSecretsManagerCommand(command) {
  const client = new SecretsManagerClient({ region: "us-east-1", profile: "Admin"})
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
  sendSecretsManagerCommand
}
