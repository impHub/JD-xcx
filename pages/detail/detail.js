const interfaces = require('../../utils/urlconfig')
const app = getApp();
// pages/detail/detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 装的是当前点进来时那个商品的数据
    arrid:0,
    partData:null,
    baitiao:null,
    // 最终的白条信息
    baitiaoSelectItem:{
      desc:'7 x 12小时在线'
    },
    hidebaitiao:true,

    hideBuy:true,
    badgeCount:0,
    imgDetail:[], //图片展示
    pageArr:[
    {sfName:'体验',id:3},
    {sfName:'季度',id:4},
    {sfName:'半年',id:5},
    {sfName:'包年',id:6},
  ]
  },
  //子点击关闭传来的值
  hideBaitiaoView(e){
    console.log(e.detail,'接受子传来的值')
    this.setData({
      hideBuy:e.detail
    })
  },
  // 立即购买
  onClickButton(){
    // if(this.data.totalCount >0){
      
      console.log(this.data.partData,'立即购买');
      // 立即购买商品数据存入全局
      app.globalData.commodity = this.data.partData;
      console.log(app.globalData.commodity,'全局')
      wx.navigateTo({
        //   前面时路径         // 7这个值传过去表示是从detail跳转的
        url:"/pages/settlement/settlement?id=" + 7
      })
    // }
  },

  // 点击图片
  previewImage:function(e){
    // console.log(e.target.dataset.index);
    let index = e.target.dataset.index;//当前点击的index
    console.log(index,'index')
    let that=this;
    let imgArray = that.data.imgDetail;//整个图片组
    let str = that.data.path;  //请求接口地址
    // console.log(imgArray[0],str,'99090')
    let newArray=imgArray.map(function(item){
        console.log(item)
      return str+'/'+item
    })
    wx.previewImage({
      // 用户当前点击图片的链接
      current:imgArray[index],
      //	需要预览的图片链接列表
      urls: imgArray,
      success:(res)=>{
        console.log(newArray,' 需要预览的图片http链接列表')
        console.log(res,'接口调用成功！');
      }
    })
  },
  importantData(id){
    // 得到穿来的商品ID
    // this.data.id = options.id;
    console.log(id,'id det')
      wx.showLoading({
        title:'加载中....',
      })
      wx.request({
        url:interfaces.detailImg,
        data:{productId:id},
        success:res=>{
          console.log(res.data)
          this.setData({
            imgDetail:res.data
          })
          // this.data.imgDetail = res.data;
        }
      })
      wx.request({
        url:interfaces.productionDetail,
        data:{productId:id},
        success:res=>{
          this.setData({
            arrid :id,
            partData:res.data,
            pageArr:res.data.category
          })
          console.log(res.data)


          // // 循环遍历 
          // res.data.forEach(data=>{
          //   // console.log(data.baitiao)
          //   // id相匹配时，改变数据
          //   if(data.partData.id == options.id){
          //     data.partData.select = true;
          //     // console.log(data,'sa')
          //     this.setData({
          //       partData:data.partData,
          //        baitiao:data.baitiao   
          //     })
          //     console.log(this.data.partData)
          //   }
          // })
         
          wx.hideLoading();
        }
      })

      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options99')
    console.log(7> options.id >2,'7777');
    // if( 7> options.id >2)
    this.importantData(options.id)
  },
// 把组件注册事件重新定义
  popBaitiaoView(){
    // 跳转到客服
    wx.navigateTo({
      url: '../service/service',
    })
    //点击之后弹出白条详细信息
    // this.setData({
    //   hidebaitiao:false
    // })
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
    console.log(e,'detail.js触发')
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

  //接受子组件的值
  classF(e){
    console.log(e.detail,'classIfication')
    // this.data.arrid = e.detail;
    
    this.setData({
      arrid :e.detail
    })
    this.importantData(e.detail)
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