// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const { moneySortType,page,pageSize,area,sex,targetGrade,tragetSubjectList } = event
  const param = dealObjectValue({area,sex,targetGrade})
  if(moneySortType == 2) {
    return await  db.collection('teachers').where(param).orderBy('min_wage','desc').skip(pageSize*page).limit(pageSize).get()
  }else if(moneySortType == 3) {
    return await  db.collection('teachers').where(param).orderBy('min_wage','asc').skip(pageSize*page).limit(pageSize).get()
  }else {
    return await  db.collection('teachers').where(param).skip(pageSize*page).limit(pageSize).get()
  }
}

function dealObjectValue(obj){
  var param = {};
  if ( obj === null || obj === undefined || obj === "" ) return param;
  for ( var key in obj ){
    if(  obj[key] !== null && obj[key] !== undefined && obj[key] !== ""  ){
      param[key] = obj[key];
    }
  }
  return param;
};