// pages/userinfo/userinfo.js
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
    this.getuser()
this.getuserinfo()
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
      
       
      }
    })
  },
  getuser() {
    wx.getStorage({
      key: 'openid',
      success: res => {
        this.setData({
          openid:res.data
        })
        this.getinfo(res.data)
      }
    })
  },
  getinfo(id){
    db.collection('userInfo').where({
      uniopid:id
    }).get({
      success:res=>{
        console.log('获取成功',res.data)
        if(res.data.length==0){
          db.collection('userInfo').add({
            data:{
              userName:null,
              phoneNumber:null,
              email:null,
              uniopid:id,
              maiseed:0,
              remark:''
      
            }
          })
        }
        this.setData({
          name:res.data[0].userName,
          phone:res.data[0].phoneNumber,
          email:res.data[0].email,
          remark:res.data[0].remark
        })
      }
    })
      },
      updateuser(openid){
        wx.cloud.callFunction({
          name:'updateuser',
          data:{
            email:this.data.email,
            phoneNumber:this.data.phone,
            userName:this.data.name,
            openid:openid,
            remark:this.data.remark
          },
          success:res=>{
            wx.showToast({
              title: '修改成功',
            })
            setTimeout(()=>{
wx.navigateBack({
  delta: 0,
})
            },400)
          }
        })
        },

        submit: function () {
          const openid=this.data.openid
          this.updateuser(openid)
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