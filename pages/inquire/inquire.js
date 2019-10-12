// pages/inquire/inquire.js
const interfaces = require('../../utils/urlconfig');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    wx.request({
      url: interfaces.inquire,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        userId: Number(app.globalData.userId),
        // userNumber: this.data.val,
      },
      success: res => {
        console.log(res.data)

        this.setData({
          arr:res.data
        })
       

        // 请求成功跳转
        // app.globalData.wallet = res.data;
        // console.log(app.globalData.wallet)
        // this.setData({
        //   key: true
        // })


      }
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