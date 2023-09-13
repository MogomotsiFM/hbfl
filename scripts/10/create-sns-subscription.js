// Imports
const {
  SubscribeCommand
} = require('@aws-sdk/client-sns')

const { 
  sendKMSCommand,
  sendSNSCommand: sendCommand 
} = require('./helpers')

const {
  DecryptCommand,
  KMSClient
} = require('@aws-sdk/client-kms')

// Declare local variables
const type = 'sms'
const encryptedPhoneNumber = 'AQICAHiSg2VEiyNrQ/WBsj+bSNRDAPLcX7E7wpAZ7h4JStghtwEV/I3MAOXzc2qYnt7OyI9gAAAAajBoBgkqhkiG9w0BBwagWzBZAgEAMFQGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQM0YWMEaaClX4jF7ixAgEQgCeGvJ/m3bC9xrCqx9NKCjmEBeZZfbEJa+A9WTJxMjV47RwNmTfl4L0='
const encryptionKeyAlias = 'alias/phone-number'
const topicArn = 'arn:aws:sns:us-east-1:620502844819:hamster-topic'

async function execute () {
  try {
    const r = await decryptPhoneNumber(encryptedPhoneNumber, encryptionKeyAlias)
    const plainTextBase64 = r['Plaintext']
    const endpoint = Buffer.from(plainTextBase64, 'base64').toString('ascii')
    
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

async function decryptPhoneNumber(encryptedPhoneNumber, encryptionKeyAlias) {
  const params = {
    CiphertextBlob: Buffer.from(encryptedPhoneNumber, 'base64'),
    KeyId: encryptionKeyAlias,
    EncryptionAlgorithm: "SYMMETRIC_DEFAULT",
    DryRun: false
  }

  const command = new DecryptCommand(params)
  return sendKMSCommand(command)
}

execute()
