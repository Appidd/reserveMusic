const cloud = require('wx-server-sdk')
cloud.init({
  env: 'music-4g0iqctb98a280bc',
})
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.uniformMessage.send({
        "touser": 'oTcmf4iTwjogOk4MO77wO_BQLxqc',
        "mpTemplateMsg": {
          "appid": 'wxa11b5ba8d234670d',
          
          "miniprogram": {
            "appid": 'wxbdb1e3d81d2089db',
            "pagepath": 'pages/orderman/orderman'
          },
          "data": {
            "first": {
              "value": '你有新的客户预约！',
              "color": '#173177'
            },
            "keyword1": {
              "value": event.yname,
              "color": '#173177'
            },
            "keyword2": {
              "value": event.yphone,
              "color": '#173177'
            },
            "keyword3": {
              "value": event.yserve,
              "color": '#173177'
            },
            "keyword4": {
              "value": event.ytime,
              "color": '#173177'
            },
            "keyword5": {
              "value": event.ptime,
              "color": '#173177'
            },
            "remark": {
              "value": event.remark,
              "color": '#173177'
            }
          },
          "templateId": 'DBvMhb8A5tJBiLH94FY7pONJh9uywmc6x9gcIqOm7LA'
        }
      })
    return result
  } catch (err) {
    return err
  }
}