// Imports
const { 
  CreateDistributionCommand,
  CreateOriginAccessControlCommand
} = require('@aws-sdk/client-cloudfront')
const {
  defaultCacheBehavior,
  origins
} = require('./cloudfront-parameters')
const { sendCloudFrontCommand: sendCommand } = require('./helpers')

const bucketName = 'hamster-bucket-mog4-27-08-2023'

async function execute () {
  try {
    const oac = await createOriginAccessControl()
    
    const response = await createDistribution(bucketName, oac.OriginAccessControl.Id)
    console.log(response)
  } catch (err) {
    console.error('Error creating distribution:', err)
  }
}


async function createOriginAccessControl( ) {
  const params = {
    OriginAccessControlConfig: {
      Name: 'GiveCloudFrontPermissionToAccessS3_abcd',
      OriginAccessControlOriginType: 's3',
      SigningBehavior: 'always',
      SigningProtocol: 'sigv4'
    }
  }
  const command = new CreateOriginAccessControlCommand(params)
  return sendCommand(command)
}


async function createDistribution (bucketName, oac) {
  const params = {
    DistributionConfig: {
      CallerReference: `${Date.now()}`,
      Comment: 'HBFL Distribution- Testing', //Description
      DefaultCacheBehavior: defaultCacheBehavior(bucketName),
      Origins: origins(bucketName, oac),
      HttpVersion: 'http2',
      PriceClass: 'PriceClass_100',
      IsIPV6Enabled: true,
      Enabled: true
    }
  }
  const command = new CreateDistributionCommand(params)
  return sendCommand(command)
}

execute()
