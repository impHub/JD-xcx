
const drawQrcode = require("../../utils/weapp.qrcode.js")
const app = getApp();
// const drawQrcode = require("../../utils/jquery.qrcode.min.js")


// var pages = getCurrentPages()
// console.log(pages)
// const interfaces = require('../../utils/urlconfig');

// pages/service/service.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'',
    userName:'九农一品'
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
 
    console.log(app.globalData.userInfo.avatarUrl)
    // console.log(this.data.avatarUrl)
  // let avatarUrl = this.data.avatarUrl;
  // let avatarUrl = 
    
    console.log(drawQrcode)
    console.log(options);
    console.log(options.id)
    console.log(app.globalData);
    let val = app.globalData.userInfo;
    drawQrcode({
      width: 250,
      height: 250,
      canvasId: 'myQrcode',
      text: `https://lixikeji.cn?userNumber=${options.id}`,
      image: {
        // imageResource:this.data.avatarUrl,
        // imageResource:'https://wechatmall-img.oss-cn-shanghai.aliyuncs.com/dist/favicon.jpg',
        // imageResource: val.avatarUrl,
        // imageResource:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKdbXO4hT7gTPHH1c1txzcQCIBwRnwQt3TPiab8KcWBdvrt7NSx9IYn5khJxxoicb8U9wHESxr81uGw/132',
        dx: 80,
        dy: 80,
        dWidth: 40,
        dHeight: 40
      }
      // src:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKdbXO4hT7gTPHH1c1txzcQCIBwRnwQt3TPiab8KcWBdvrt7NSx9IYn5khJxxoicb8U9wHESxr81uGw/132'
    })
    this.setData({
      avatarUrl:app.globalData.userInfo.avatarUrl,
      // userName:app.globalData.userInfo.nickName
    })
 
    // setTimeout(()=>{
    //   console.log('setTimeout')
    //   drawQrcode({
    //     width: 200,
    //     height: 200,
    //     canvasId: 'myQrcode',
    //     text: `https://lixikeji.cn?userNumber=${options.id}`,
    //     image: {
    //       // imageResource: val.avatarUrl,
    //       imageResource:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKdbXO4hT7gTPHH1c1txzcQCIBwRnwQt3TPiab8KcWBdvrt7NSx9IYn5khJxxoicb8U9wHESxr81uGw/132',
    //       dx: 80,
    //       dy: 80,
    //       dWidth: 40,
    //       dHeight: 40
    //     }
    //     // src:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKdbXO4hT7gTPHH1c1txzcQCIBwRnwQt3TPiab8KcWBdvrt7NSx9IYn5khJxxoicb8U9wHESxr81uGw/132'
    //   })
    // },2000)
    // console.log(QRCode);
    
// var qrcode = new QRCode('canvas', {
//   text: "123456",
//   width: 150,
//   height: 150,
//   colorDark: "#000000",
//   colorLight: "#ffffff",
//   // correctLevel: QRCode.CorrectLevel.L,
// });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // var pages = getCurrentPages()
    // console.log(pages)

    var pages = getCurrentPages()    //获取加载的页面

var currentPage = pages[pages.length-1]    //获取当前页面的对象

var url = currentPage.route    //当前页面url

var options = currentPage.options    //如果要获取url中所带的参数可以查看options
console.log(options);
  },  

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  
  },
  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  
  // }
})