const {
  SQSClient,
  GetQueueUrlCommand,
  SendMessageCommand
} = require('@aws-sdk/client-sqs')

const client = new SQSClient({ region: 'us-east-1', profile: 'Admin' })

async function push (queueName, msg) {
  // Get sqs queue URL
  const qParams = {
    QueueName: queueName
  }
  const qCommand = new GetQueueUrlCommand(qParams)
  const qResponse = await client.send(qCommand)

  // Then send message to queue url
  const sendParams = {
    MessageBody: JSON.stringify(msg),
    QueueUrl: qResponse.QueueUrl
  }
  const sendCommand = new SendMessageCommand(sendParams)
  return client.send(sendCommand)
}

module.exports = { push }
