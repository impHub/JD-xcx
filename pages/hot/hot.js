// pages/active/hot/hot.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:19,
    danger:'default',
    arr:[19,29,39,49,59]
  
  },
  btn(e){
            //条件返回true false,?true1:false:0;
    var c = 5>3?1:0;
    console.log(c)
    console.log(e)
    console.log(e.target.dataset.item)
    
    this.data.danger = 'warning';
    this.setData({
      id:e.target.dataset.item
      // danger:'warning'
    })
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