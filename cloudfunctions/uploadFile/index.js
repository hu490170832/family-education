const cloud = require('wx-server-sdk')
cloud.init()
const fs = require('fs')
const path = require('path')

exports.main = async (event, context) => {
  const filePath = event.filePath
  const fileStream = fs.createReadStream(path.join(__dirname, filePath))
  return await cloud.uploadFile({
    cloudPath: 'demo.jpg',
    fileContent: fileStream,
  })
}