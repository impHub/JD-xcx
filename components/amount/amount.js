// components/amount/amount.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count:{
      type:Number,
      value:1
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
    subtract(e){
      // console.log('减')
      if(this.data.count > 1){
        
        let index = --this.data.count;

      this.setData({
        count : index
      })

      this.triggerEvent('inputChangHandle',index)

      // this.triggerEvent('subevent');
      }
      
    },

    inputChangHandle(e){
      
      // 获取到里面的值
      // console.log(e.detail.value,'v-modle触发',e)
      let value = e.detail.value;
   

      this.triggerEvent('inputChangHandle',value)
    },
    
    add(e){
      // console.log('jia')
      let index = ++this.data.count;
      this.setData({
        count : index
      })
      // this.inputChangHandle();
      this.triggerEvent('inputChangHandle',index)
      // console.log('jia',this)
       // 点击加号触发
      //  this.triggerEvent('addevent');
    },
    app(){
      // console.log('app')
    }
  }
})
