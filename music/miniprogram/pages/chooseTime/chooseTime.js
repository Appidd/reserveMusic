// pages/choosetime/choosetime.js
var daydetail=require("../../utils/daydetail.js")
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrylist:[],
    imgUrls:[],
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
    const id=options.id
    this.getgoods(id)
    const belong=options.belong
    console.log(belong)
if(belong=='B'){
  this.setData({
    belong:'appointmentB'
  })
}else if(belong=='A'){
  this.setData({
    belong:'appointmentA'
  })
}else if(belong=='A+'){
  this.setData({
    belong:'appointmentA'
  })
}else{
  this.setData({
    belong:'appointmentC'
  })
}
    this.setData({
      id:id
    })
   
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

      isToday: parseInt('' + year + a + b)
    })

    this.dateInit();
  },
  getgoods(id){
    db.collection('goods').doc(id).get({
      success:res=>{
        this.setData({
          imgUrls:res.data.time_banner
        })
        
      }
    })
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}月${date.getDate()}`;
  },

  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    let checkArr=e.detail.value
    let arrlength=checkArr.length
    let a=[]
    let items = this.data.items1

 
    if(arrlength>1){
      if(arrlength==2){
        let firseData=parseInt(checkArr[0]) 
        let secondData=parseInt(checkArr[1])
        let abs=Math.abs(firseData-secondData)
        if(abs!=1){
          
        
          for (let i = 0, lenI = items.length; i < lenI; ++i) {
         
      
            for (let j = 0, lenJ = checkArr.length; j < lenJ; ++j) {
              if (items[i].value === checkArr[j]) {
                items[i].checked = true
                break
              }
            }
          }
          this.setData({
            items1:items
          })
        }else{
          a=checkArr
          for (let i = 0, lenI = items.length; i < lenI; ++i) {
            items[i].checked = false
      
            for (let j = 0, lenJ = a.length; j < lenJ; ++j) {
              if (items[i].value === a[j]) {
                items[i].checked = true
                break
              }
            }
          
          }
          this.setData({
            items1:items
          })
        }
      }else{
        let bArr=checkArr.slice(0,-1)
        let Barr=checkArr.slice(-1)
        let w=0
        let bmin,bmax=parseInt(bArr[0])
        for(let e=0;e<bArr.length;e++){
          bmax=bmax >parseInt(bArr[e]) ? bmax:parseInt(bArr[e])
        }
        for(let f=0;f<bArr.length;f++){
          bmin=parseInt(bArr[f]) > bmin ? bmin:parseInt(bArr[f])
        }
        let min=parseInt(checkArr[0])
        let max=parseInt(checkArr[0])
        for(let e=0;e<checkArr.length;e++){
          max=max >parseInt(checkArr[e]) ? max:parseInt(checkArr[e])
        }
        for(let f=0;f<checkArr.length;f++){
          min=parseInt(checkArr[f]) > min ? min:parseInt(checkArr[f])
        }  
        let ldata=parseInt(checkArr[arrlength-1])
        console.log(ldata)
        let a=Math.abs(bmin-min)
        let b=Math.abs(bmax-max)
        console.log(a)
        console.log(b)
        if(a!=1&&b!=1){
          a=checkArr.slice(0,checkArr.length-1)
          
          for (let i = 0, lenI = items.length; i < lenI; ++i) {
            items[i].checked = false
      
            for (let j = 0, lenJ = a.length; j < lenJ; ++j) {
              if (items[i].value === a[j]) {
                items[i].checked = false
              
               break
              }
              if(items[i].value==Barr[0]){
                items[i].checked = true
                
              }
              if(items[i].value==Barr[0]){
                
                 w=i+1
                
               
              }
            } 
          }
          items[w].checked=true
          this.setData({
            items1:items
          })
        }else{
          a=checkArr
          for (let i = 0, lenI = items.length; i < lenI; ++i) {
            items[i].checked = false
      
            for (let j = 0, lenJ = a.length; j < lenJ; ++j) {
              if (items[i].value === a[j]) {
                items[i].checked = true
                break
              }
            }
          
          }
          this.setData({
            items1:items
          })
        }
      }
    }else{
     
      let items = this.data.items1
      const values = e.detail.value
     for(let h=0;h<items.length;h++){
       if(items[h].value==values[0]){
        console.log(items[h])
        if(h>0){
          if(items[h-1].checked==true||items[h].checked==true){
            items[h].checked = false
            items[h-1].checked =false
            items[h+1].checked = false
            this.setData({
                items1:items
            })
          }
          else{
            let f=0
            for (let i = 0, lenI = items.length; i < lenI; ++i) {
              items[i].checked = false
        
              for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
                if (items[i].value === values[j]) {
                    items[i].checked = true
                    f=i+1
                    console.log(items[i])
                    console.log(items[i+1])
                    console.log(items[i+1].checked)
                }
              }
            }
            items[f].checked = true
            this.setData({
              items1:items
            })
          }
        }else{
          if(items[h].checked==true||items[h+1].checked==true){
            items[h].checked = false
            // items[h-1].checked =false
            items[h+1].checked = false
            this.setData({
                items1:items
            })
          }else{
            items[0].checked = true
            items[1].checked = true
            this.setData({
              items1:items
            })
          }
       
        }
       
        }
       }
        
       
     }
      
    
  
   

  },
 
  look() {
    const show = this.data.show
    this.setData({
      show: false
    })
    wx.pageScrollTo({
      scrollTop:360
    })
  },
  look1() {
    const show = this.data.show
    this.setData({
      show:true
    })
    wx.pageScrollTo({
      scrollTop:160
    })
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
    console.log(arr.length)
   
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

  submit: function () {
    
    const id=this.data.id
    const items1=JSON.stringify(this.data.items1)
    const dblist=this.data.dblist
    console.log(this.data.dblist,"dblist1")
    const time=this.data.time
    const checked=this.data.items1
    console.log(checked)
    let a=checked.filter((r)=>{
      return r.checked==true
    })
    console.log(a[0].value)
   
   
    console.log(a)
    if(a.length==0){
      wx.showToast({
        title: '请选择时间',
        icon:'none'
      })
    }else{
      let min=parseInt(a[0].value)
      let max=parseInt(a[0].value)
      for(let e=0;e<a.length;e++){
        let c=a[e].value
        max=max >parseInt(c) ? max:parseInt(c)
      }
      for(let f=0;f<a.length;f++){
        let d=a[f].value
        min=parseInt(d) > min ? min:parseInt(d)
      }  
      if(max-min==a.length-1){
        wx.navigateTo({
              url: '../orderconfirm/orderconfirm?items1='+items1+'&today='+time+'&id='+id+'&dblist='+dblist,
            })
      }else{
        wx.showToast({
          title: '请选择连续时间段',
          icon:'none'
        })
      }
    }
   
 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
 getappointment(value,belong){
   const that=this
   let dd=this.data.time2
   console.log(dd)
const day=parseInt(value)
if(day==this.data.isToday){
  console.log('是今天')
  this.setData({
    show6:false
  })

wx.showLoading({
  title: '正在加载',
})
console.log(111)
   setTimeout(res=>{
    db.collection(belong).where({
      month_day:value
     }).get({
       success:res=>{
         console.log(res)
         wx.hideLoading({
          
         })
         if(res.data.length==1){
           var list=res.data[0].appointment_detail.filter((p) => {
            return p.disabled == false ;
        });
   
        var list1=list.filter((p=>{
          return p.time > dd
        }))
              this.setData({
                dblist:JSON.stringify(res.data[0].appointment_detail),
                items1:list1
              })
         }    
         else{
           
           db.collection(belong).add({
             data:{
              month_day:value,
              appointment_detail:daydetail
             },
             success:res=>{
              console.log(111)
              console.log(that.data.items1)
              that.setData({
                dblist:JSON.stringify(daydetail) ,
                items1:daydetail
              })
             }
           })
          
         }
       },
       fail:err=>{
         console.log(err)
       }
     })
    this.setData({
      show6:true
    })
  },1000)
}else{
  console.log('不是今天')
  this.setData({
    show6:false
  })

wx.showLoading({
  title: '正在加载',
})

   setTimeout(res=>{
    db.collection(belong).where({
      month_day:value
     }).get({
       success:res=>{
       wx.hideLoading({
       })
         if(res.data.length==1){
           var list=res.data[0].appointment_detail.filter((p) => {
            return p.disabled == false ;
        });
        console.log(list)
              this.setData({
                dblist:JSON.stringify(res.data[0].appointment_detail),
                items1:list
              })
              console.log(this.data.items1)
         }    
         else{
           db.collection(belong).add({
             data:{
              month_day:value,
              appointment_detail:daydetail
             },
             success:res=>{
              wx.hideLoading({
              })
              this.setData({
                dblist:JSON.stringify(daydetail),
                items1:daydetail
              })
             }
           })
          
         }
       }
     })
    this.setData({
      show6:true
    })
  },1000)
}
 
 },
  radioChange: function (e) {
   
    console.log(e.detail.value)
    const value=e.detail.value
    const belong=this.data.belong
    this.getappointment(value,belong)
  
    const time = e.detail.value
    var dateArr = this.data.dateArr;
    for (var i = 0; i < dateArr.length; ++i) {
      dateArr[i].checked = dateArr[i].isToday == e.detail.value
    }
    this.setData({
      showtime:true,
      time: time,
      dateArr: dateArr
    });
    console.log(this.data.isToday)
setTimeout(res=>{
  wx.pageScrollTo({
    scrollTop: 160,
})
},1100)
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