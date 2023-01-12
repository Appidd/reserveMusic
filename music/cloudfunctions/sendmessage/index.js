

const cloud = require('wx-server-sdk')
cloud.init({
  env: 'music-4g0iqctb98a280bc',
})
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
        "touser": event.openid,
        "page": 'pages/myorder/myorder',
        "lang": 'zh_CN',
        "data": {
          "thing28": {
            "value": event.yserve
          },
          "time26": {
            "value": event.ytime
          },
          "time27": {
            "value":event.ptime
          },
          "name5": {
            "value": event.yname
          },
          "phone_number19": {
            "value": event.yphone
          },
        
        },
        "templateId": 'qcsbBIvjk5h-Vs9KTGL2rlhvZe0FI8GpZTZgxDpUTzM',
        "miniprogramState": 'developer'
      })
    return result
  } catch (err) {
    return err
  }
}