// pages/paid/paid.js
const app = getApp();
const interfaces = require('../../utils/urlconfig');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payArr:[],
    active:2,
    // 
    steps: [
      {
        text: '已付款',
        desc: ''
      },
      {
        text: '已发货',
        desc: ''
      },
      {
        text: '已收货',
        desc: ''
      },
      {
        text: '已完成',
        desc: ''
      }
    ]
    // 

  },
  add(e){
    console.log(e.currentTarget.dataset.item);
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: "/pages/logistics/logistics?id=" + item.orderId
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: interfaces.payOrder,
      data:{userId:app.globalData.userId},
      success:res=>{
        console.log(res.data.status,'zhifu')
        this.setData({
          payArr:res.data
        })
        console.log(this.data.payArr,'zhif')
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
  // onShareAppMessage: function () {

  // }
})