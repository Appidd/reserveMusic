// pages/pay/pay.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: '定金支付',
    radio1: '微信支付',
    checked: false,
show:true,
price:200,
price1:200,
remark:'',
yhu:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.getuser()
console.log(options)
const a=JSON.parse(options.detail)
const time=a.time
this.makelistnum(time)
this.getgoods(a.id)
this.getrule()
console.log(a)
this.setData({
  goodsDetail:a,
 timelong:a.timelong
})
  },
  getrule(){
    db.collection('cancelRule').get({
      success:res=>{
        // console.log(res.data[0].cancelRule)
        this.setData({
          cancelRule:res.data[0].cancelRule
        })
      }
    })
  },
  onChange(event) {
    const price=this.data.goodsDetail.price
    console.log(price)
    console.log(event.detail)
    if(event.detail=='先付定金'){
      this.setData({
        radio: event.detail,
        price:200,
        price1:200
      });
    }else{
      this.setData({
        radio: event.detail,
        price,
        price1:price
      })
    }
   
  },
  onChange1(event) {
    console.log(event.detail)
    this.setData({
      radio1: event.detail,
    });
  },
  onChange2(event) {
    const yhui=this.data.yhui
    console.log(yhui)
    const price1=this.data.price1
    console.log(price1)
    if(event.detail){
    const price11=price1-yhui
this.setData({
  price:price11,
  yhu:yhui
})
    }else{
this.setData({
  yhu:0,
  price:price1
})
    }
    this.setData({
      checked:event.detail
    })
    console.log(this.data.price)
  },
  show(){
    const show=this.data.show
    this.setData({
      show:!show
    })
  },
  gettime(){
    const date=new Date()
  var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
   
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    const nowtime=year+'-'+month+'-'+day+'   '+hour+':'+minute+':'+second
    this.setData({
      nowtime:nowtime
    })
  },
  makelistnum(time){
    const that=this
    db.collection('order').where({
      time:time
    }).get({
      success:res=>{
        const date=Date.parse(new Date()) 
        
        const list=res.data
        const list2=list.length+1
        if(list.length<10){
          const listnum=date+'00'+list2
          that.setData({
            listnum
          })
        }else{
          const listnum=date+'0'+list2
          that.setData({
            listnum
          })
        }
        console.log(that.data.listnum)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
getgoods(id){
  const that=this
  const belong=that.data.belong
  console.log(id)
  db.collection('goods').doc(id).get({
    success:res=>{
      this.setData({
        goods:res.data,
        goodsbelong:res.data.belong
      })
      if(res.data.belong=='B'){
        that.getlistB()
      }else if(res.data.belong=='A'||res.data.belong=='A+'){
        that.getlistA()
      }else{
        that.getlistC()
      }
    }
  })
},
getlistC(){ 
  const time=this.data.goodsDetail.time
  db.collection('appointmentC').where({
    month_day:time
  }).get({
    success:res=>{
      this.setData({
        yid:res.data[0]._id
      })
    }
  })
},
getlistB(){
  const time=this.data.goodsDetail.time
  db.collection('appointmentB').where({
    month_day:time
  }).get({
    success:res=>{
      this.setData({
        yid:res.data[0]._id
      })
    }
  })
},

getlistA(){
  const time=this.data.goodsDetail.time
  db.collection('appointmentA').where({
    month_day:time
  }).get({
    success:res=>{
      console.log(res)
      this.setData({
        yid:res.data[0]._id
      })
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
  console.log('获取成功',res.data[0].maiseed)
const maiseed=res.data[0].maiseed
const uid=res.data[0]._id
const yhui=res.data[0].yhui
  this.setData({
    maiseed,
    uid,
    yhui
  })
}
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
  upyhui(){
    var checked=this.data.checked
    var uid=this.data.uid
    console.log(uid)
    if(checked){
      db.collection('userInfo').doc(uid).update({
        data:{
          yhui:0
        }
      })
    }
},
usemaiseed(){
  
  const maiseed=parseFloat(this.data.maiseed)
  const price=parseFloat(this.data.price)
  const yhui=this.data.yhui
  const checked=this.data.checked
if(checked){
  if(maiseed>=price){
    this.upmaiseed(maiseed-price)
    this.upyhui()
    this.upytime()
    this.maiyou()
   
  }else{
    this.maiyoumoney()
    
  }
}else{
  if(maiseed>=price){
    this.upmaiseed(maiseed-price)
    this.upytime()
    this.onlyusemai()
    
  }else{
    
    this.maimoney()
    
  }
}
 

},
upmaiseed(reseed){
  const uid=this.data.uid
  console.log(uid)
  db.collection('userInfo').doc(uid).update({
    data:{
      maiseed:reseed
    }
  })
},
upytime(){
  const goodsbelong=this.data.goodsbelong
const yid=this.data.yid
console.log(yid)
const list=this.data.goodsDetail.list
  if(goodsbelong=="A"||goodsbelong=='A+'){
   db.collection('appointmentA').doc(yid).update({
     data:{
appointment_detail:list
     },
     success:res=>{
       console.log('chengg')
     },fail:err=>{
       console.log('shibai')
     }
   })
  }else if(goodsbelong=="B"){
    db.collection('appointmentB').doc(yid).update({
      data:{
 appointment_detail:list
      },
    })
  }else{
    db.collection('appointmentC').doc(yid).update({
      data:{
 appointment_detail:list
      },
    })
  }

},
onlyusemai(){
  const that=this
  this.gettime()
  const timelong=this.data.timelong /* 使用时长*/
  const yname=this.data.goodsDetail.name/* 联系人姓名*/
  const yphone=this.data.goodsDetail.phone/* 联系人电话*/
  const yemail=this.data.goodsDetail.email/* 联系人邮件*/
  const remark=this.data.goodsDetail.remark/* 备注信息*/
  const yserve=this.data.goodsDetail.goodsName/* 商品名称*/
  const ytime=this.data.goodsDetail.ytime/* 预定时间*/
  const xtime=new Date()/*下单时间*/
  const payway="麦币"/* 定金/全部*/
  const paytype=this.data.radio/* 定金/全部*/
  const ptime=this.data.goodsDetail.begin+'-'+this.data.goodsDetail.end/* 用棚时间*/
  const paymoney=0/* 实际支付金额*/
  const ordernum=this.data.listnum/* 订单编号*/
  const goodsid=this.data.goodsDetail.id/* 商品id*/
  const time=this.data.goodsDetail.time/* 当天时间戳*/
  const goods=this.data.goods/* 商品信息*/
  const xmoney=this.data.goodsDetail.price/* 商品总价值*/
  const yhui=0/*支付优惠券*/
  const maibi=this.data.price/* 支付麦币*/
  const goodsbelong=this.data.goodsbelong
  db.collection('order').add({
    data:{
      goodsbelong,
      maibi,
      timelong,
      yhui,
      xmoney,
      yname,
      yphone,
      yemail,
      remark,
      yserve,
      ytime,
      xtime,
      payway,
      paytype,
      
      ptime,
      paymoney,
      ordernum,
      goodsid,
      time,
      goods
    },
    success:res=>{
      wx.showToast({
        title: '预定成功',
      })
that.sendmsg()
that.sendtomanager()
    },
    fail:err=>{
      console.log(err)
    }
  })
},
maiyou(){
  const that=this
  const maiseed=parseFloat(this.data.maiseed)
  const price=parseFloat(this.data.price)
  this.gettime()
  const timelong=this.data.timelong /* 使用时长*/
  const yname=this.data.goodsDetail.name/* 联系人姓名*/
  const yphone=this.data.goodsDetail.phone/* 联系人电话*/
  const yemail=this.data.goodsDetail.email/* 联系人邮件*/
  const remark=this.data.goodsDetail.remark/* 备注信息*/
  const yserve=this.data.goodsDetail.goodsName/* 商品名称*/
  const ytime=this.data.goodsDetail.ytime/* 预定时间*/
  const xtime=new Date()/*下单时间*/
  const payway="麦币/优惠券"/* 定金/全部*/
  const paytype=this.data.radio/* 定金/全部*/
  const ptime=this.data.goodsDetail.begin+'-'+this.data.goodsDetail.end/* 用棚时间*/
  const paymoney=0/* 实际支付金额*/
  const ordernum=this.data.listnum/* 订单编号*/
  const goodsid=this.data.goodsDetail.id/* 商品id*/
  const time=this.data.goodsDetail.time/* 当天时间戳*/
  const goods=this.data.goods/* 商品信息*/
  const xmoney=this.data.goodsDetail.price/* 商品总价值*/
  const yhui=this.data.yhui/*支付优惠券*/
  const maibi=this.data.price/* 支付麦币*/
  const goodsbelong=this.data.goodsbelong

  db.collection('order').add({
    goodsbelong,
    data:{
      maibi,
      timelong,
      yhui,
      xmoney,
      yname,
      yphone,
      yemail,
      remark,
      yserve,
      ytime,
      xtime,
      payway,
      paytype,
      
      ptime,
      paymoney,
      ordernum,
      goodsid,
      time,
      goods
    },
    success:res=>{
      wx.showToast({
        title: '预定成功',
      })
      that.sendmsg()
      that.sendtomanager()
    },
    fail:err=>{
      console.log(err)
    }
  })
},
maiyoumoney(){
const a=this
  this.gettime()
  const timelong=this.data.timelong /* 使用时长*/
  const yname=this.data.goodsDetail.name/* 联系人姓名*/
  const yphone=this.data.goodsDetail.phone/* 联系人电话*/
  const yemail=this.data.goodsDetail.email/* 联系人邮件*/
  const remark=this.data.goodsDetail.remark/* 备注信息*/
  const yserve=this.data.goodsDetail.goodsName/* 商品名称*/
  const ytime=this.data.goodsDetail.ytime/* 预定时间*/
  const xtime=new Date()/*下单时间*/
  const payway="麦币/优惠券/微信支付"/* 定金/全部*/
  const paytype=this.data.radio/* 定金/全部*/
  const ptime=this.data.goodsDetail.begin+'-'+this.data.goodsDetail.end/* 用棚时间*/
  const ordernum=this.data.listnum/* 订单编号*/
  const goodsid=this.data.goodsDetail.id/* 商品id*/
  const time=this.data.goodsDetail.time/* 当天时间戳*/
  const goods=this.data.goods/* 商品信息*/
  const xmoney=this.data.goodsDetail.price/* 商品总价值*/
  const yhui=this.data.yhui/*支付优惠券*/
  const maibi=parseFloat(this.data.maiseed)/* 支付麦币*/
  const paymoney=this.data.price-maibi /* 实际支付金额*/
  const goodsbelong=this.data.goodsbelong
  wx.showLoading({
    
  })
  wx.cloud.callFunction({
    name: 'pay',
    data: {
      outTradeNo:ordernum,
      price:paymoney,
      
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
             a.upmaiseed(0)
    a.upytime()
   
    a.upyhui()
             db.collection('order').add({
              data:{
                goodsbelong,
                maibi,
                timelong,
                yhui,
                xmoney,
                yname,
                yphone,
                yemail,
                remark,
                yserve,
                ytime,
                xtime,
                payway,
                paytype,
                
                ptime,
                paymoney,
                ordernum,
                goodsid,
                time,
                goods
              },
              success:res=>{
                wx.showToast({
                  title: '预定成功',
                })
                a.sendmsg()
                a.sendtomanager()
              },
              fail:err=>{
                console.log(err)
              }
            })
            },
          })
          setTimeout(res=>{
            wx.switchTab({
              url: '../index/index',
            })
           },1000)
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
maimoney(){
const a=this
  this.gettime()
  const timelong=this.data.timelong /* 使用时长*/
  const yname=this.data.goodsDetail.name/* 联系人姓名*/
  const yphone=this.data.goodsDetail.phone/* 联系人电话*/
  const yemail=this.data.goodsDetail.email/* 联系人邮件*/
  const remark=this.data.goodsDetail.remark/* 备注信息*/
  const yserve=this.data.goodsDetail.goodsName/* 商品名称*/
  const ytime=this.data.goodsDetail.ytime/* 预定时间*/
  const xtime=new Date()/*下单时间*/
  const payway="麦币/微信支付"/* 定金/全部*/
  const paytype=this.data.radio/* 定金/全部*/
  const ptime=this.data.goodsDetail.begin+'-'+this.data.goodsDetail.end/* 用棚时间*/
  const ordernum=this.data.listnum/* 订单编号*/
  const goodsid=this.data.goodsDetail.id/* 商品id*/
  const time=this.data.goodsDetail.time/* 当天时间戳*/
  const goods=this.data.goods/* 商品信息*/
  const xmoney=this.data.goodsDetail.price/* 商品总价值*/
  const yhui=0/*支付优惠券*/
  const maibi=parseFloat(this.data.maiseed)/* 支付麦币*/
  const paymoney=this.data.price-maibi/* 实际支付金额*/
  const goodsbelong=this.data.goodsbelong
  wx.showLoading({
    
  })
  wx.cloud.callFunction({
    name: 'pay',
    data: {
      outTradeNo:ordernum,
      price:paymoney,
      
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
             a.upmaiseed(0)
    a.upytime()
             db.collection('order').add({
              data:{
                goodsbelong,
                maibi,
                timelong,
                yhui,
                xmoney,
                yname,
                yphone,
                yemail,
                remark,
                yserve,
                ytime,
                xtime,
                payway,
                paytype,
                
                ptime,
                paymoney,
                ordernum,
                goodsid,
                time,
                goods
              },
              success:res=>{
                wx.showToast({
                  title: '预定成功',
                })
                a.sendmsg()
                a.sendtomanager()
              },
              fail:err=>{
                console.log(err)
              }
            })
            },
          })
          setTimeout(res=>{
            wx.switchTab({
              url: '../index/index',
            })
           },1000)
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
onlyusemoney(){
const a=this
  this.gettime()
  const timelong=this.data.timelong /* 使用时长*/
  const yname=this.data.goodsDetail.name/* 联系人姓名*/
  const yphone=this.data.goodsDetail.phone/* 联系人电话*/
  const yemail=this.data.goodsDetail.email/* 联系人邮件*/
  const remark=this.data.goodsDetail.remark/* 备注信息*/
  const yserve=this.data.goodsDetail.goodsName/* 商品名称*/
  const ytime=this.data.goodsDetail.ytime/* 预定时间*/
  const xtime=new Date()/*下单时间*/
  const payway="微信支付"/* 定金/全部*/
  const paytype=this.data.radio/* 定金/全部*/
  const ptime=this.data.goodsDetail.begin+'-'+this.data.goodsDetail.end/* 用棚时间*/
  const ordernum=this.data.listnum/* 订单编号*/
  const goodsid=this.data.goodsDetail.id/* 商品id*/
  const time=this.data.goodsDetail.time/* 当天时间戳*/
  const goods=this.data.goods/* 商品信息*/
  const xmoney=this.data.goodsDetail.price/* 商品总价值*/
  const yhui=0/*支付优惠券*/
  const maibi=0/* 支付麦币*/
  const paymoney=this.data.price/* 实际支付金额*/
  const goodsbelong=this.data.goodsbelong
  
  wx.showLoading({
    
  })
 
  wx.cloud.callFunction({
    name: 'pay',
    data: {
      outTradeNo:ordernum,
      price:paymoney,
      
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
             a.upytime()
             db.collection('order').add({
              data:{
                goodsbelong,
                maibi,
                timelong,
                yhui,
                xmoney,
                yname,
                yphone,
                yemail,
                remark,
                yserve,
                ytime,
                xtime,
                payway,
                paytype,
                
                ptime,
                paymoney,
                ordernum,
                goodsid,
                time,
                goods
              },
              success:res=>{
                wx.showToast({
                  title: '预定成功',
                })
                a.sendmsg()
                a.sendtomanager()
              },
              fail:err=>{
                console.log(err)
              }
            })
            },
          })
          setTimeout(res=>{
            wx.switchTab({
              url: '../index/index',
            })
           },1000)
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
moneyyou(){
  const a=this
  this.gettime()
  const timelong=this.data.timelong /* 使用时长*/
  const yname=this.data.goodsDetail.name/* 联系人姓名*/
  const yphone=this.data.goodsDetail.phone/* 联系人电话*/
  const yemail=this.data.goodsDetail.email/* 联系人邮件*/
  const remark=this.data.goodsDetail.remark/* 备注信息*/
  const yserve=this.data.goodsDetail.goodsName/* 商品名称*/
  const ytime=this.data.goodsDetail.ytime/* 预定时间*/
  const xtime=new Date()/*下单时间*/
  const payway="微信支付/优惠券"/* 定金/全部*/
  const paytype=this.data.radio/* 定金/全部*/
  const ptime=this.data.goodsDetail.begin+'-'+this.data.goodsDetail.end/* 用棚时间*/
  const ordernum=this.data.listnum/* 订单编号*/
  const goodsid=this.data.goodsDetail.id/* 商品id*/
  const time=this.data.goodsDetail.time/* 当天时间戳*/
  const goods=this.data.goods/* 商品信息*/
  const xmoney=this.data.goodsDetail.price/* 商品总价值*/
  const yhui=this.data.yhui/*支付优惠券*/
  const maibi=0/* 支付麦币*/
  const paymoney=this.data.price/* 实际支付金额*/
  const goodsbelong=this.data.goodsbelong
  wx.showLoading({
    
  })
  wx.cloud.callFunction({
    name: 'pay',
    data: {
      outTradeNo:ordernum,
      price:paymoney,
      
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
             a.upyhui()
             a.upytime()
             db.collection('order').add({
              data:{
                goodsbelong,
                maibi,
                timelong,
                yhui,
                xmoney,
                yname,
                yphone,
                yemail,
                remark,
                yserve,
                ytime,
                xtime,
                payway,
                paytype,
                
                ptime,
                paymoney,
                ordernum,
                goodsid,
                time,
                goods
              },
              success:res=>{
                wx.showToast({
                  title: '预定成功',
                })
                a.sendmsg()
                a.sendtomanager()
              },
              fail:err=>{
                console.log(err)
              }
            })
            },
          })
          setTimeout(res=>{
            wx.switchTab({
              url: '../index/index',
            })
           },1000)
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
usewei(){
  
  const checked=this.data.checked
  if(checked){
this.moneyyou()


  }else{
this.onlyusemoney()

  }
},
sendmsg(){
  const yname=this.data.goodsDetail.name/* 联系人姓名*/
  const yphone=this.data.goodsDetail.phone/* 联系人电话*/
  const yserve=this.data.goodsDetail.goodsName/* 商品名称*/
  const ytime=this.data.goodsDetail.ytime/* 预定时间*/
  const ptime=this.data.goodsDetail.begin+'~'+this.data.goodsDetail.end/* 用棚时间*/
  const openid=this.data.openid
  wx.cloud.callFunction({
    name:'sendmessage',
    data:{
      ptime,
      yname,
      yphone,
      yserve:yserve.slice(0, 6)+'...',
      ytime,
      openid
    },
    success:res=>{
      console.log(res)
    },
    fail:err=>{
      console.log(err)
    }
  })
},
sendtomanager(){
  const remark=this.data.goodsDetail.remark/* 备注信息*/
  const yname=this.data.goodsDetail.name/* 联系人姓名*/
  const yphone=this.data.goodsDetail.phone/* 联系人电话*/
  const yserve=this.data.goodsDetail.goodsName/* 商品名称*/
  const ytime=this.data.goodsDetail.ytime/* 预定时间*/
  const ptime=this.data.goodsDetail.begin+'~'+this.data.goodsDetail.end/* 用棚时间*/
  wx.cloud.callFunction({
    name:'sendtomanager',
    data:{
      yname,yphone,yserve,ytime,
      ptime,remark
    },
    success:res=>{
      console.log(res)
    }
  })
},
submit(){
  const radio1=this.data.radio1
  const that=this
  wx.requestSubscribeMessage({
      tmplIds: ['qcsbBIvjk5h-Vs9KTGL2rlhvZe0FI8GpZTZgxDpUTzM'],
      success:res=>{
        if(radio1=='麦币支付'){
          wx.showLoading({
            title: '正在加载',
          })
          that.usemaiseed()
        setTimeout(()=>{
          wx.hideLoading({
            success: (res) => {
             wx.switchTab({
               url: '../index/index',
             })
            },
          })
        },1000)
        }else{
      that.usewei()
      
        }
        console.log('授权成功')
      },
      fail:err=>{
        if(radio1=='麦币支付'){
          wx.showLoading({
            title: '正在加载',
          })
          that.usemaiseed()
        setTimeout(()=>{
          wx.hideLoading({
            success: (res) => {
             wx.switchTab({
               url: '../index/index',
             })
            },
          })
        },1000)
        }else{
      that.usewei()
      
        }
      }
    })

  

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