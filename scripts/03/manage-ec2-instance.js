// Imports
const {
  EC2Client,
  DescribeInstancesCommand,
  TerminateInstancesCommand
} = require('@aws-sdk/client-ec2')

function sendCommand (command) {
  const client = new EC2Client({ region: 'us-east-1', profile: 'Admin' })
  return client.send(command)
}

async function listInstances () {
  const params = {
    Filters: [
      {
        Name: "instance-state-name",
        Values: [ "pending", "running" ]
      }
    ]
  }
  const command = new DescribeInstancesCommand(params)
  const data = await sendCommand(command)
  return data.Reservations.reduce((i, r) => {
    return i.concat(r.Instances)
  }, [])
}

async function terminateInstance (instanceId) {
  const params = {
    InstanceIds: [ instanceId ]
  }
  const command = new TerminateInstancesCommand(params)
  return sendCommand(command)
}

await listInstances().then(console.log)
console.debug("\n\n\nTerminating the instance")
terminateInstance("i-0fd8bdc5d5eb0778b").then(console.log)
