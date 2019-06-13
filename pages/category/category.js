const interfaces = require('../../utils/urlconfig');
const app = getApp();
// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
      commodity:[],
      navLeftItems:[],
      navRightItems:[],
      curIndex:0 //index关联 左边的class样式 右边渲染的数组 arr[index]
      
  },
  // 自定义函数
  switchRigthTab(e){
    let index = e.currentTarget.dataset.index;
    // console.log(e);
      this.setData({
        // 通过html里data-index获取到当前index赋值到curIndex
        curIndex:index
      })
  },

  showListView(e){
      //得到data-text的值，点击后活动物品名称
      let text = e.currentTarget.dataset.text;
      // 用微信提供的api进行跳转到新的页面
      wx.navigateTo({
        //   前面时路径        title时传过去的变量
        url:"/pages/list/list?title=" + text
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.showLoading({
        title:'加载中....'
      })
      //请求数据
      wx.request({
        url:interfaces.productions,
        headere:{
          "content-type":"application/json"
        },
        success : res=>{
          let data=  res.data.navRightItems[0];
         
          console.log(data[0].desc)
          // console.log(res.data.navRightItems,'cat')
          this.setData({
            navLeftItems:res.data.navLeftItems,
            navRightItems:res.data.navRightItems,
            commodity:data[0].desc
          })
        console.log(this.data.commodity)
        
          // 加载完成关闭动画
          wx.hideLoading();
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
      // console.log(app.globalData.userInfo)
      // wx.getSetting({
      //   success (res) {
      //     console.log(res,'getset')
      //     let g = res.authSetting['scope.userInfo'];
      //     if(res.authSetting['scope.userInfo']){
      //       wx.getUserInfo({
      //         success: function(res) {
      //           console.log(res.userInfo)
      //         }
      //       })
      //     }
      //   }
      // })
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