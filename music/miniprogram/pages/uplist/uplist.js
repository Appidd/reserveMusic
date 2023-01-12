// pages/orderdetail/orderdetail.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usetype: '待使用',
    edit: true,
    option1: [
      { text: '待使用', value: "待使用" },
      { text: '已使用', value: "已使用" }
      
    ],
    usetype: "待使用",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    this.setData({
      id
    })
    this.getdetail(id)
    this.getinfo()
    this.getopenid()
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
     
      editm:res.data[0].edit_order
    })
   }

 }
})
  },

  edit() {
    const editm=this.data.editm
    const edit=this.data.edit
    if(editm){
      this.setData({
        edit:!edit
      })
    }else{
      wx.showToast({
        title: '暂无权限',
        icon:'none'
      })
    }
   
     
   
  },
  change(e){

this.setData({
  usetype:e.detail
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
  rendertime(now){
    var year = now.getFullYear();  //取得4位数的年份
    var month = now.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
    var date = now.getDate();      //返回日期月份中的天数（1到31）
    var hour = now.getHours();     //返回日期中的小时数（0到23）
    var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
    var second = now.getSeconds(); //返回日期中的秒数（0到59）
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;  
  },
  getdetail(id) {
    const that=this
    db.collection('order').doc(id).get({
      success: res => {
        console.log(res.data)
        const a = new Date(res.data.ytime.replace(/-/g, "/")).getDay()
        const week=this.a(a)
        console.log(week)
        const usetype=res.data.usetype
       
        this.setData({
          week,
          goods: res.data,
          yname: res.data.yname,
          yphone: res.data.yphone,
          yemail: res.data.yemail,
          remark: res.data.remark,
          remark1: res.data.remark1,
          usetype:res.data.usetype,
          xtime:that.rendertime(res.data.xtime)
        })

      }
    })
  },

  getinfo() {
    db.collection('contactus').get({
      success: res => {
        this.setData({
          info: res.data[0]
        })
      }
    })
  },
  call1() {
    wx.makePhoneCall({
      phoneNumber: this.data.info.yphone,
    })
  },
  submit(){
    const yname=this.data.yname
    const  yphone=this.data. yphone
    const yemail=this.data.yemail 
    const  remark=this.data. remark
    const  remark1=this.data. remark1
    const usetype=this.data.usetype
    const id=this.data.id
    const editm=this.data.editm
   console.log(yname,yphone,yemail,remark,remark1,usetype)
    if(editm){
      db.collection('order').doc(id).update({
        data:{
         usetype,
         yname,
         yphone,
         remark,
         remark1
        },
        success:res=>{
          wx.showToast({
            title: '修改成功',
            icon:'none'
          })
          setTimeout(()=>{
            wx.navigateBack({
              delta: 0,
            })
          },700)
        }
      })
    }else{
      wx.showToast({
        title: '暂无权限',
        icon:'none'
      })
    }
  
   
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