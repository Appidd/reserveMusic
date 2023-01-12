// pages/contactus/contactus.js
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
this.getinfo()
this.getadress()
  },
  getadress(){
    db.collection('address').get({
      success:res=>{
        console.log(res)
        this.setData({
          latitude:res.data[0].latitude,
          longitude:res.data[0].longitude
        })
      }
    })
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
      phoneNumber: this.data.info.gphone,
    })
  },
  call2(){
    wx.makePhoneCall({
      phoneNumber: this.data.info.yphone,
    })
  },
  copy: function () {
    const title = '请复制微信号添加'
    const content = this.data.info.wechat

    wx.showModal({
      title: title,
      content: content,
      cancelText: '取消',
      confirmText: '复制',
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击复制')
          wx.setClipboardData({
            data: content,
            success: (res) => {
              wx.showToast({
                title: '复制成功',
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
openadress(){
  const latitude = this.data.latitude
   const longitude = this.data.longitude
  wx.openLocation({
    latitude,
    longitude,
    scale: 18
  })
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