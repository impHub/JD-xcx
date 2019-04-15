// components/IOU/iou.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //是否弹出
    hideBaitiao:{
      type:Boolean,
      //默认隐藏
      value:true
    },
    //白条数据
    baitiao:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
     indexItem:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //弹出取消
    hideBaitiaoView(e){
      // console.log('guanbi1')
      // 只有完全点到这个dom时才会触发 e.target.dataset.target
      if(e.target.dataset.target == 'self'){
        this.setData({
          // 更改状态让它消失
          hideBaitiao:true
        })
      }
      // console.log(e.target.dataset.target)
      // console.log(79)
    
    },
    // 选中的分期
    selectItem(e){
      // console.log(e.currentTarget.dataset.index)
      let index = e.currentTarget.dataset.index;
      //得到index要实现两个功能
      //1，图片active切换
      let baitiao = this.data.baitiao;
      
      //每次点击后 把所有select变成false 
      for(let i = 0; i<baitiao.length;i++){
        baitiao[i].select = false;
      }
      // console.log(baitiao[index].select,1);
      //单独把选中的变成true
      baitiao[index].select = !baitiao[index].select;
     
      this.setData({
        baitiao:baitiao,
        indexItem:index
      })
      //2，当前选中的数据 展示出
    },
    
    //立即打白条
    liou(e){
      // console.log(this.data.baitiao,'立即打白条',this.data.indexItem)
      const select = this.data.baitiao[this.data.indexItem];
      this.setData({
        hideBaitiao:true
      })
      // 注册点击事件    第二个参数是传递参数
      this.triggerEvent('liou',select)
    }
  }
})
