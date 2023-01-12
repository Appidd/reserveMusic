// pages/detail/detail.js
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
    console.log(id)
    this.setData({
      id:id
    })
    this.getgoods(id)
   
  },
  getgoods(id){
    db.collection('goods').doc(id).get({
      success:res=>{
        this.setData({
          goods:res.data
        })
        
      }
    })
  },
  tolist(){
    wx.navigateTo({
      url: '../myorder/myorder',
    })
  },
  tohome(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */


  show(){
    wx.makePhoneCall({
      phoneNumber: '18928467356',
    })
  },
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