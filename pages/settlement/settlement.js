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
    val:"0",//用户输入的值
    card:0,//积分
    cartArray: [],
    // 全部优惠信息
    offer:{},
    totalMoney: 0,
    text: '收货地址',
    details:'',//详细信息
    orderId:'',
    key:false,  //是否填写收货信息
    add:[], //未选中商品缓存
    // offer:'',//优惠信息
    // orderPrice:'',//优惠后的价格
    hcKey:false,//是否清楚结算后的缓存
    // transportPay:'',//邮费
    // discount:0,//优惠金额
    offerKey:false,//是否显示赠品
    cardKey:true,//输入积分前
  },
  chooseAddress() {
    let that = this;
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
              that.setData({
                text: add,
                details:Details,
                key:true
              })
              console.log(that.data.key,'key')
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
                  
                  // console.log(this)
                  that.setData({
                    text: add,
                    details:Details,
                    key:true
                  })
                  console.log(res.telNumber,that.data.key,'key')
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
    // if(null){
    //   console.log(null,'可以通过')
    // }
    // 验证openid和地址
    if(this.data.key){
      // 数字转换字符串
      this.data.val =  String(this.data.val);
      let openid = app.globalData.openId;
      console.log(typeof this.data.val);
      // console.log(openid,this.data.orderId,this.data.details,90)




      wx.request({
        url: interfaces.orderPay,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          openId: openid,
          addr:this.data.details,
          orderId:this.data.orderId,
          voucher:this.data.val
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
                      
                      // 
                      console.log(app.globalData.userId,this.data.val,Number(this.data.val))
                      wx.request({
                        url:interfaces.paySuccess,
                        data:{
                          orderId:this.data.orderId,
                          userId:Number(app.globalData.userId),
                          voucher:Number(this.data.val)

                        },
                        success:res=>{
                          console.log(res.data);
                          console.log(res.data.voucher)
                          // 抵扣积分后的值
                          app.globalData.card = res.data.voucher;
                        }
                      })
                        console.log(res,'150已支付')
                        // 清除以购买的缓存
                        if(this.data.hcKey){
                          wx.setStorage({
                            key:'cartInfo',
                            data:this.data.add
                          })
                        }
                        
                        
                      // setTimeout(function() {
                        wx.redirectTo({
                          url: '/pages/paid/paid',
                        });
                      // }, 1500)
                    }
                  });
                }
              }
            })
          }
        }
      })
    }else{
      wx.showModal({
        content: '请选择收货地址！',
        showCancel: false,
        success: (res) => {
          if (res.confirm) {
            console.log('收货地址，用户点击确定');
          }
        }
      });
    }
  
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
  onChange(e){
    console.log(e.detail)
    this.data.val = e.detail;
  },
  cardBtn(){
    console.log(this.data.offer.orderPrice,JSON.stringify(app.globalData.commodity));
    let n = this.data.offer.orderPrice;
    console.log(this.data.val,'输入')
    if(this.data.val == '0'){
      wx.showToast({
        title:'您输入的值为空',
        duration:2000,
        icon:"none"
      })
    }else{
      if(this.data.val > this.data.card){
        wx.showToast({
          title:'积分不足',
          duration:2000,
          icon:"none"
        })
  
        console.log('积分不足')
  
      }else if(this.data.val > n){
        wx.showToast({
          title:'积分金额大于结算金额',
          duration:3000,
          icon:"none"
        })
        console.log('积分金额大于结算金额',this.data.val)//用户使用的积分
        // console
      }else{
        // 
        console.log(this)
        let that = this;
        wx.showModal({
          title: '',
          content: '确认使用'+this.data.val + '金豆',
          success (data) {
            console.log(data)
            if (data.confirm) {
              console.log('可以使用',this)
        
              let num = that.data.offer.orderPrice;
              that.data.offer.orderPrice = num - that.data.val; 
              that.setData({
                cardKey:false,
                offer:that.data.offer,
                val:that.data.val
              })
  
            } else if (data.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }


   
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 数字
    console.log(typeof app.globalData.card);
    //获取全局积分
    this.setData({
      card:app.globalData.card
    })
    // this.data.card = app.globalData.card;

    console.log(options.id,'onLoad options')
    console.log(app.globalData.commodity,'支付全局')

    const commodity = [];
    console.log(commodity[0]);
    commodity.push(app.globalData.commodity)
    console.log(commodity)
    // options.id == 7 表示从商品详情页跳转的
    if(options.id == 7){
      
      console.log(options.id)
      // console.log(commodity);
      // commodity[0].total = app.globalData.commodity.total;
      console.log(app.globalData.commodity);
      let t = app.globalData.commodity;
      commodity[0].total = t.total;
      commodity[0].isTouchMove = false;

      wx.request({
        url:interfaces.order,
        method:'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data:{
          userId:app.globalData.userId,
          // userId:1,
          list:JSON.stringify(commodity)
        },
        success:res=>{
          let gift = res.data.gift;
          if(gift.length > 1){
            //有赠品时
            this.setData({
              offerKey:true
            })
          }
          
          console.log(res.data,'huidiao')
          // this.data.offer = res.data.promoteMsg;
          this.setData({
            offer:res.data,//所有优惠信息
            // transportPay:res.data.transportPay,//邮费
            // // offer:res.data.promoteMsg,//优惠信息
            // orderPrice:res.data.orderPrice//优惠后的价格
          })
         this.data.orderId = res.data.orderId
        }
      })
      // console.log(arr);
      // 
      this.Calculation(commodity)

    }else{
      wx.getStorage({
        key: 'cartInfo',
        success: res => {
          console.log(res.data)//缓存数据
  
          let obj = [];
          const arr = [];
          const add = [];
          console.log()
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
          this.data.add = add;
          obj = arr;
          console.log(obj,'obj')
          
          // 开始请求后台
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
              let gift = res.data.gift;
          if(gift.length > 1){
            //有赠品时
            this.setData({
              offerKey:true
            })
          }
              this.data.hcKey = true;
              console.log(res.data,'huidiao')
              // this.data.offer = res.data.promoteMsg;
              this.setData({
                offer:res.data,//所有优惠信息
                // transportPay:res.data.transportPay,//邮费
                // // offer:res.data.promoteMsg,//优惠信息
                // orderPrice:res.data.orderPrice//优惠后的价格
              })
             this.data.orderId = res.data.orderId
            }
          })
          console.log(arr);
          // 
          this.Calculation(arr)
        }
      })

    }
    // console.log(options.obj,'options');
    // 
  
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
  // onShareAppMessage: function () {

  // }
})