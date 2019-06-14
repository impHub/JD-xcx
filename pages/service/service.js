// pages/service/service.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  // 电话菜单弹出
  openConfirm: function () {
    wx.makePhoneCall({
      phoneNumber: '027-88859680',
    });
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
  
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})