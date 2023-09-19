// Imports
const {
  SubscribeCommand
} = require('@aws-sdk/client-sns')

const {
  sendSecretsManagerCommand,
  sendSNSCommand: sendCommand 
} = require('./helpers')

const {
  GetSecretValueCommand
} = require('@aws-sdk/client-secrets-manager')


// Declare local variables
const type = 'sms'
const secret_name = 'phone_number'
const topicArn = 'arn:aws:sns:us-east-1:620502844819:hamster-topic'

async function execute () {
  try {
    const endpoint = await getPhoneNumber(secret_name)

    const response = await createSubscription(type, topicArn, endpoint)
    console.log(response)
  } catch (err) {
    console.error('Error subscribing to topic:', err)
  }
}

async function createSubscription (type, topicArn, endpoint) {
  const params = {
    Protocol: type,
    TopicArn: topicArn,
    Endpoint: endpoint
  }
  const command = new SubscribeCommand(params)
  return sendCommand(command)
}

async function getPhoneNumber(secret_name) {
  const params = {
    SecretId: secret_name
  }
  const command = new GetSecretValueCommand(params)
  const secrets = await sendSecretsManagerCommand(command)
  const json = JSON.parse( secrets.SecretString )
  return json['phone_number']
}

execute()
