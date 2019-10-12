// pages/rebate/rebate.js
const interfaces = require('../../utils/urlconfig');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[],
    val:'',
    grade:0,
  },
  btn(e){
    console.log(e.currentTarget.dataset.item.productId);
    let i = e.currentTarget.dataset.item.productId;
    wx.navigateTo({
      //   前面时路径        id时传过去的变量 
      url: "/pages/detail/detail?id=" + i
    })
  },

  onChange(e){
    console.log(e.detail)
    this.data.val = e.detail;
  },

  onSearch(e){
    console.log(e.detail.value);
    let val = this.data.val;
    if(val){
      wx.navigateTo({
        //   前面时路径        id时传过去的变量 
        url: "/pages/lists/lists?text=" + val
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userscale,'代理等级');
    wx.request({
      url: interfaces.allList,

      success: res => {
      console.log(res.data);
      this.setData({
        arr:res.data,
        grade:Number(app.globalData.userscale)
      })
      console.log(this.data.grade,'dengji');
      

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