//配置请求接口文件
// const domain = 'https://floating-mountain-54305.herokuapp.com';
// const domain = 'http://192.168.31.220:8000/mall/wx';
const domain = 'https://www.lixikeji.cn/mall';
// 首页 /login 192.168.31.220:8000/mall/wx/homepage
const interfaces = {
    rCode:domain + '/voucher/update',//兑换接口

    card:domain + '/user/findUser',//积分信息

    login:domain + '/wx/login',
    // homepage : domain + "/api/profiles/homepage",
    homepage : domain + "/wx/homepage",//主页

    homeMore : domain + '/wx/product/list/page',//更多

    homeSearch:domain + '/wx/product/search',//搜索功能

    // productions : domain + "/api/profiles/productions",
    productions : domain + "/wx/classify/list",//分类
    
    // productionsList:domain + "/api/profiles/productionsList",
    productionsList:domain + "/wx/product/getbyclassify",//商品详情列表

    //
    detailImg:domain + '/wx/product/detail/img',

    // productionDetail:domain + "/api/profiles/productionDetail"
    productionDetail:domain + "/wx/product/detail",//单个商品

    order:domain + "/wx/order",//价格及其优惠信息

    orderPay:domain + '/wx/order/pay',//支付接口

    payOrder:domain + '/wx/order/list/pay', //已支付商品信息

    paySuccess:domain + '/wx/order/update/paysuccess',//提示后台成功支付

    
    
}

//暴露接口
module.exports = interfaces;