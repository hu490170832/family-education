// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const { moneySortType } = event
  if(moneySortType == 2) {
    return db.collection('teachers').get().orderBy('min_wage','desc')
  }else if(moneySortType == 3) {
    return db.collection('teachers').get().orderBy('min_wage','asc')
  }else {
    return db.collection('teachers').get()
  }
}