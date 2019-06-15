// pages/cart/cart.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartArray:[],
    totalMoney:'0.00',//总价
    totalCount:0,//商品个数
    selectAll:false, //是否全选
    key:true,
    touchX:0,//开始坐标
    // slide:0,
    // 是否授权
    authorization:false
  },
  getUserInfo(e){
    console.log(e)
    wx.authorize({
      scope: 'scope.userInfo',
      success:res=> {

        console.log(res,'成功')
        // console.log(e.detail.userInfo);
        //把用户授权信息存储到全局
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
          // 把获取到的信息赋值
          authorization:true
        })
        // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
        // wx.startRecord()
      }
    })

  
  },
//增减组件事件
getCount(e){
  
  let key = true;
  // 获取到当前点击的 index
    const index = e.currentTarget.dataset.index;
    // console.log(cartArray,'一进来')
    // 获取数据
    const cartArray = this.data.cartArray;
    // e.detail时子组件处理之后传来的值
    cartArray[index].total = e.detail;//这里改变cartArray同时也改变了this.data.cartArray
  // 点击加减也会执行这个函数
    // console.log(e.detail);
    if(e.detail>=1){
      // 打勾函数
      this.active(e,key);
    }
  },
  // 跳转到deltail
  addDeltail(e){
      let index = e.currentTarget.dataset.index;
      // console.log(e.currentTarget.dataset.index,9500,this.data.cartArray[index]);
      wx.navigateTo({
        //   前面时路径        id时传过去的变量 
        url:"/pages/detail/detail?id=" + this.data.cartArray[index].id
      })
      
  },
  // 点击图片打勾
  active(e,c){
    let i = 0;
    // console.log(e.currentTarget.dataset,'active',this.data.cartArray)
    // 得到用户点击商品的id
    let id = e.currentTarget.dataset.id;
    //获取用户点击商品的索引
    let index = e.currentTarget.dataset.index;
    //目前data里的cartArray 是经过getCount里修改过的 
    let cartArray = this.data.cartArray;
    //获取当前商品价格
      let jiage = parseInt(cartArray[index].price);
    //获取当前商品数量
      let total = cartArray[index].total;
      // 总价
      let totalPrice = 0;
    //这个地方修改了 cartArray相当修改了另外两个相关联的数据
    //cartArray = this.data.cartArray = getCount的cartArray
    // 点击勾选
    // 切换状态
    if(c){
      // 当点击+ —号时执行
      cartArray[index].select = true;
    }else{
      cartArray[index].select = !cartArray[index].select;
    }
    // 计算函数触发
   this.Calculation(cartArray);
  },
// 计算函数
Calculation(cartArray){
  // 总价
  let totalPrice = 0;
  //数量
  let i = 0; 
  let key = true;
  let num = 0;
    // 遍历数组
    cartArray.forEach(res=>{
      res.isTouchMove = false;//是否滑动
      if(res.select){
        // 结算数量
        i++;
        // 总价计算
      let price = parseFloat(res.price)*100*res.total;
      
      totalPrice += price;
      num = totalPrice/100;
      // let num = 100;
      console.log(price,totalPrice,'总价的计算')
      }else{
        // 全选功能
        key = false;
      }
    })
// 得到数据 计算 总价 个数 是否全选 
// 更新计算结果  
       this.setData({
        cartArray :cartArray,
        totalMoney:num,
        totalCount:i,
        selectAll:key
      })
      wx.setStorage({
        key:'cartInfo',
        data:cartArray
      })
},
  // 全选
  selectAll(){
     let key = !this.data.selectAll;
    const cartArray = this.data.cartArray;
    if(key){
      cartArray.forEach(res=>{
        // console.log(res);
        res.select = true;
      })
    }else{
      cartArray.forEach(res=>{
        // console.log(res);
        res.select = false;
      })
    }
   
    this.Calculation(cartArray);
     this.setData({
      selectAll:key,
     })
  },
  // 手指点下时 触发 记录起点位置
  touchstart(e){
    // console.log(e.changedTouches[0].clientX,'touchstart');
    this.data.touchX = e.changedTouches[0].clientX;
  },
  // 开始滑动时 不停的会触发
  touchmove(e){
    let x = e.changedTouches[0].clientX;
    let y = this.data.touchX;
    let index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    //往左滑
    if(y-x >= 50){
      //把其他的变成false
      cartArray.forEach(res=>{
        res.isTouchMove = false;
      })
      //当前的变成 滑出状态
      cartArray[index].isTouchMove = true;
    //向右滑
    }else if(x-y >= 50){
      cartArray[index].isTouchMove = false;
    }
    //更新数据
    this.setData({
      cartArray:cartArray
    })
    // console.log(e.changedTouches[0].clientX,'touchmove',this.data.touchX)
  },
  //删除
  delete(e){
    let index = e.currentTarget.dataset.index;
    let cartArray = this.data.cartArray;
    // 切割数组
    cartArray.splice(index,1);
    //删除后的值 穿到计算属性 去渲染
   this.Calculation(cartArray);
// 动态改变 购物车 小红标
   if(cartArray.length >0){
    wx.setTabBarBadge({
      // tabar的index位
      index:2,
      text:String(cartArray.length)
     }) 
  }else{
    // tabar的index位 remove掉
    wx.removeTabBarBadge({
      index:2,
    })
  }
  },
// 结算
  Settlement(){
    if(this.data.totalCount >0){
      
      wx.navigateTo({
        //   前面时路径        
        url:"/pages/settlement/settlement"
      })
    }else{
      wx.showToast({
        title:'未选择商品',
        duration:2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
      // console.log('第一个生命周期函数');
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
    // 授权判断
    wx.getSetting({
      success :res=>{
        // console.log(res.authSetting['scope.userInfo'],'panduan')
        //已经授权
        if(res.authSetting['scope.userInfo']){
          this.setData({
           authorization : true
          })
        }else{//未授权
          this.setData({
            authorization : false
           })
        }
      }
    })
    // 
    let totalPrice = 0;
    // console.log('触发生命周期onShow')
  //  每次进来都会触发
    wx.getStorage({
      key:'cartInfo',
      // 把接收缓存里的数据 
      success:res=>{
        let index = 0;
        const cartArray = res.data;
        console.log(cartArray,'缓存数据');
          this.Calculation(cartArray);
          // 设置tabbar图标
        if(cartArray.length >0){
          wx.setTabBarBadge({
            // tabar的index位
            index:2,
            text:String(cartArray.length)
           }) 
        }else{
          // tabar的index位 remove掉
          wx.removeTabBarBadge({
            index:2,
          })
        }
      }
    })
    // console.log(this.data.cartArray,'购物车数据')
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