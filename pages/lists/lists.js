// const interfaces = require('../../utils/urlconfig');
const interfaces = require('../../utils/urlconfig')
// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prolist:[],
    // 当前请求的页数 一页展示5条数据
    page:1, size:5,
    //当有数据时显示false
    noData:false
    
  },
  
  http(e,c){
    console.log(e,c)
    if(e){
      wx.showNavigationBarLoading();
               // 请求数据
     wx.request({
      url:interfaces.homeSearch,
      data:{keyWords:e},
      success:res=>{
        // console.log(res.data)
          this.setData({
            prolist:res.data
          })
          console.log(this.data.prolist,'商品详情页数据')
          // 加载完成关闭转圈圈
          wx.hideNavigationBarLoading();
          // 加载完关闭三个点
          wx.stopPullDownRefresh();
      // wx.hideLoading();
          this.setData({
            page:1,
            noData:false
          })
      }
  })
    }else{
         // 请求数据
     wx.request({
      url:interfaces.productionsList,
      success:res=>{
        // console.log(res.data)
          this.setData({
            prolist:res.data
          })
          console.log(this.data.prolist,'商品详情页数据')
          // 加载完成关闭动画
      wx.hideLoading();
      }
  })
    }
    wx.hideLoading()
  },
  //点击跳转到detail
  switchProlistDetail(e){
      //得到data-text的值，点击后活动物品名称
      let index = e.currentTarget.dataset.index;
      console.log(this.data.prolist,'')

    console.log(this.data.prolist[index].productId,'list id')
    wx.navigateTo({
      //   前面时路径        id时传过去的变量 
      url:"/pages/detail/detail?id=" + this.data.prolist[index].productId 
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options,'onLoad');
      // 设置头部标题api
      wx.setNavigationBarTitle({
        // 把接受过来的值进行设置
        title: options.text
      })
      wx.showLoading({
        title:'加载中....'
      })
      // this.http(options.id);
      this.http(options.text);
     
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
  // onPullDownRefresh: function () {
  //   let key = true;
  //   this.http(key);
  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {
  //   const prolist = this.data.prolist;
  //   let page = this.data.page;
  //   // 上拉加载
  //   //停止下拉刷新
  //   wx.stopPullDownRefresh();
  //   //加载时的状态
  //   wx.showNavigationBarLoading();
  //   //开始下拉时page从1页变成第二页的数据
  //   this.setData({
  //     page : ++page
  //   })
  //   //上拉加载请求数据
  //   wx.request({
  //     url:interfaces.productionsList + '/' + this.data.page + '/' + this.data.size,
  //     success:res=>{
  //       if(res.data.length == 0){
  //         this.setData({
  //           noData:true
  //         })
  //       }else{
  //         res.data.forEach(item=>{
  //           prolist.push(item)
  //         })
  //         // console.log(res.data)
  //           this.setData({
  //             prolist:prolist
  //           })
  //       }
  //       //把获取到第二页的5条数据遍历push到第一页数据里去 
       
  //         // 加载完成关闭动画
  //         wx.hideNavigationBarLoading();
  //     // wx.hideLoading();
  //     }
  // })


    
  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})