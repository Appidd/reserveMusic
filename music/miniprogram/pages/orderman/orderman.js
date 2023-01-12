// pages/orderman/orderman.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    show6:true,
    animationdata:{},
    showtime:false,
    minDate: 20,
    show: true,
    show1: true,
    date: '',
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [1,2],
    //  isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
  
    items1: [],
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate()
    let nowtime=''+now.getHours()
    let munite=''+now.getMinutes()
    console.log(munite)
    console.log(nowtime)
    if(munite.length==1){
      munite='0'+munite
    }
    console.log(nowtime)
    const time=parseInt(nowtime+munite)+400
    this.setData({
      time2:time
    })
    console.log(time)
    let a = ''
    let b = ''
    if (month < 10) {
      a = '0' + month
    } else {
      a = month
    }
    if (day < 10) {
      b = '0' + day
    } else {
      b = day
    }
    this.setData({
      year: year,
      month: month,
      isToday: parseInt('' + year + a + b),
      num:'' + year + a + b
    })
    console.log('' + year + a + b)
    setTimeout((res)=>{
      console.log(this.data.num)

      this.getlist(this.data.num)
    },200)
    
    this.dateInit();
  },
  del(e){
    const that=this
    const num=this.data.num
console.log(e.currentTarget.dataset.id)
const id=e.currentTarget.dataset.id
db.collection('order').doc(id).remove({
  success:res=>{
    wx.showToast({
      title: '删除成功',
    })
    that.getlist(num)
  }
})
  },
  tosch(){
    console.log(this.data.num,this.data.base)
const day=this.data.num
    wx.navigateTo({
      url: '../schedule/schedule?day='+day,
    })
  },
  getlist(num){
    console.log(num)
    wx.showLoading({
      title: '正在加载',
    })
    console.log(num)
db.collection('order').where({
  time:num
}).get({
  success:res=>{
    console.log(res)
    wx.hideLoading({
     
    })
    this.setData({
      list:[]
    })
    console.log(res.data)
    this.renderList(res.data)
    
  }
})
  },
  radioChange: function (e) {
const num=e.detail.value

this.setData({
  num:e.detail.value,
  list:[]
})
 this.getlist(num)
  
    
  
    const time = e.detail.value
    var dateArr = this.data.dateArr;

    for (var i = 0; i < dateArr.length; ++i) {
      dateArr[i].checked = dateArr[i].isToday == e.detail.value
    }
    
    console.log(e.detail.value)
    this.setData({
      showtime:true,
      time: time,
      show6:true,
      dateArr: dateArr,
     
     
    });
    console.log(this.data.isToday)

  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}月${date.getDate()}`;
  },
  dateInit: function (setYear, setMonth) {
    const that=this
    let arr = []; 
    let arrLen = 0; 
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth(); 
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + '/' + (month + 1) + '/' + 1).getDay(); 
    let dayNums = new Date(year, nextMonth, 0).getDate(); 
    let obj = {};
    let num = 0;

    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        if (month + 1 < 10) {
          const b = month + 1
          var a = '0' + b
        } else {
          a = month + 1
        }
        if (num < 10) {
          num = '0' + num
        }
        obj = {
          isToday: parseInt('' + year + a + num),
          dateNum: num,
          weight: 5,
          name: parseInt('' + year + a + num)
        }
      } else {
        obj = {};
      }
      arr[i] = obj;

   
    }
    console.log('' + year + a + num)
    console.log(arr.length,arr)
   
      this.setData({
        dateArr: arr
      })




    let nowDate = new Date();

    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;


    let nowWeek = nowDate.getDay();

    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;

    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },
  lastMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  nextMonth: function () {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  toupdate(e){
    console.log(e.currentTarget.dataset.id)
    const id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../uplist/uplist?id='+id,
    })
  },
  renderList: function (a) {
    console.log(a)
    for (var e = [], t = 0; t < a.length; t++) {
        var i = a[t]
        var time=i.ptime.split('-')
        var begin=time[0]
        var end=time[1]
        e.push({
            id: i._id,
            belong:i.goods.belong,
            yname: i.yname,
            yserve:i.yserve,
            remark:i.remark,
            remark1:i.remark1,
            begin,
            end
        });
    }
    this.setData({
        list: e,
        
    });
    console.log(e)
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
   const that=this
   const num=this.data.num
   if(num){
 that.getlist(num)
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