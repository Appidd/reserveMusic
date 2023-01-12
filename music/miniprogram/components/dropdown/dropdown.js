// components/dropdown/dropdown.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    propArray: {
      type: Array,
    },
    selectText:'',
    img:''
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectShow: false, //初始option不显示
    selectText: "请选择", //初始内容
    value:'B'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //option的显示与否
    selectToggle: function () {
      console.log(this.data.value)
      const value=this.data.value
      if(value=='B'){
        this.setData({
          propArray:[{
            "value":'A',
            "text":"A棚 | Studio A"
          }]
        })
      }else{
        this.setData({
          propArray:[{
            "value":'B',
            "text":"B棚 | StudioB"
          }]
        })
      }
      var nowShow = this.data.selectShow; //获取当前option显示的状态
      console.log(nowShow)
      this.setData({
        selectShow: !nowShow
      })
    },
    //设置内容
    setText: function (e) {
      console.log(e)
      var nowData = this.properties.propArray; //当前option的数据是引入组件的页面传过来的，所以这里获取数据只有通过this.properties
      console.log(nowData)
      var nowIdx = e.currentTarget.dataset.index; //当前点击的索引
      console.log(e)
      var nowText = nowData[nowIdx].text
      var img=nowData[nowIdx].img
      var value=nowData[nowIdx].value
      this.setData({
        selectShow: false,
        selectText: nowText,
        img,
        value
      })
      this.triggerEvent('select', nowData[nowIdx])
    }
  }
})