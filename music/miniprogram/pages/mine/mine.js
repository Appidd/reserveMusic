// pages/mine/mine.js
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
 this.getuserinfo()
 this.getopenid()
  },
  getuserinfo(){
    wx.getStorage({
      key: 'userinfo',
      success:res=>{
        console.log(res)
        this.setData({
          showlogin:false,
          userinfo:res.data
        })
      },
      fail:err=>{
        console.log(err)
        this.setData({
          showlogin:true
        })
       
      }
    })
  },
  getopenid(){
    wx.getStorage({
      key: 'openid',
      success:res=>{
        console.log(res)
       this.getuser(res.data)
       

      },
      fail:err=>{
        console.log(err)
        this.setData({
          showlogin:true
        })
       
      }
    })
  },
  getuser(openid){
db.collection('userInfo').where({
  uniopid:openid
}).get({
 success:res=>{
   if(res.data){
    this.setData({
      maimiao:res.data[0].maiseed,
      yhui:res.data[0].yhui,
      showm:res.data[0].manager
    })
   }

 }
})
  },
  tomanage(){
    wx.navigateTo({
      url: '../orderman/orderman',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  tohome(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  onReady: function () {

  },
  call(){
    wx.makePhoneCall({
      phoneNumber: '18928467356',
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
  send(){
    wx.cloud.callFunction({
      name:'sendtomanager',
      success:res=>{
        console.log(res)
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */


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