// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'music-4g0iqctb98a280bc',
})
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
return await db.collection('order').orderBy('xtime','desc').where({
  _openid:event.openid
}).get()
 
}