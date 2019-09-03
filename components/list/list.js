// const interfaces = require('../../utils/urlconfig');
const interfaces = require('../../utils/urlconfig')
// pages/list/list.js
Component({

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
      url:interfaces.productionsList,
      data:{classificationId:e},
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

    console.log(this.data.prolist[index].id,'list id')
    wx.navigateTo({
      //   前面时路径        id时传过去的变量 
      url:"/pages/detail/detail?id=" + this.data.prolist[index].id 
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
      this.http(1);
     
  },


})