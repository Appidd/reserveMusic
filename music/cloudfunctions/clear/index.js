// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('goods').where({
      history: true
}).update({
      data: {
        history:false
      },
      success:res=>{
        // console.log("fdsa")
      }
    })
  } catch(e) {
    console.error(e)
  }

}