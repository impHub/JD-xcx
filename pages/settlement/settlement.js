// pages/settlement/settlement.js
const app = getApp();
const interfaces = require('../../utils/urlconfig');
console.log('1111111')
console.log(app,'app')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartArray: [],
    totalMoney: 0,
    text: '收货地址',
    details:'',//详细信息
    orderId:'',
    
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
          console.log('已经授权')
          wx.chooseAddress({
            success: (res) => {
              console.log(res.userName)
              console.log(res.postalCode)

              console.log(res.provinceName)
              console.log(res.cityName)
              console.log(res.countyName)
              console.log(res.detailInfo)
              let add = '' + res.provinceName + res.cityName + res.countyName + res.detailInfo;
              let Details = res.userName + res.telNumber + add;
              
              console.log(Details,'add9999999999999999999999')
              console.log(res.nationalCode)
              console.log(res.telNumber)
              // console.log(this)
              this.setData({
                text: add,
                details:Details
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
                success:(res)=> {
                  console.log(res.userName)
                  console.log(res.postalCode)
                  console.log(res.provinceName)
                  console.log(res.cityName)
                  console.log(res.countyName)
                  console.log(res.detailInfo)
                  console.log(res.nationalCode)
                  console.log(res.telNumber)
                  let add = '' + res.provinceName + res.cityName + res.countyName + res.detailInfo;
                  let Details = res.userName + res.telNumber + add;
                  
                  console.log(Details,'add9999999999999999999999')
                  console.log(res.nationalCode)
                  console.log(res.telNumber)
                  // console.log(this)
                  this.setData({
                    text: add,
                    details:Details
                  })
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
      url: 'http://192.168.31.220:8000/mall/wx/order/pay',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        openId: openid,
        addr:this.data.details,
        orderId:this.data.orderId
      },
      success:res=>{
        console.log(res)
        if (res.statusCode == '200') {
          console.log(res,'支付信息')
          wx.requestPayment({
            'timeStamp': res.data.timeStamp,
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': res.data.signType,
            'paySign': res.data.paySign,
            success:res=>{
              if (res.errMsg == 'requestPayment:ok') {
                wx.showToast({
                  title: '支付成功',
                  icon: 'success',
                  duration: 2000,
                  success: res=> {
                      console.log(res)
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
    let num = 0;
    // 遍历数组
    cartArray.forEach(res => {
      i++;
      // 总价计算
      // let price = parseInt(res.price) * res.total;
      // totalPrice += price;

      let price = parseFloat(res.price)*100*res.total;
      
      totalPrice += price;
      num = totalPrice/100;
    })
    // 得到数据 计算 总价 个数 是否全选 
    // 更新计算结果  
    this.setData({
      cartArray: cartArray,
      totalMoney: num,
    })
    console.log(this.data.cartArray)


  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 
    wx.getStorage({
      key: 'cartInfo',
      success: res => {
        let obj = [];
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
        console.log(arr,'arr', add,'add',app.globalData.userId)//分别是选中和没被选中的商品
        obj = arr;
        console.log(obj,'obj')
        wx.request({
          url:interfaces.order,
          method:'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data:{
            userId:app.globalData.userId,
            // userId:1,
            list:JSON.stringify(obj)
          },
          success:res=>{
            console.log(res,'huidiao')
           this.data.orderId = res.data.orderId
          }
        })
        this.Calculation(arr)
      }
    })
    // 
    console.log(app.globalData.userId,'USERID')
    // wx.request({
    //   url:interfaces.order,
    //   method:'POST',
    //   success:res=>{
    //     wx.getStorage({
    //       key: 'cartInfo',
    //       success: res => {
    //         const arr = [];
    //         const add = [];
    //         const cartArray = res.data;
    //         // console.log(cartArray)
    //         cartArray.forEach(res => {
    //           if (res.select) {
    //             arr.push(res);
    //           } else {
    //             add.push(res);
    //           }
    //         })
    //         console.log(arr,'arr', add)//分别是选中和没被选中的商品
    //         this.Calculation(arr)
    //       }
    //     })
    //   }
    // })
    
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
    // wx.getStorage({
    //   key: 'cartInfo',
    //   success: res => {
    //     const arr = [];
    //     const add = [];
    //     const cartArray = res.data;
    //     // console.log(cartArray)
    //     cartArray.forEach(res => {
    //       if (res.select) {
    //         arr.push(res);
    //       } else {
    //         add.push(res);
    //       }
    //     })
    //     console.log(arr, add)//分别是选中和没被选中的商品
    //     this.Calculation(arr)
    //   }
    // })
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