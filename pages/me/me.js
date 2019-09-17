const interfaces = require('../../utils/urlconfig');
//获取到全局app.js里的实例 app({})
const app = getApp();


// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    userInfo: {},
    hasUserInfo: false,
    // 判断这个api能不能使用，返回布尔值
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 实现获取用户信息方法
  getUserInfo(e) {
    console.log(e)
    wx.authorize({
      scope: 'scope.userInfo',
      success: res => {

        console.log(res, '成功')
        // console.log(e.detail.userInfo);
        //把用户授权信息存储到全局
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
          // 把获取到的信息赋值
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        })
        // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
        // wx.startRecord()
      }
    })


  },
  btn(e) {
    // console.log(e.target.dataset.item)
    let x = e.target.dataset.item;
    switch (x) {
      case '0':
        console.log('我的订单')
        wx.navigateTo({
          url:"/pages/paid/paid"
        })
        break;
      case '1':
        console.log('收货地址')
        wx.chooseAddress({
          success(res) {
            console.log(res.userName)
            console.log(res.postalCode)
            console.log(res.provinceName)
            console.log(res.cityName)
            console.log(res.countyName)
            console.log(res.detailInfo)
            console.log(res.nationalCode)
            console.log(res.telNumber)
          }
        })
        break;
      case '2':
        console.log('联系客服')
        wx.navigateTo({
          url: '../service/service',
        })
        break;
      case '3':
        console.log('常见问题')
        wx.openSetting({
          success(res) {
            console.log(res.authSetting)
            // res.authSetting = {
            //   "scope.userInfo": true,
            //   "scope.userLocation": true
            // }
          }
        })
        break;

    }
  },
  // getUserInfoFunction: function (e) {
  //   console.log('chufa',e)
  //   if (!e.detail.userInfo) {
  //     console.log('jil')
  //     wx.showModal({
  //       title: '提示',
  //       content: '为了您的用户体验请同意授权！',
  //       showCancel: false
  //     })
  //   } else {
  //     console.log('jil2')
  //     app.globalData.userInfo = e.detail.userInfo;
  //     wx.setStorageSync('userInfo', e.detail.userInfo);
  //     this.onLoad()
  //   }
  // },


  // zhuanfa(){
  //   //步数
  //   wx.getWeRunData({
  //     success(res) {
  //       // const encryptedData = res.encryptedData
  //     }
  //   })
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
  // wx.startRecord()//录音权限请求
  // 弹出授权询问
  // wx.authorize({
  //   // 授权类别 发票
  //   scope: 'scope.invoice',
  //   // 成功返回
  //   success() {
  //     console.log('发票功能')
  //     // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
  //     // wx.startRecord()
  //   },
  //   fail(){
  //     console.log('失败')
  //   }
  // })
  // wx.authorize({
  //   scope: 'scope.record',
  //   success() {
  //     // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
  //     wx.startRecord()
  //   }
  // })



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



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success(res) {
      }
    })
    console.log('onLoad监听页面加载', 1)
    // console.log(getApp());
    // //在进入是监听判断
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      // console.log(app.globalData)
      this.setData({
        // 把获取到的信息赋值
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      //由于getUserIfo是网络请求，可能会在Page.onload后才返回
      //防止这种情况发生，所以此处加入callback回调函数
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady监听页面初次渲染完成', 2)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      num:app.globalData.card
    })
    wx.getSetting({
      success: res => {
        // console.log(res.authSetting['scope.userInfo'],'panduan')
        //已经授权
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              app.globalData.userInfo = res.userInfo;
              this.setData({
                // 把获取到的信息赋值
                userInfo: res.userInfo,
                hasUserInfo: true
              })
              console.log(res.userInfo)
            }
          })
        } else {//未授权
          console.log('weishouq1')
          this.setData({
            authorization: false
          })
        }
      }
    })
    console.log('onShow监听页面显示', 3)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide监听页面隐藏', 4)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload监听页面卸载', 5)
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
  // onShareAppMessage: function () {

  // }
})