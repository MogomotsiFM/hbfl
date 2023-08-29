// Imports
const {
  PutObjectCommand
} = require('@aws-sdk/client-s3')
const helpers = require('./helpers')

// Declare local variables
const bucketName = 'hamster-bucket-mogomotsi-27-08-2023'

async function execute () {
  try {
    const files = await helpers.getPublicFiles()

    for (const file of files) {
      const response = await uploadS3Object(bucketName, file)
      console.log('Uploaded file with ETag:', response.ETag)
    }

    console.log('Uploaded all files')
  } catch (err) {
    console.error('Error uploading files to S3:', err)
  }
}

async function uploadS3Object (bucketName, file) {
  const params = {
    Bucket: bucketName,
    // AWS made it impossible to make S3 buckets public. It seems bucket contents cannot be public as well
    // ACL: 'public-read', 
    Body: file.contents,
    Key: file.name,
    ContentType: helpers.getContentType(file.name)
  }
  const command = new PutObjectCommand(params)
  return helpers.sendS3Command(command)
}

execute()
