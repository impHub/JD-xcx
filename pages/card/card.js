// pages/card/card.js
const app = getApp();
const interfaces = require('../../utils/urlconfig');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val:'',
    num:0,
    st:99
  },
  zf(){
    console.log(this.data.st);
  //  var n =  
  // var n =  String(this.data.st);//不改变原变量需要变量接收
  this.data.st.toString()
    console.log(this.data.st);
  },
  // 监听用户输入的内容
  onChange(e,c,v){
      console.log(e,c,v);
    // console.log(e.detail)
    this.data.val = e.detail;
    
  },
  // 点击兑换
  btn(){
    // this.setData({
    //   val:''
    // })
    // clearable();
    let val = this.data.val;
    console.log(val);
    if(val.length == 12){
      wx.request({
        url:interfaces.rCode,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          userId: app.globalData.userId,
          voucherCdkey:this.data.val,
        },
        success:res=>{
          if(res.data.price == 0){
            wx.showToast({
              title:'兑换码已失效',
              duration:2000,
              icon:"none"
            })
            // console.log('兑换码已失效')
          }else{
            console.log(this.data.num,res.data,'99')
            // let n = this.data.num + Number(res.data.price); 
            
            // console.log(n);
            this.setData({
              num : res.data.price,
              val:''
            })
            // 改变全局变量
            app.globalData.card = res.data.price;
            // Toast.success('已成功兑换');
            wx.showToast({
              title:'已成功兑换',
              duration:2000,
            })
          }
        
         
        }
      })

    }else{
      wx.showToast({
        title:'请输入12位兑换码',
        duration:2000,
        icon:"none"
      })
      // console.log('请输入6位兑换码')
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取积分
    console.log(app.globalData.card)
    this.setData({
      num :app.globalData.card
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