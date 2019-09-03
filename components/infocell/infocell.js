// components/infocell/infocell.js
//小程序提供的组件接口
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 定义的数据
      title:{
        type:String,//类型（必填），目前接收类型包括：String,Number,Boolean,
                    //Object,Array,null(表示任意类型)
      // 默认值可以为空
        value:'',
      },
      desc:{
        type:String,
        value:''
      },
      name:{
        type:String,
        value:''
      }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    popView:function(){
      // 这个函数里的事件也会被触发 
      // 而且是先触发子函数，再触发父级事件函数
        // console.log('infocell')
        //注册事件 到父级可以重新定义这个点击事件
        this.triggerEvent('popView')
    }
  }
})
