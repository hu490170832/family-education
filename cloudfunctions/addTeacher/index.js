const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    await db.collection('teachers').add({
      // data 字段表示需新增的 JSON 数据
      data: event
    })
    return {
      code: 0,
      msg: 'success'
    }
  } catch (e) {
    console.error(e)
  }
}