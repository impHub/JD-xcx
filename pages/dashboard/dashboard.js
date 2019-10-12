// pages/dashboard/dashboard.js
const interfaces = require('../../utils/urlconfig');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: interfaces.cardMe,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        userId: Number(app.globalData.userId),
        // userNumber: this.data.val,
      },
      success: res => {
        console.log(res.data.commission)
        let a = res.data.commission * 100;
        let c = res.data.percentage * 100;
        console.log(a)
        res.data.commission = a;
        res.data.percentage = c;
        console.log(res.data);
        this.setData({
          obj : res.data
        })


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