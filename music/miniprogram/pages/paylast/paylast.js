// pages/paylast/paylast.js
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

  },
  change(event){
console.log(event)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  submit(){
    const ordernum=new Date().getTime()
    const order=ordernum.toString()
    const money=parseFloat(this.data.money)
    console.log(order)
    wx.showLoading({
    
    })
    wx.cloud.callFunction({
      name: 'pay',
      data: {
        outTradeNo:order,
        price:money,
        
      },
      success: res => {
        
        const payment = res.result.payment
        wx.requestPayment({
          ...payment,
          success (res) {
        
            wx.hideLoading({
              success: (res) => {
               wx.showToast({
                 title: '支付成功',
               })
               
              },
            })
            
             wx.navigateBack({
               delta: 1000,
             })
             
          },
          fail (err) {
            console.log(err)
           wx.showToast({
             title: '支付失败',
             icon:"none"
           })
          }
        })
      },
      fail:res=>{
        console.log("调用支付失败"+res)
      },
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