const cloud = require('wx-server-sdk')

cloud.init({
  env: 'music-4g0iqctb98a280bc',
})

// 云函数入口函数
exports.main = async (event, context) => {

  const res = await cloud.cloudPay.unifiedOrder({
    "body" : "来麦秀录音棚",
    "outTradeNo" :event.outTradeNo,
    "spbillCreateIp" : "127.0.0.1",
    "subMchId" : "1542512221",
    "totalFee" :event.price*100,
    "envId": "music-4g0iqctb98a280bc",
    "functionName": "pay_cb",
    
    "attach":event.outTradeNo
  })
  return res
}


