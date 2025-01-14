const {
  KinesisClient,
  PutRecordCommand
} = require('@aws-sdk/client-kinesis')

const client = new KinesisClient({ region: 'us-east-1', profile: 'Admin' })

async function send (streamName, partition, msg) {
  const params = {
    Data: Buffer.from(JSON.stringify(msg)),
    PartitionKey: partition,
    StreamName: streamName
  }

  try {
    const command = new PutRecordCommand(params)
    const data = await client.send(command)
    console.log(`Put Kinesis record with: ${JSON.stringify(data)}`)
  } catch (err) {
    console.error('Error putting record to Kinesis', err)
  }
}

module.exports = { send }
