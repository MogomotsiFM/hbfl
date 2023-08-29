// Imports
const {
  CreateBucketCommand,
  PutBucketPolicyCommand
} = require('@aws-sdk/client-s3')
const { sendS3Command } = require('./helpers')

// Declare local variables
const bucketName = 'hamster-bucket-mogomotsi-27-08-2023'

async function execute () {
  try {
    const response = await createBucket(bucketName)
    console.log('Created S3 Bucket with:', response)
  } catch (err) {
    console.error('Error creating S3 Bucket:', err)
  }
}

async function createBucket (bucketName) {
  const params = {
    Bucket: bucketName//,
    //ACL: 'public-read' //AWS disable public access of all S3 buckets
  }
  const command = new CreateBucketCommand(params)
  return sendS3Command(command)
  
  console.log('Created S3 Bucket with:', response)

  // Attach a policy that allows public read access to the bucket
  const readOnlyAnonUserPolicy = {
    Version: "2012-10-17",
    Id: "abcd",
    Statement: [
      {
        Sid: "AddPerm",
        Effect: "Allow",
        Principal: "*",
        Action: [
          "s3:GetObject"
        ],
        Resource: [
          `arn:aws:s3:::${bucketName}/*`
        ]
      }
    ]
  }

  const bucketPolicyParams = {
    Bucket: bucketName, 
    Policy: JSON.stringify(readOnlyAnonUserPolicy)
  }
  const adjustBucketPolicyCommand = new PutBucketPolicyCommand(bucketPolicyParams)
  return sendS3Command(adjustBucketPolicyCommand)
  //const command = new CreateBucketCommand(bucketPolicyParams)
  //return sendS3Command(command)
}

execute()
