// pages/category/index.js
// 引入接口配置文件urlconfig
// const interfaces = require('../../utils/urlconfig.js');
const interfaces = require('../../utils/urlconfig');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navLeftItems: [],
    navRightItems: [],
    // 进来默认显示ID为1的
    curIndex: 1,
     //当有数据时显示false
     noData:false,
     prolist:[],//分类数据
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
  http(e,c){
    console.log(e,c)
    if(e){
      // wx.showNavigationBarLoading();
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
          // wx.hideNavigationBarLoading();
          // 加载完关闭三个点
          // wx.stopPullDownRefresh();
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

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   const self = this
  //   wx.showLoading({
  //     title: '加载中...',
  //   })
  //   wx.request({
  //     url: interfaces.productions,
  //     header: {
  //       'content-type': 'application/json' // 默认值，返回的数据设置为json数组格式
  //     },
  //     success(res) {
  //       self.setData({
  //         navLeftItems: res.data.navLeftItems,
  //         navRightItems: res.data.navRightItems
  //       })
  //       // 
  //       wx.hideLoading()
  //     }
  //   })
  //   // 
    
  // },
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
        // 默认请求id为1的数据
        this.http(this.data.curIndex);
        console.log(res.data)
        this.setData({
          // commodity :res.data
          navLeftItems:res.data
        })
      console.log(this.data.navLeftItems);
      
        // 加载完成关闭动画
        wx.hideLoading();
      }
    })
  
},
  /*
  * 记录左侧点击的按钮下标 
  */
  switchRightTab(e) {
    let index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: ++index
    })
    this.http(index)
  },
  /**
   * 点击进入列表页
   * 列表页参数 title
  */
  showListView(e) {
    let txt = e.currentTarget.dataset.txt
    wx.navigateTo({
      url: '/pages/list/index?title=' + txt
    })
  }
})