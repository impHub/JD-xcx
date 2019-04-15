  //获取到全局app.js里的实例 app({})
  const app = getApp();
  // console.log(getApp());

// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:{},
      hasUserInfo:false,
      // 判断这个api能不能使用，返回布尔值
      canIUse:wx.canIUse('button.open-type.getUserInfo')
  },
  // 实现获取用户信息方法
  getUserInfo(e){
    // console.log(e.detail.userInfo);
    this.setData({
      // 把获取到的信息赋值
      userInfo:e.detail.userInfo,
      hasUserInfo:true
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    //在进入是监听判断
    if(app.globalData.userInfo){
      // console.log(app.globalData)
      this.setData({
        // 把获取到的信息赋值
        userInfo:app.globalData.userInfo,
        hasUserInfo:true
      })
    }else if(this.data.canIUse){
      //由于getUserIfo是网络请求，可能会在Page.onload后才返回
      //防止这种情况发生，所以此处加入callback回调函数
      app.userInfoReadyCallback = res =>{
        this.setData({
          userInfo:res.userInfo,
          hasUserInfo:true
        })
      }
    }
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