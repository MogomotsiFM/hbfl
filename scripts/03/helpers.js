const { mkdir, writeFile } = require('fs/promises')
const path = require('path')
const os = require('os')

async function persistKeyPair (keyData) {
  const keyPath = path.join(os.homedir(), '.ssh', keyData.KeyName)
  const options = {
    encoding: 'utf8',
    mode: 0o600
  }

  try {
    console.debug(`Private key location: ${keyPath}`)
    try {
      await mkdir(path.join(os.homedir(), '.ssh'))
    } catch (err) {
      //Swallow the exception essentially assuming that the folder already exists
      console.debug('The folder already exists')
    }
    await writeFile(keyPath, keyData.KeyMaterial, options)
    console.log('Key written to', keyPath)
    return keyData.KeyName
  } catch (err) {
    throw new Error('Error writing keypair locally:', err)
  }
}

module.exports = {
  persistKeyPair
}
