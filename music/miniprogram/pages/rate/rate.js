// pages/rate/rate.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[],
text_full:'<p><span style="color:#ffffff;font-size:18px">我们致力于帮助更多音乐人、艺术家们以及爱好者录制更加完美的声音;有必要关于优惠方面的问题，我们欢迎以量议价;所有录音棚预定价格均包含一位录音师</span></p><p style="text-align:center;"><span style="color:#fdda00">录音棚时计费方式</span></p><p style="text-align:center;"><span style="color:#fdda00">(依照国际通用方式)</span></p><p style="text-align:center;"><span style="color:#fdda00">一一一一一一一一一一一一一一一一一</span></p><ul style="color:#5c5c5b"><li><span style="color:#ffffff">按客户预定的专属时段收费;请提前15分钟到场准备。</span></li><li><span style="color:#ffffff">设备调试、试音选麦及文件处理工作都应在预定时段内完成;</span></li><li><span style="color:#ffffff">在租用时段内完成后期制作，只收取棚时费，无额外制作费;</span></li><li><span style="color:#ffffff">后续时段末被预定及录音师有档期则允许超时续订;</span></li><li><span style="color:#ffffff">超时续订最低以15分钟为单位计费(每1-15分钟均按15分钟计) ;</span></li><li><span style="color:#ffffff">★一经预定，未使用亦需要支付费用。</span></li></ul><p style="text-align:center;"></p><p></p><p></p><p></p><p style="text-align:center;"><span style="color:#fdda00">后期混音制作费:</span></p><p style="text-align:center;"><span style="color:#fdda00">按具体项目定价</span></p><p style="text-align:center;"><span style="color:#fdda00">一一一一一一一一一一一一一一一一一</span></p><p style="text-align:center;"><span style="color:#ffffff">有两种计费方式分别为:</span></p><p style="text-align:center;"><span style="color:#ffffff">a按曲目或项目要求定价;</span></p><p style="text-align:center;"><span style="color:#ffffff">b租用制作室制作(监制在场共同完成)</span></p><p style="text-align:center;"><span style="color:#ffffff">详情请查看线上预定页面一后期混音项目</span></p><p style="text-align:center;"></p><p style="text-align:center;"><span style="color:#fdda00">音乐创作与编曲:</span></p><p style="text-align:center;"><span style="color:#fdda00">请联系我们详谈</span></p><p style="text-align:center;"><span style="color:#fdda00">一一一一一一一一一一一一一一一一一</span></p><p></p><p><span style="color:#ffffff">或许您是企业需要创作属于自己文化的歌曲，或许你想写一首属于自己的歌曲送给你心爱的人，或许您的小孩演唱才华出众，迫不及待想唱一首原创歌曲，联系来麦秀，我们可以根据您的特定内容、风格要求创作您想要的音乐</span></p><p></p><p></p><p></p><p style="text-align:center;"><span style="color:#fdda00">MV摄制、演出摄制</span></p><p style="text-align:center;"><span style="color:#fdda00">音视频同步摄制</span></p><p style="text-align:center;"><span style="color:#fdda00">一一一一一一一一一一一一一一一一一</span></p><p style="text-align:center;"></p><p style="text-align:center;"><span style="color:#ffffff">我们提供出版级音乐会同步录音录像及制作、个人或企</span></p><p style="text-align:center;"><span style="color:#ffffff">业MV摄制、演出现场或者考学视频专业化录制。</span></p><p style="text-align:center;"><span style="color:#ffffff">具体项目请联系我们</span></p><p style="text-align:center;"></p>'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
this.getpicture()
this.getcontent()
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
  getcontent(){
   
    db.collection('rate').get({
      success:res=>{
        console.log(res)
       
        // console.log(res.data[0].rateContent)
        this.setData({
          text_full:res.data[0].rateContent
        })
      }
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  toreserve:function(){
    wx.switchTab({
      url: '../reserve/reserve',
    })
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