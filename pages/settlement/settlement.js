// pages/settlement/settlement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartArray:[],
    totalMoney:0
  },

  Calculation(cartArray){
    // console.log(cartArray,'计算函数')
    // 总价
    let totalPrice = 0;
    //数量
    let i = 0; 
      // 遍历数组
      cartArray.forEach(res=>{
          i++;
          // 总价计算
        let price = parseInt(res.price)*res.total;
        totalPrice += price;
      })
  // 得到数据 计算 总价 个数 是否全选 
  // 更新计算结果  
         this.setData({
          cartArray :cartArray,
          totalMoney:totalPrice,

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
      wx.getStorage({
        key:'cartInfo',
        success:res=>{
          const arr = [];
          const add = [];
          const cartArray = res.data;
          // console.log(cartArray)
          cartArray.forEach(res=>{
            if(res.select){
              arr.push(res);
            }else{
              add.push(res);
            }
          })
         this.Calculation(arr)
          wx.setStorage({
            key:'cartInfo',
            data:add
          })
        }
      })
     
     
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