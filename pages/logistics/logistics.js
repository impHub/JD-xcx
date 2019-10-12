// pages/logistics/logistics.js
const interfaces = require('../../utils/urlconfig');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logArr:[],
    logObj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    wx.request({
      url:interfaces.logIstics,
      data:{orderId:options.id},
      success:res=>{
        console.log(res.data)
        if(res.data.ShipperCode){
         
          switch (res.data.ShipperCode) {
            case 'YD':
              res.data.ShipperCode = "韵达";
                break;
            case 'HTKY':
              res.data.ShipperCode = "百世";
                 break;
            case 'ZTO':
              res.data.ShipperCode = "中通";
                 break;
            case 'STO':
              res.data.ShipperCode = "申通";
                 break;
            case 'YTO':
              res.data.ShipperCode = "圆通";
                 break;
            case 'SURE':
              res.data.ShipperCode = "速尔";
        } 
          // 
  
  
          console.log(res.data); 
          let Traces = res.data.Traces;
          Traces.forEach(res=>{
            console.log(res);
            res.text = res.AcceptStation;
            res.desc = res.AcceptTime;
          })
          Traces.reverse();
          this.setData({
            logArr:Traces,
            logObj:res.data
          })
        }else{
          this.setData({
            logObj:0
          })
          console.log('空对象')
        }

        // 
      
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