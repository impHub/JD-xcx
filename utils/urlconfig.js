//配置请求接口文件
// const domain = 'https://floating-mountain-54305.herokuapp.com';
// const domain = 'http://192.168.31.220:8000/mall/wx';
const domain = 'https://www.lixikeji.cn/mall/wx';
// 首页 /login 192.168.31.220:8000/mall/wx/homepage
const interfaces = {
    login:domain + '/login',
    // homepage : domain + "/api/profiles/homepage",
    homepage : domain + "/homepage",//主页

    // productions : domain + "/api/profiles/productions",
    productions : domain + "/classify/list",//分类
    
    // productionsList:domain + "/api/profiles/productionsList",
    productionsList:domain + "/product/getbyclassify",//商品详情列表

    //
    detailImg:domain + '/product/detail/img',

    // productionDetail:domain + "/api/profiles/productionDetail"
    productionDetail:domain + "/product/detail",//单个商品

    order:domain + "/order",//价格及其优惠信息

    orderPay:domain + '/order/pay',//支付接口

    payOrder:domain + '/order/list/pay' //已支付商品信息
    
}

//暴露接口
module.exports = interfaces;