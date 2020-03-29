/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * 
 */
const baseUrl = '/frontend/' 
const refreshTokenExprie = 7  // 1天 改成小时 1 / 24  
const algoliaKey = 'CU5TZMQ5DL'
const algoliaPwd = '0db73a0bb57375673c51e5f323a7c8ab'

export {
	baseUrl,
	refreshTokenExprie,
	algoliaKey,
	algoliaPwd
}