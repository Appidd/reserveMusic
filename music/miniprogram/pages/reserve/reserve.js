// pages/reserve/reserve.js
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
    

    
this.getgoods()

this.getpicture()
this.getbcj()
  },
  getbcj(){
    db.collection('bcj').get({
      success:res=>{
       this.setData({
         bcj:res.data[0]
       })
      }
    })
  },
  getgoods(){
    db.collection('goods').get({
      success:res=>{
     var list=res.data
     var lyzp=list.filter(p=>{
       return p.whereis=='录音租棚'
     })
     var hqzz=list.filter(p=>{
      return p.whereis=='后期制作'
    })
    var ps=list.filter(p=>{
      return p.whereis=='拍摄+'
    })
    var yycz=list.filter(p=>{
      return p.whereis=='音乐创作'
    })
    var yhtc=list.filter(p=>{
      return p.whereis=='优惠套餐'
    })
this.setData({
  lyzp,
  hqzz,
  ps,
  yycz,
  yhtc
})

      }
    })
  },
 
  getpicture(){
    db.collection('images').where({
      pageName:'线上预定'
    }).get({
      success:res=>{
       const a=res.data[0].pictures
        this.setData({
          imgUrls:a
        })
      }
    })
  },
  todetail:function(event){
    console.log(event.currentTarget.id)
    const id=event.currentTarget.id
    wx.navigateTo({
      url: '../detail/detail?id='+id,
    })
  },
  todetail1:function(event){
    console.log(event.currentTarget.id)
    const id=event.currentTarget.id
    wx.navigateTo({
      url: '../detail1/detail1?id='+id,
    })
  },
  tobcj(){
    wx.navigateTo({
      url: '../paylast/paylast',
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
    if(getCurrentPages().length !=0){
      getCurrentPages()[getCurrentPages().length-1].onLoad()
    }
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