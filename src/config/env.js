/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */

let baseUrl = '/frontend/' 
let imgBaseUrl = ''
let refreshTokenExprie = 7  // 1天 改成小时 1 / 24  

if (process.env.NODE_ENV == 'development') {
    imgBaseUrl = '/img/'

}else if(process.env.NODE_ENV == 'production'){
	baseUrl = '//elm.cangdu.org'
    imgBaseUrl = '//elm.cangdu.org/img/'
}

export {
	baseUrl,
	imgBaseUrl,
	refreshTokenExprie,
}