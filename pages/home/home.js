//引入interefaces   
const interfaces = require('../../utils/urlconfig');
// console.log(interfaces)
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swipers:[],
    logos:[],
    quicks:[],
    pageRow:[],

    indicatordots:true,
        vertical:false,
        autoplay:true,
        duration:500,
        interval:3000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1 . 创建数据加载loading动画
    wx.showLoading({
      title:'加载中....'
    })
    //微信提供的请求
    wx.request({
        url: interfaces.homepage,
        header:{
          "content-type":"application/json"
          //默认值，返回的数据设置为json数据格式
        },
        // success(res){
        //   console.log(res,'请求成功');
        //   console.log(this)
        // }

        //需要用箭头函数不然找不到this
        success : res=>{
          
          // console.log(res.data.quicks,'请求成');
          // console.log(this,'hah');
          //获取数据存储到本地
          this.setData({
            swipers:res.data.swipers,
            logos:res.data.logos,
            quicks:res.data.quicks,
            pageRow:res.data.pageRow
          })
          //2. 加载完成停止loading
          wx.hideLoading()
        }
    })
  },
  add(){
    wx.switchTab({
      url:"/pages/category/category"
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