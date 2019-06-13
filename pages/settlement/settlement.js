// pages/settlement/settlement.js
const app = getApp();
console.log('1111111')
console.log(app,'app')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartArray: [],
    totalMoney: 0,
    text: '收货地址'
  },
  chooseAddress() {
    // wx.openSetting({
    //   success(res) {
    //     console.log(res.authSetting)
    //     // res.authSetting = {
    //     //   "scope.userInfo": true,
    //     //   "scope.userLocation": true
    //     // }
    //   }
    // })

    console.log('shouh')
    wx.getSetting({
      success: (res) => {
        console.log(res.authSetting['scope.address'], '开始授权')
        if (res.authSetting['scope.address']) {
          console.log('2')
          wx.chooseAddress({
            success: (res) => {
              console.log(res.userName)
              console.log(res.postalCode)

              console.log(res.provinceName)
              console.log(res.cityName)
              console.log(res.countyName)
              console.log(res.detailInfo)
              let add = '' + res.provinceName + res.cityName + res.countyName + res.detailInfo;
              console.log(add)
              console.log(res.nationalCode)
              console.log(res.telNumber)
              // console.log(this)
              this.setData({
                text: add
              })
            }
          })
        } else if (res.authSetting['scope.address'] === false) {
          wx.openSetting({
            success(res) {
              console.log(res.authSetting)
              // res.authSetting = {
              //   "scope.userInfo": true,
              //   "scope.userLocation": true
              // }
            }
          })
        } else {
          wx.authorize({
            scope: 'scope.address',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
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
            },

          })
        }
      }
    })



  },
  // 支付
  Settlement() {
    let openid = app.globalData.openId;
    console.log(openid,90)
    wx.request({
      url: 'http://192.168.31.220:8000/mall/wx/pay',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        openid: openid,
      },
      success:res=>{
        if (res.statusCode == '200') {
          wx.requestPayment({
            'timeStamp': res.data.timeStamp,
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': res.data.signType,
            'paySign': res.data.sign,
            success:res=>{
              if (res.errMsg == 'requestPayment:ok') {
                wx.showToast({
                  title: '支付成功',
                  icon: 'success',
                  duration: 2000,
                  success: function() {
                    // setTimeout(function() {
                    //   wx.redirectTo({
                    //     url: '../order/order',
                    //   });
                    // }, 1500)
                  }
                });
              }
            }
          })
        }
      }
    })
  },

  Calculation(cartArray) {
    // console.log(cartArray,'计算函数')
    // 总价
    let totalPrice = 0;
    //数量
    let i = 0;
    // 遍历数组
    cartArray.forEach(res => {
      i++;
      // 总价计算
      let price = parseInt(res.price) * res.total;
      totalPrice += price;
    })
    // 得到数据 计算 总价 个数 是否全选 
    // 更新计算结果  
    this.setData({
      cartArray: cartArray,
      totalMoney: totalPrice,
    })
    console.log(this.data.cartArray)


  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.getStorage({
      key: 'cartInfo',
      success: res => {
        const arr = [];
        const add = [];
        const cartArray = res.data;
        // console.log(cartArray)
        cartArray.forEach(res => {
          if (res.select) {
            arr.push(res);
          } else {
            add.push(res);
          }
        })
        console.log(arr, add)//分别是选中和没被选中的商品
        this.Calculation(arr)
        // wx.setStorage({
        //   key:'cartInfo',
        //   // 没被选中的商品重新存入缓存
        //   //暂时不取消
        //   data:add
        // })
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