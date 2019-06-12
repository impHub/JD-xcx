const interfaces = require('../../utils/urlconfig');
  //获取到全局app.js里的实例 app({})
  const app = getApp();
  

// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:{},
      hasUserInfo:false,
      // 判断这个api能不能使用，返回布尔值
      canIUse:wx.canIUse('button.open-type.getUserInfo')
  },
  // 实现获取用户信息方法
  getUserInfo(e){

    wx.authorize({
      scope: 'scope.userInfo',
      success:res=> {

        console.log(res,'成功')
        // console.log(e.detail.userInfo);
        this.setData({
          // 把获取到的信息赋值
          userInfo:e.detail.userInfo,
          hasUserInfo:true
        })
        // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
        // wx.startRecord()
      }
    })

  
  },
  // cclick: function(){
  //   wx.getUserInfo({
  //   success: function (res) {
    
  //   },
  //   fail: function(){
    
  //   }
  //   })
  //   },
  getUserInfoFunction: function (e) {
    console.log('chufa',e)
    if (!e.detail.userInfo) {
      console.log('jil')
      wx.showModal({
        title: '提示',
        content: '为了您的用户体验请同意授权！',
        showCancel: false
      })
    } else {
      console.log('jil2')
      app.globalData.userInfo = e.detail.userInfo;
      wx.setStorageSync('userInfo', e.detail.userInfo);
      this.onLoad()
    }
  },

  
  zhuanfa(){
    //步数
    wx.getWeRunData({
      success(res) {
        // const encryptedData = res.encryptedData
      }
    })
    // 触发时会跳转到授权页面查看改变授权状态
    // wx.openSetting({
    //   success(res) {
    //     console.log(res.authSetting)
    //     // res.authSetting = {
    //     //   "scope.userInfo": true,
    //     //   "scope.userLocation": true
    //     // }
    //   }
    // })
    wx.startRecord()//录音权限请求
    // 弹出授权询问
    wx.authorize({
      // 授权类别 发票
      scope: 'scope.invoice',
      // 成功返回
      success() {
        console.log('发票功能')
        // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
        // wx.startRecord()
      },
      fail(){
        console.log('失败')
      }
    })
    // wx.authorize({
    //   scope: 'scope.record',
    //   success() {
    //     // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //     wx.startRecord()
    //   }
    // })
    wx.login({
      success: res => {
        console.log(res,'login')
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    wx.getSetting({
      success(res) {
        console.log(res.authSetting,'getSetting')
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
      }
    })
    wx.request({
      url: "https://wd6722557241mhrlvs.wilddogio.com/posts.json",
      header:{
        "content-type":"application/json"
        //默认值，返回的数据设置为json数据格式
      },
      data:{name:12},
      // success(res){
      //   console.log(res,'请求成功');
      //   console.log(this)
      // }
      method: "POST",
      //需要用箭头函数不然找不到this
      success : res=>{
        console.log(res,'me.js,post 请求');
        // console.log(res.data.quicks,'请求成');
        // console.log(this,'hah');
        //获取数据存储到本地
       
        //2. 加载完成停止loading
        // wx.hideLoading()
      }
  })
    // 收获地址 第一次触发会有提示窗
    // wx.chooseAddress({
    //   success(res) {
    //     // 成功授权后点击触发会跳到专门的收获地址，进行选择添加
    //     // 选择后可以在这个函数里获取
    //     console.log(res.userName)
    //     console.log(res.postalCode)
    //     console.log(res.provinceName)
    //     console.log(res.cityName)
    //     console.log(res.countyName)
    //     console.log(res.detailInfo)
    //     console.log(res.nationalCode)
    //     console.log(res.telNumber)
    //   }
    // })
    // wx.showShareMenu({
    //   withShareTicket:true
    // })
    wx.getSetting({
      success(res) {
        console.log('shouquan')
        if (!res.authSetting['scope.record']) {
          console.log('shouquan2')
          wx.authorize({
            scope: 'scope.record',
            success() {
              console.log('shouquan')
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              // wx.startRecord()
            }
          })
        }
      }
    })
  },
  add(){
    console.log('add')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad监听页面加载',1)
    // console.log(getApp());
    // //在进入是监听判断
    if(app.globalData.userInfo){
      // console.log(app.globalData)
      this.setData({
        // 把获取到的信息赋值
        userInfo:app.globalData.userInfo,
        hasUserInfo:true
      })
    }else if(this.data.canIUse){
      //由于getUserIfo是网络请求，可能会在Page.onload后才返回
      //防止这种情况发生，所以此处加入callback回调函数
      app.userInfoReadyCallback = res =>{
        this.setData({
          userInfo:res.userInfo,
          hasUserInfo:true
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady监听页面初次渲染完成',2)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow监听页面显示',3)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide监听页面隐藏',4)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload监听页面卸载',5)
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