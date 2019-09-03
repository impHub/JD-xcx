//引入interefaces   
const interfaces = require('../../utils/urlconfig');
// console.log(interfaces)
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key:true,//上拉加载key
    total: 0,//总页数
    page: 1,//默认第一页
    noData: false,//上拉加载
    more: [],//更多商品
    path: '',
    swipers: [],
    logos: [
      { image: "/image/tls.png", title: "分类" },
      { image: "/image/xc.png", title: "辣味干货" },
      { image: "/image/xg.png", title: "地方美食" },
      { image: "/image/dg.png", title: "特色Vip" },
    ],
    quicks: [],
    pageRow: [],

    indicatordots: true,
    vertical: false,
    autoplay: true,
    duration: 500,
    interval: 4000
  },
  //搜索
  search(e){
    console.log(e.detail.value);
    let val = e.detail.value;
    if(val){
      wx.navigateTo({
        //   前面时路径        id时传过去的变量 
        url: "/pages/lists/lists?text=" + val
      })
    }
  

    // wx.request({
    //   url:interfaces.homeSearch,
    //   data:{keyWords:'油面'},
    //   success:res => {
    //     console.log(res.data);
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1 . 创建数据加载loading动画
    wx.showLoading({
      title: '加载中....',
      mask: true
    })
    //微信提供的请求
    wx.request({
      url: interfaces.homepage,
      // url:'http://192.168.31.220:8000/mall/wx/homepage',
      header: {
        "content-type": "application/json"
        //默认值，返回的数据设置为json数据格式
      },
      //需要用箭头函数不然找不到this
      success: res => {
        console.log(res.data)
        //获取数据存储到本地
        this.setData({
          swipers: res.data.swipers,//
          // logos:res.data.logos,
          quicks: res.data.news,//
          pageRow: res.data.discounts//
        })
        //2. 加载完成停止loading
        wx.hideLoading()
      }
    })
    wx.request({
      url: interfaces.homeMore,
      data: { page: this.data.page },
      success: res => {
        this.setData({
          more: res.data
        })
        this.data.total = res.data[0].pageTotal;
        this.data.page++;
        this.data.total--;
        console.log(this.data.total, 'to', this.data.page);

      }
    })

  },

  //点击跳转到detail
  Detail(e) {

    //得到data-text的值，点击后活动物品名称
    let index = e.currentTarget.dataset.index;
    console.log('dianji', index)
    console.log(this.data.quicks, '')

    console.log(this.data.quicks[index].productId, 'list id')
    wx.navigateTo({
      //   前面时路径        id时传过去的变量 
      url: "/pages/detail/detail?id=" + this.data.quicks[index].productId
    })

  },
  //活动专区跳转
  activity(e) {
    //得到data-text的值，点击后活动物品名称
    let index = e.currentTarget.dataset.index;
    console.log('dianji', index)
    console.log(this.data.pageRow, '')

    console.log(this.data.pageRow[index].productId, 'list id')
    wx.navigateTo({
      //   前面时路径        id时传过去的变量 
      url: "/pages/detail/detail?id=" + this.data.pageRow[index].productId
    })
  },
  //更多专区跳转
  more(e) {

    //得到data-text的值，点击后活动物品名称
    let index = e.currentTarget.dataset.index;
    console.log('dianji', index)
    console.log(this.data.quicks, '')

    console.log(this.data.more[index].productId, 'more')
    wx.navigateTo({
      //   前面时路径        id时传过去的变量 
      url: "/pages/detail/detail?id=" + this.data.more[index].productId
    })

  },

  add(e) {
    // wx.request({
    //   url
    // })
    // 跳转

    if (e.currentTarget.dataset.index == 0) {
      wx.switchTab({
        url: "/pages/test/test"
      })
    } else {
      wx.navigateTo({
        //   前面时路径        id时传过去的变量 
        url: "/pages/hot/hot"
      })
    }

  },

  sljz() {
    if (this.data.total && this.data.key) {
      this.data.key = false;
      this.data.total--;
      //停止下拉刷新
      // wx.stopPullDownRefresh();
      //加载时的状态
      // wx.showNavigationBarLoading();

      wx.request({
        url: interfaces.homeMore,
        data: { page: this.data.page },
        success: res => {
          console.log(res.data);
          let arr = this.data.more;

          res.data.forEach(item => {
            arr.push(item)
          })

          this.setData({
            more: arr
          })

          this.data.page++;
          this.data.key = true;
          // console.log(arr,'arr',this.data.page);
          console.log('上拉加载')
          // 加载完成关闭动画
          // wx.hideNavigationBarLoading();
        }
      })
    } else {
      this.setData({
        noData: true
      })
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
    // console.log('上拉刷新')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})