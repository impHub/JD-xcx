//app.js
App({
  onLaunch: function () {
    console.log(this.globalData)
    let appid = 'wx6eeb04b248b4152b',
        secret = '3db6adfd99a8f2d4f19e10b22a947db2';

    // let url = 'https://www.lixikeji.cn/Lxkj_WeChatMall'
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    if(!wx.cloud){
      console.log('请使用2.2.3以上版本')
    }else{
      wx.cloud.init({
        traceUser:true
      })
    }
    // 登录
    console.log('jl')
    wx.login({
      success: res => {
        console.log(res,'app.js  code')
        wx.request({
          url: 'https://www.lixikeji.cn/Lxkj_WeChatMall/wxPayController/GetOpenid.do',
          // url:'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&js_code='+res.code+'&grant_type=authorization_code',
          // data: {
          //   code:res.code
          // },
          
          // header: {
          //     'content-type': 'application/json'
          // },
          // method:OPTIONS,
          success: function(res) {
            console.log(res,'获取openid')
            // openid = res.data.openid //返回openid

            wx.request({
              url:"https://wd6722557241mhrlvs.wilddogio.com/posts.json",
              data:{
                name:'yujiarui',
                
              },
              method:'POST',
              success:res=>{
                console.log(res,'yujiarui成功')
              }
            })


          }
        })




        let data = res.data
        wx.request({
          url: 'https://www.lixikeji.cn/Lxkj_WeChatMall/mallUserController/addMallUser.do',
            //  url:'https://www.lixikeji.cn/Lxkj_WeChatMallUserController/addMallUser.do',
            // url:'https://www.lixikeji.cn/Lxkj_WeChatMall/mallUserController/addMallUser.do',
          //   data: {
          //     code: res.code
          //   },
          // method:'POST',
          success:res=>{
            console.log(res,'id成功')
          },
          fail:res=>{
              console.log(res,'fila')
          },

          })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
      
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  //当进去小程序时用户信息会存储到userInfo里
  globalData: {
    userInfo: null,
    openId:'2'
  }
})