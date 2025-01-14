const {
  DynamoDBClient
} = require('@aws-sdk/client-dynamodb')
const {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  ScanCommand
} = require('@aws-sdk/lib-dynamodb')

async function sendCommand (command) {
  const client = new DynamoDBClient({ region: 'us-east-1', profile: 'Admin' })
  const docClient = DynamoDBDocumentClient.from(client)
  return docClient.send(command)
}

async function getAll (tableName) {
  const params = {
    TableName: tableName
  }
  const command = new ScanCommand(params)
  const response = await sendCommand(command)
  return response.Items
}

async function get (tableName, id) {
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'id = :hkey', // The colon shows that hkey is a variable
    ExpressionAttributeValues: {
      ':hkey': +id // The plus sign is automatic type conversion to an INT in case id is passed as a STRING
    }
  }
  const command = new QueryCommand(params)
  const response = await sendCommand(command)
  return response.Items[0]
}

async function put (tableName, item) {
  const params = {
    TableName: tableName,
    Item: item
  }
  const command = new PutCommand(params)
  return sendCommand(command)
}

module.exports = {
  get,
  getAll,
  put
}
