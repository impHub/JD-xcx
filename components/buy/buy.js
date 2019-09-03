// components/buy/buy.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      //是否弹出
    hideBuy:{
      type:Boolean,
      //默认隐藏
      value:true
    },
    //白条数据
    partData:{
      type:Object
    },
    cartArr:{
      type:Array
    },
    arrid:{
      type:Number,
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
    classF(e){

      console.log('btn',e.target.dataset.item)

      var data = e.target.dataset.item;
      this.triggerEvent('classF',data)
    },
    hideBaitiaoView(e){
      // console.log('guabi',e.target.dataset)
      if(e.target.dataset.item == 'close'){
          this.setData({
            hideBuy:true
          })
      }
    },
    
    getcount(e){
      // console.log(e.detail,'buy.js');
      let deta = e.detail;

      this.triggerEvent('getcount',deta)
    },

    buy(){
      this.setData({
        hideBuy:true
      })
      this.triggerEvent('buy')
    },
    onClickButton(){
      this.triggerEvent('onClickButton')
    }
  }
})
