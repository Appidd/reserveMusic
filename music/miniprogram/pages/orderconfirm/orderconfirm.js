// pages/orderconfirm/orderconfirm.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    phone: null,
    show: false,
    goods: {},
    timelong:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getuser()
    let id = options.id
      this.getgoods(id)
    var items1 = JSON.parse(options.items1)
    console.log(JSON.parse(options.items1),"items1")
    console.log(JSON.parse(options.dblist),"dblist")
    var dblist=JSON.parse(options.dblist)
    var a=[]
    for(var i=0;i<items1.length;i++){
      if(items1[i].checked==true){
        
        a.push(parseInt(items1[i].value) )
      }
    }
    console.log(a)
    var min=a[0]
    var max=a[a.length-1]
    console.log(min,max)
    if(1==min){
      dblist[max].disabled=true
      //系统屏蔽灰色
      dblist[max].color="#858484"
      console.log('min=1')
    }if(max==26){
      dblist[max-2].disabled=true
      dblist[max-2].color="#858484"
      console.log('max=26')
    }if(max!=26&&min!=1){
      dblist[min-2].disabled=true
      dblist[max].disabled=true
      dblist[max].color="#858484"
      dblist[min-2].color="#858484"
      console.log('min=1||minex')
    }
   console.log(dblist)
    var list1 = items1.filter((p) => {
      return p.checked == true;
    })
    console.log(list1)
    
var newlist=dblist

for(var i=1;i<newlist.length;i++){
  if(i<25){
    if(newlist[i].disabled==true){
      if(newlist[i-2]==undefined||newlist[i-2].disabled==true){
        newlist[i-1].disabled=true 
        newlist[i-1].color="#858484"
      }
    }
  }
else if(newlist[24].disabled==true){
  console.log('aaa')
  newlist[25].disabled=true
  newlist[25].color="#858484"
  console.log(newlist)
}

}


for(var i=0;i<dblist.length;i++){
  for(var j=0;j<list1.length;j++){
    if(dblist[i].value==list1[j].value){
      dblist[i].disabled=true
      dblist[i].color="#fcc600"
      
    }
  }
}

    console.log(dblist)
     console.log(newlist)
  
    setTimeout(res => {
  
      var price = (this.data.goods.nowPrice / 2) * a.length
      var timelong=parseFloat(a.length/2)
      this.setData({
        id: id,
        list:newlist,
        price: price,
        begin: list1[0].name,
        end: list1[list1.length-1].end,
        timelong
      })
    }, 1000)

    const time = options.today
    this.setData({
      time
    })
    console.log(time)
    this.gettime(time)

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
          yhui:0
        }
      })
    }
    this.setData({
      name:res.data[0].userName,
      phone:res.data[0].phoneNumber,
      email:res.data[0].email
     
    })
  }
})
  },
  getgoods(id) {
    db.collection('goods').doc(id).get({
      success: res => {
        console.log(res)
        this.setData({
          goods: res.data
        })

      }
    })
  },


  gettime(time) {
    console.log(time)
    let a = time
    let year = a.slice(0, 4)

    let day = a.slice(6, 8)
    let month = a.slice(4, 6)
    console.log(a.slice(4, 6).length)
    if (month.split('')[0] == '0') {
      month = month.slice(1)
      console.log(month)
    }
    console.log(month)
    if (day.split('')[0] == '0') {
      day = day.slice(1)
    }
  
    const ytime = year = year + '-' + month + '-' + day 
 
    
    this.setData({
      ytime: ytime
     
    })
    console.log(ytime)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
updateuser(openid){
wx.cloud.callFunction({
  name:'updateuser',
  data:{
    email:this.data.email,
    phoneNumber:this.data.phone,
    userName:this.data.name,
    openid:openid
  
  }
})
},
  submit: function () {
const openid=this.data.openid
this.updateuser(openid)
   
    const price = this.data.price
    const begin = this.data.begin
    const end = this.data.end
    const goodsName = this.data.goods.goodsName
    const ytime = this.data.ytime
    const list = this.data.list
    const id = this.data.id
    const time=this.data.time
    const name=this.data.name
    const phone=this.data.phone
    const email=this.data.email
    const remark=this.data.more
    const timelong=this.data.timelong
    console.log(timelong)
    console.log(time)
    let a = {
      timelong,
      id,
      goodsName,
      ytime,
      list,
      price,
      begin,
      end,
      time,
      name,
      phone,
      email,
      remark
    }
    let b = JSON.stringify(a)
 
    if (name == null) {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none'
      })
    } else if (phone == null) {
      wx.showToast({
        title: '请填写电话号码',
        icon: 'none'
      })

    } else {
      wx.navigateTo({
        url: '../pay/pay?detail=' + b,
      })
    }
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