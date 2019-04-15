const interfaces = require('../../utils/urlconfig')
// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 装的是当前点进来时那个商品的数据
    partData:null,
    baitiao:null,
    // 最终的白条信息
    baitiaoSelectItem:{
      desc:'【白条支付】首单享立减优惠'
    },
    hidebaitiao:true,

    hideBuy:true,
    badgeCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id,'id')
      wx.showLoading({
        title:'加载中....',
      })
      wx.request({
        url:interfaces.productionDetail,
        success:res=>{
          // data才是我们的数据
          // console.log(res.data)
          // 循环遍历 
          res.data.forEach(data=>{
            // console.log(data.baitiao)
            // id相匹配时，改变数据
            if(data.partData.id == options.id){
              data.partData.select = true;
              // console.log(data,'sa')
              this.setData({
                partData:data.partData,
                 baitiao:data.baitiao   
              })
            }
          })
          wx.hideLoading();
        }
      })

      
  },
// 把组件注册事件重新定义
  popBaitiaoView(){
    // console.log('detail白条')
    //点击之后弹出白条详细信息
    this.setData({
      hidebaitiao:false
    })
  },
  popBuyView(){
    this.setData({
      hideBuy:false
    })
    // console.log('已选')
  },

  //点击白条
  liouView(e,a){
    // e.detail来接收组件传来的数据
    // console.log(e.detail.desc,'点击白条',a)
    this.setData({
      baitiaoSelectItem:e.detail,
      // baitiao:[1,2,3]
      // hidebaitiao:true
    })
  },

  getcount(e){
    // console.log(e,'detail.js')
    //获取到数量
    let deta = e.detail;
    // console.log(this.data.partData)
    let partData = this.data.partData;
    //把获取到的数量赋值
    partData.count = deta;
    // 改变初始的parData
    this.setData({
      partData:partData
    })
    // this.setData()
  },

  // 加入购物车
  addCart(){
    // console.log('加入购物车');
    // 从本地缓存中异步获取指定 key 的内容
    wx.getStorage({
      // 本地缓存中指定的 key
      key:'cartInfo',
      // 接口调用成功的回调函数
      success:res=>{
          
          // 存储当前 key里的值
          const cartArray = res.data;
          // 当用户每次进入detail里的 数据
          const partData = this.data.partData;
          // 
          // partData.select = true;
          // console.log('触发success',res.data)
          //循环遍历cartArray里的id来和 partData里的id做比较
          //id相同只修改数量，不相同则添加新的数组
          let key = true;
          cartArray.forEach(cart=>{
            // console.log(cart.total)
            // console.log(cart.id,'遍历')
            // 存在商品时直接加数量
            if(cart.id == this.data.partData.id){
              key = false;
              // console.log(cart.id == this.data.partData.id,'相同')
              // console.log(res.id,'id相同',this.data.partData.count,res.id)
              // 数量相加
              cart.total += this.data.partData.count;
              cart.select = true;
              //更新数据
              wx.setStorage({
                key:'cartInfo',
                data:cartArray
              })
              // 改变购物车图标
              this.badge(cartArray);
            } 
          })

          if(key){  //不存在商品时push整个商品数据

            let partData = this.data.partData;
            //单个商品的数量
            partData.total = this.data.partData.count;
            // partData.select = true;
            // console.log('不存在时',this.data.partData.count);
            // let cartArray = [];
            // console.log(cart,999,cartArray)
            cartArray.push(partData);
             //更新数据
             wx.setStorage({
              key:'cartInfo',
              data:cartArray
            })
            // 改变购物车图标
            this.badge(cartArray);
          }

          // console.log(cartArray);
      },
      
      // 接口调用失败的回调函数
      fail:res=>{
        let partData = this.data.partData;
        //单个商品的数量
        partData.total = this.data.partData.count;
        // 商品是否选中
        // partData.select = true;
        // console.log('fail',this.data.partData.count);
        let cartArray = [];
        cartArray.push(partData)
        // 将数据存储在本地缓存中指定的 key 中
        wx.setStorage({
          // 本地缓存中指定的 key
          key:'cartInfo',
// 需要存储的内容。只支持原生类型、Date、及能够通过JSON.stringify序列化的对象
          data:cartArray
        })

         // 改变购物车图标
         this.badge(cartArray);
      },
      
    })
    // 提示动画
      wx.showToast({
        title:'加入购物车成功',
        duration:3000
        
      })
  },

  // 购物车
  add(e){
      // 用微信提供的api进行跳转到新的页面
      // tab专用跳转方法
      wx.switchTab({
        url:'/pages/cart/cart'
      })
     
  },

  badge(index){
    this.setData({
      badgeCount:index.length
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
    // console.log(9898)
    wx.getStorage({
      key:'cartInfo',
      success:res=>{
        // console.log(res,9898)
        const cartArray = res.data;
        this.badge(cartArray);
      }
    })
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