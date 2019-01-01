const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  const _id = event._id
  const statu = event.statu
  try {
    return await db.collection('teachers').doc(-id).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        is_collected: statu
      }
    })
  } catch (e) {
    console.error(e)
  }
}