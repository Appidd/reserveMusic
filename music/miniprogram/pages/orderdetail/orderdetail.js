// pages/orderdetail/orderdetail.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
const id=options.id
this.getdetail(id)
this.getinfo()
  },
  a(a){
    switch (a) {
      case 0:
        return '周日'
        break;
      case 1:
        return '周一'
        break;
      case 2:
        return '周二'
        break;
      case 3:
        return '周三'
        break;
      case 4:
        return '周四'
        break;
      case 5:
        return '周五'
        break;
      case 6:
        return '周六'
        break;

    
  }
  },
getdetail(id){
  const that=this
  db.collection('order').doc(id).get({
    success:res=>{
      console.log(res.data)
      const a = new Date(res.data.ytime.replace(/-/g, "/")).getDay()
      const week=this.a(a)
      this.setData({
        week,
        goods:res.data,
        xtime:that.rendertime(res.data.xtime)
      })
      
    }
  })
},
rendertime(now){
  var year = now.getFullYear();  //取得4位数的年份
  var month = now.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
  var date = now.getDate();      //返回日期月份中的天数（1到31）
  var hour = now.getHours();     //返回日期中的小时数（0到23）
  var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
  var second = now.getSeconds(); //返回日期中的秒数（0到59）
  return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;  
},
  getinfo(){
    db.collection('contactus').get({
      success:res=>{
        this.setData({
          info:res.data[0]
        })
      }
    })
  },
    call1(){
      wx.makePhoneCall({
        phoneNumber: this.data.info.yphone,
      })
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})