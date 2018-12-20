// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const { moneySortType,page,pageSize } = event
  if(moneySortType == 2) {
    return await  db.collection('teachers').orderBy('min_wage','desc').skip(pageSize*page).limit(5).get()
  }else if(moneySortType == 3) {
    return await  db.collection('teachers').orderBy('min_wage','asc').skip(pageSize*page).limit(5).get()
  }else {
    return await  db.collection('teachers').skip(pageSize*page).limit(5).get()
  }
}