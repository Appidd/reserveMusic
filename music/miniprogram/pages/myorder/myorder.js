// pages/myorder/myorder.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
this.getopenid()

  },
  getopenid(){
    wx.getStorage({
      key: 'openid',
      success:res=>{
        console.log(res)
       this.getlist(res.data)
this.setData({
  openid:res.data
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
  getlist(openid){
    const a=this
    wx.cloud.callFunction({
      name:'getorder',
      data:{
        openid
      },
      success:res=>{
        console.log(res)
             a.renderList(res.result.data)
      },
      fail:err=>{
        console.log(err)
      }
    })

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
  renderList: function (a) {
    console.log(a.length)
    console.log(a)

    for (var e = [], t = 0; t < a.length; t++) {
     
        var i = a[t];
       
        var today = new Date().getTime();
        console.log(today)
        var time=i.ptime
        var timear=time.split('-')
        var tbegin=timear[0]+":00"
        var tend=timear[1]+":00"
        var begin=i.ytime+' '+tbegin
        var end=i.ytime+' '+tend
        var ybegin =new Date(begin).getTime()
        var yend=new Date(end).getTime()
        // console.log(begin,end)
        console.log(ybegin,yend)
        if(today<ybegin){
          var state="待使用"
        }else if(today>yend){
          var state="已结束"
        }else{
          var state="使用中"
        }
        // if(i.yserve=='录音: B棚 | Recording@Studio B'){
        //   i.yserve='录音: B棚 | Rec@Studio B'
        // }
        //  if(i.yserve=='录音: A棚 | Recording@Studio A'){
        //   i.yserve='录音: A棚 | Rec@Studio A'
  
        e.push({
        
            _id: i._id,
            ordernum: i.ordernum,
            goodsPicture:i.goods.goodsPicture,
            yserve:i.yserve,
            ytime:i.ytime,
            ptime:i.ptime,
            nowPrice:i.goods.nowPrice,
            timelong:i.timelong,
            xmoney:i.xmoney,
            state:state
        });
   
    }
    this.setData({
      list:e
    })
    console.log(e)
},
  todetail(event){
   console.log(event.currentTarget.dataset.id)
   const id=event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../orderdetail/orderdetail?id='+id,
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
    wx.getStorage({
      key: 'openid',
      success:res=>{
        console.log(res)
       this.getlist(res.data)
this.setData({
  openid:res.data
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