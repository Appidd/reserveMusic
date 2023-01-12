const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getuserinfo()
    this.getindex()
  },
  getindex() {
    db.collection('indexpage').get({
      success: res => {
        this.setData({
          notice: res.data[0].notice,
          video: res.data[0].video,
          phone: res.data[0].phone,
          wifiname: res.data[0].wifiname,
          wifipas: res.data[0].wifipas,
          imgUrls: res.data[0].banner,
          imgUrls1: res.data[0].middle
        })
      }
    })
  },
  getuserinfo() {
    wx.cloud.callFunction({
      name: 'user',
      success: res => {
        console.log(res.result.openid)
        wx.setStorage({
          data: res.result.openid,
          key: 'openid',
        })
      }
    })
    wx.getStorage({
      key: 'userinfo',
      success: res => {
        console.log(res)
      },
      fail: err => {
        wx.showModal({
          title: '温馨提示',
          content: '正在请求您的个人信息',
          success: res => {
            wx.getUserProfile({
              desc: '获取你的昵称、头像、地区及性别',
              success: function (res) {
                const userinfo = res.userInfo;

                wx.setStorage({
                  data: userinfo,
                  key: 'userinfo',
                })
                wx.showToast({
                  title: '恭喜授权成功',
                });
                setTimeout(() => {
                  wx.switchTab({
                    url: '../index/index',
                  })
                }, 2000)
              },
              fail: function (err) {
                console.log("获取失败: ", err)
              }
            })
          }
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  toa() {
    wx.navigateTo({
      url: '../detail/detail?id=' + '8937eaa96150603b0e0a11f50ff37794',
    })
  },
  tob() {
    wx.navigateTo({
      url: '../detail/detail?id=' + '8937eaa9615060100e0a0ce22a865276',
    })
  },
  toc() {
    wx.navigateTo({
      url: '../detail/detail?id=' + '14139e12615060700f70f9d54e19ee72',
    })
  },
  show() {
    const phone = this.data.phone
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  toyuding() {
    wx.switchTab({
      url: '../reserve/reserve',
    })
  },
  toexample() {
    wx.navigateTo({
      url: '../example/example',
    })
  },
  tocontact() {
    wx.navigateTo({
      url: '../contactus/contactus',
    })
  },

  connectWifi: function () {
    var that = this;
    //检测手机型号
    wx.getSystemInfo({
      success: function (res) {
        var system = '';
        if (res.platform == 'android') system = parseInt(res.system.substr(8));
        if (res.platform == 'ios') system = parseInt(res.system.substr(4));
        if (res.platform == 'android' && system < 6) {
          wx.showToast({
            title: '手机版本不支持',
          })
          return
        }
        if (res.platform == 'ios' && system < 11.2) {
          wx.showToast({
            title: '手机版本不支持',
          })
          return
        }
        //2.初始化 Wi-Fi 模块
        that.startWifi();
      }
    })
  },
  //初始化 Wi-Fi 模块
  startWifi: function () {
    var that = this
    wx.startWifi({
      success: function () {
        //请求成功连接Wifi
        that.collectwifi();
      },
      fail: function (res) {
        
          wx.showToast({
            title: '接口调用失败',
          })
        
      }
    })
  },
  collectwifi() {
    const wifiname=this.data.wifiname
    const wifipas=this.data.wifipas
    wx.showLoading({
      title: '正在连接',
    })
    wx.connectWifi({
      SSID: wifiname,
      password: wifipas,
      success(res) {
        console.log(res)
        wx.hideLoading({
          success: (res) => {
            wx.showToast({
              title: '连接成功',
            })
          },
        })
      },
      fail: err => {
        console.log(err)
        wx.hideLoading({
          success: (res) => {
            wx.showToast({
              title: '连接失败',
              icon: 'none'
            })
          }
        })
      }
    })
  },
  call() {
    wx.makePhoneCall({
      phoneNumber: '18928467356',
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