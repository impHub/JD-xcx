//配置请求接口文件
const domain = 'https://floating-mountain-54305.herokuapp.com';

const interfaces = {
    homepage : domain + "/api/profiles/homepage",
    productions : domain + "/api/profiles/productions",
    productionsList:domain + "/api/profiles/productionsList",
    productionDetail:domain + "/api/profiles/productionDetail"
}

//暴露接口
module.exports = interfaces;