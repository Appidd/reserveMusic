// pages/schedule/schedule.js
var daydetail = require("../../utils/daydetail.js"),daynew=require('../../utils/day.js')
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectText: 'B棚 | Studio B',
    img: '../../images/a1.png',
    selectArray: [
      {
        "value": "B",
        "img": "../../images/a2.png",
        "text": "B棚 | Studio B"
      },
      {
        "value": "A",
        "img": "../../images/a2.png",
        "text": "A棚 | Studio A"
      }
    ],
    animationData: {},
    items1:daydetail,
    show6: true,
    animationdata: {},
    showtime: true,
    minDate: 20,
    show: true,
    show1: true,
    date: '',
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [1, 2],

    isTodayWeek: false,
    todayIndex: 0,
    bvalue: 'B',
    base:'appointmentB',
    mname:'',
    remark:'',
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log(options)
    // const that=this
  const base=this.data.base
  const day1=options.day
  this.setData({
    day1
  })
  console.log(base,day1)
  this.getlist(base,day1)
   this.getopenid()
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate()
    let nowtime = '' + now.getHours()
    let munite = '' + now.getMinutes()
    console.log(munite)
    console.log(nowtime)
    if (munite.length == 1) {
      munite = '0' + munite
    }
    console.log(nowtime)
    const time = parseInt(nowtime + munite) + 400
    this.setData({
      time2: time
      
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
      day:'' + year + a + b

    })

    this.dateInit();
  },
  select: function (e) {
    const that=this
    const day=this.data.day1
    console.log(e.detail)
    const a=e.detail.value
    var dateArr = this.data.dateArr;
    console.log(a)
    if(a=="B"){
      this.setData({
        bvalue:"B",
        base:'appointmentB'
      })
      db.collection('appointmentB').where({
        month_day:day
       }).get({
         success:res=>{
           
           console.log(res)
           if(res.data.length==0){
             that.setData({
              items1:JSON.parse(JSON.stringify(daydetail))
             })
             
           }else{
            that.setData({
              items1: res.data[0].appointment_detail,
              id:res.data[0]._id
            })
           }
           
           console.log(this.data.items1)
         }
       })
       this.setData({
         showtime: true,
         time: day,
         show6: true,
         dateArr: dateArr,
         
       });
       console.log(this.data.isToday)
       setTimeout(res => {
         wx.pageScrollTo({
           scrollTop: 160,
         })
       }, 1100)
      
    }else{
      this.setData({
        bvalue:"A",
        base:'appointmentA'
      })
      db.collection('appointmentA').where({
        month_day:day
       }).get({
         success:res=>{
          if(res.data.length==0){
            that.setData({
             items1:JSON.parse(JSON.stringify(daydetail))
            })
           
          }else{
            console.log(res)
            that.setData({
              items1: res.data[0].appointment_detail,
              id:res.data[0]._id
            })
          }
           
         }
       })
       this.setData({
         showtime: true,
         time: day,
         show6: true,
         dateArr: dateArr,
         
       });
       console.log(this.data.isToday)
       setTimeout(res => {
         wx.pageScrollTo({
           scrollTop: 160,
         })
       }, 1100)
    }
  },

  look() {
    const show = this.data.show
    this.setData({
      show: false
    })
    wx.pageScrollTo({
      scrollTop: 360
    })
  },
  look1() {
    const show = this.data.show
    this.setData({
      show: true
    })
    wx.pageScrollTo({
      scrollTop: 160
    })
  },
animat(){
  var animation = wx.createAnimation({
    duration: 1000,
    timingFunction: 'ease',
  })

  this.animation = animation

  animation.translateY(100).opacity(0).step()
  
  

  this.setData({
    animationData:animation.export()
  })

  setTimeout(function() {
    
    animation.translateY(0).opacity(1).step()
    this.setData({
      animationData:animation.export()
    })
  }.bind(this), 600)
},
  radioChange: function (e) {
   this.animat()
   const that=this
    const base=this.data.base
    const day = e.detail.value
    this.setData({
      day
    })
    var dateArr = this.data.dateArr;
    db.collection(base).where({
     month_day:day
    }).get({
      success:res=>{
        console.log(res.data)
        if(res.data.length==0){
          console.log(daynew)
          db.collection(base).add({
            data:{
              month_day:day,
              appointment_detail:daynew
            },
            success:res=>{
              console.log(res._id)
              that.setData({
                id:res._id
              })
            },
            fail:err=>{
              console.log(err)
            }
          })
          setTimeout((res)=>{
            db.collection(base).where({
              month_day:day
            }).get({
              success:res=>{
                that.setData({
                  items1: res.data[0].appointment_detail,
                  id:res.data[0]._id
                })
              }
            })
          },1000)
          console.log(JSON.parse(JSON.stringify(daydetail)))
          that.setData({
           items1:JSON.parse(JSON.stringify(daydetail))
          })
         console.log(this.data.items1)
          console.log(daydetail)
        }else{
         
          console.log(daydetail)
          console.log(res)
          that.setData({
            items1: res.data[0].appointment_detail,
            id:res.data[0]._id
          })
        }
        
      }
    })
    for (var i = 0; i < dateArr.length; ++i) {
      dateArr[i].checked = dateArr[i].isToday == e.detail.value
    }
    console.log(e.detail.value)
    this.setData({
      showtime: true,
      time: day,
      show6: true,
      dateArr: dateArr,
      
    });
    console.log(this.data.isToday)
    setTimeout(res => {
      wx.pageScrollTo({
        scrollTop: 160,
      })
    }, 1100)
  },

  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    let checkArr = e.detail.value
    console.log(checkArr)
 let mname=''
 let remark=''
   let vleng=checkArr.length
    let index1=checkArr[vleng-1]
    let reindex=parseInt(index1)-1
   
    let items = this.data.items1
    const end=items[reindex].end
    let index2=parseInt(checkArr[0])-1
    
    const begin=items[index2].name
    this.setData({
      end,begin
    })
    if(vleng!=0){
      mname=items[reindex].mname

      remark=items[reindex].remark
    }
    
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false
      for (let j = 0, lenJ = checkArr.length; j < lenJ; ++j) {
        if (items[i].value === checkArr[j]) {
          items[i].checked = true
          break
        }
      }
    }
    this.setData({
      items1: items,
      mname,
      remark
    })
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}月${date.getDate()}`;
  },
  dateInit: function (setYear, setMonth) {
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
    console.log(arr.length, arr)
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
     editclose:res.data[0].add_closed,
      editopen:res.data[0].remove_closed
    })
   }

 }
})
  },
open(){
  const id=this.data.id
  const base=this.data.base
  const day=this.data.day1
  console.log(this.data.items1)
  const list=this.data.items1

  
const editopen=this.data.editopen
if(editopen){
  for(var i=0;i<list.length;i++){
    if(list[i].checked){
      list[i].disabled=false
      list[i].checked=false
      list[i].color=''
    }
  }
  db.collection(base).doc(id).update({
    data:{
      appointment_detail:list
    },
    success:res=>{
      wx.showToast({
        title: '取消成功',
        icon:'none'
      })
    setTimeout((res)=>{
      db.collection(base).where({
        month_day:day
       }).get({
         success:res=>{
           
           console.log(res)
           this.setData({
             items1: res.data[0].appointment_detail,
             id:res.data[0]._id
           })
         }
       })
    },500)
    
    }
  })
}else{
  console.log(this.data.items1)
  wx.showToast({
    title: '暂无权限',
    icon:'none'
  })
}
  
},
close(){
  console.log(this.data.mname,this.data.remark)

  
  wx.setStorage({
    key:'manager',
    data:{
      remark:this.data.remark,
      mname:this.data.mname
    }
  })
  // console.log(this.data.time)

  const editclose=this.data.editclose
  const id=this.data.id
    const base=this.data.base
    const day=this.data.day1
    console.log(this.data.items1)
    const list=this.data.items1
    const mname=this.data.mname
    const remark=this.data.remark
    const ptime=this.data.begin+'-'+this.data.end
    const bvalue=this.data.bvalue
    console.log(ptime,day,mname,remark,bvalue)
    db.collection('order').add({
      data:{
        time:day,
        yname:mname,
        remark1:remark,
        ptime,
        goods:{
          belong:bvalue
        }
      }
    })
  if(editclose){
    
    for(var i=0;i<list.length;i++){
      if(list[i].checked){
        list[i].disabled=true
        list[i].checked=false
        list[i].color='#3366ff'
        list[i].mname=mname
        list[i].remark=remark
      }
    }
   console.log(id)
   if(id==undefined){
     console.log(day)
db.collection(base).add({
  data:{
    appointment_detail:list,
    month_day:day
  }
}).then(res=>{
  setTimeout((res)=>{
    db.collection(base).where({
      month_day:day
     }).get({
       success:res=>{
        
         console.log(res)
         this.setData({
           items1: res.data[0].appointment_detail,
           id:res.data[0]._id
         })
       }
     })
  },500)
})
   }else{
    db.collection(base).doc(id).update({
      data:{
        appointment_detail:list
      },
      success:res=>{
        wx.showToast({
          title: '封闭成功',
          icon:'none'
        })
    setTimeout((res)=>{
      db.collection(base).where({
        month_day:day
       }).get({
         success:res=>{
          
           console.log(res)
           this.setData({
             items1: res.data[0].appointment_detail,
             id:res.data[0]._id
           })
         }
       })
    },500)
     
      }
    })
   }
  
  }else{
    wx.showToast({
      title: '暂无权限',
      icon:'none'
    })
  }

  
},
  onReady: function () {},
  onShow: function () {
    const that=this
    console.log(111)
    wx.getStorage({
      key:'manager',
      success:res=>{
        console.log(res)
        that.setData({
          mname:res.data.mname,
          remark:res.data.remark
        })
      },
      fail:err=>{
        console.log(err)
      }
    })
    // const that=this
    // const base=this.data.base
    // const day=this.data.isToday+''
    // var dateArr = this.data.dateArr;
    // db.collection(base).where({
    //  month_day:day
    // }).get({
    //   success:res=>{
        
    //     console.log(res)
    //     that.setData({
    //       items1: res.data[0].appointment_detail,
    //       id:res.data[0]._id
    //     })
    //   }
    // })
    // this.setData({
    //   showtime: true,
    //   time: day,
    //   show6: true,
    //   dateArr: dateArr,
      
    // });
    // console.log(this.data.isToday)
    // setTimeout(res => {
    //   wx.pageScrollTo({
    //     scrollTop: 160,
    //   })
    // }, 1100)
   
  },
  getlist(base,day){
    const that=this
    db.collection(base).where({
      month_day:day
     }).get({
       success:res=>{
         
         console.log(res)
         that.setData({
           items1: res.data[0].appointment_detail,
           id:res.data[0]._id
         })
       }
     })
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {

  }
})