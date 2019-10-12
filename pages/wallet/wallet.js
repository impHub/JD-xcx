// pages/wallet/wallet.js
const interfaces = require('../../utils/urlconfig');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalData:Number(),
    val: '',
    key: true,
    userObj: {},
  },

  getUserInfo(e){
    // 没有授权是时
    if(app.globalData.userInfo == null){
      console.log(e,'getUserInfo')
      wx.request({
        url:interfaces.userName,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          userId: app.globalData.userId,
          userName:e.detail.userInfo.nickName
        },
        success:res=>{
         console.log(res.data)

        this.btn();
         
        }
      })
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        // 把获取到的信息赋值
        authorization:true
      })
    }else{
  this.btn();

    }
    
    
  },

  copy(){

    wx.navigateTo({
      //   前面时路径        id时传过去的变量 
      url:"/pages/qrcode/qrcode?id=" + this.data.userObj.userNumber 
    })

    // wx.setClipboardData({
    //   data: this.data.userObj.userNumber,
    //   success (res) {
    //     wx.getClipboardData({
    //       success (res) {
    //         console.log(res.data) // data
    //       }
    //     })
    //   }
    // })
  },
  onChange(e) {
    console.log(e.detail)
    this.data.val = e.detail;
  },
  btn() {
    let val = this.data.val;
    if (val.length == 17) {
      console.log('17位')
      console.log(Number(app.globalData.userId), typeof this.data.val)
      //  
      wx.request({
        url: interfaces.userReg,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          userId: Number(app.globalData.userId),
          userNumber: this.data.val,
        },
        success: res => {
          if(res.data.userId){
            console.log(res.data)
            // 请求成功跳转
            app.globalData.wallet = res.data;
            app.globalData.userscale = res.data.userscale;
            console.log(app.globalData.wallet)
            this.setData({
              key: true,
              userObj:res.data
            })
  
          }else{
            console.log('输入错误')
          }

        

        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.userNumber);
    let that = this;
    console.log('onLoad')

    wx.login({
      
      success (res) {
        console.log(res,'登录')
        if (res.code) {
          //发起网络请求
          wx.request({
            url: interfaces.login,
            // url:'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&js_code='+res.code+'&grant_type=authorization_code',
            header: {
              'content-type': 'application/json'
            },
            data:{
              code:res.code
            },
            success: (res) =>{
              console.log(res.data,'获取openid')
  
              // this.globalData.openId = res.data.openid //返回openid
              // this.globalData.userId = res.data.userid
              // this.globalData.userscale = res.data.userscale
              // 获取用户积分信息

              wx.showLoading({
                title:'加载中....'
              })
              console.log(this)
              console.log(app.globalData.userscale)
              // 用户之前 填写过邀请码
              if (app.globalData.userscale != '0') {
          
          
          
                console.log(app.globalData.userId)
                wx.request({
                  url: interfaces.card,
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  data: {
                    userId: Number(app.globalData.userId),
                    // userNumber:this.data.val,
                  },
                  success: res => {
                    console.log(res.data);
                    //当用户填写邀请码时
                    that.setData({
                      userObj:res.data,
                      key: true,
                    })
                    wx.hideLoading();
                  }
          
                })
          
              }else {
               let v =  decodeURIComponent(options.q)
               let len = v.substring(31);
                that.setData({
                  val:len,
                  key: false,
                  
                  // userObj:res.data
                })
              }
              wx.hideLoading();


              // 
              // wx.request({
              //   url:interfaces.card,
              //   data:{userId:res.data.userid},
              //   success:res=>{
              //     console.log(res.data);
              //     // this.globalData.card = res.data.userVoucher;
              //   }
              // })
    
  
  
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // var pages = getCurrentPages()
    // console.log(pages)


    if(!this.data.key){
      // var pages = getCurrentPages()    //获取加载的页面

      // var currentPage = pages[pages.length-1]    //获取当前页面的对象
      
      // var url = currentPage.route    //当前页面url
      
      // var options = currentPage.options    //如果要获取url中所带的参数可以查看options
      // console.log(options,currentPage);
      // if(options.userNumber == undefined){
      //   this.setData({
      //     val:'undefined'
      //   })
      // }else{
      //   this.setData({
      //     val:options.userNumber
      //   })
      // }
    
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow : function () {
    console.log(3);

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