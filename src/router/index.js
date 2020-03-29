import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App'
import store from '@/store/index'
import {setStore, removeStore } from '@/config/utils'
import Cookies from 'js-cookie'
import Apis from '@/service/api'

const login = r => require.ensure([], () => r(require('@/views/Login')), 'login')
const register = r => require.ensure([], () => r(require('@/views/Register')), 'register')
const index = r => require.ensure([], () => r(require('@/views/Index')), 'index')
const publish = r => require.ensure([], ()=>r(require('@/views/Publish')), 'publish')
const about = r => require.ensure([], () => r(require('@/views/About')), 'about')
const edit = r => require.ensure([], () => r(require('@/views/Editor')), 'edit')
const admin = r => require.ensure([], () => r(require('@/views/Admin')), 'admin')
const error = r => require.ensure([], () => r(require('@/views/Error')), 'error')


Vue.use(VueRouter)

const routes = [{

	path: '/',
    component: App,
    children: [
		{
			path: '',
			name: 'about',
			component: about
		},
	    {
	    	path: '/login',
	    	name: 'login',
	    	component: login
	    },
	    {
	    	path: '/join',
	    	name: 'register',
	    	component: register
	    },
	    {
			path: '/index/:user',
			name: 'index',
	    	component: index
		},
		{
			path: '/publish',
			name: 'publish',
			component: publish,
			meta: {requireAuth: true}
		},
		{
			path: '/edit/:aid',
			name: 'edit',
			component: edit,
			meta: { requireAuth: true }
		},
		{
			path: '/admin',
			name: 'admin',
			component: admin,
			meta: { requireAuth: true }
		},
		{
			path: '/error',
			name: 'error',
			component: error
		},
		{
			path: '*',
			redirect: '/error'
		}
    ]
}
];

const router = new VueRouter({
　mode: 'history',
  base: '/frontend/',
  routes
})

router.beforeEach(async (to, from, next) => {
	// 路由需要登陆验证
	if(to.meta.requireAuth){
		// 未登录禁止访问
		if (!Cookies.get('refresh_token') || !Cookies.get('uid')) {
			removeStore('access_token')
			next({ path: '/login' })
			return 
		}
		// 用户登录
		const uid = Cookies.get('uid')
		try {
			const res = await Apis.checkAuth(uid)
			// 验证不通过
			if (res.statusCode !== 200) {
				next({
					path: '/login',
				})
			} else {
				// 验证通过
				const user = res.user
				store.state.username = user.username
				store.state.id = user._id
				store.state.power = user.power
				store.state.createTime = user.createTime
				store.state.login = true
				if(user.icon){
				   store.state.icon = user.icon
				}
				if(res.expire){
					// token过期
					setStore('access_token', res.access_token)
				}
				if (Cookies.get('uid') === res._id){
					store.state.selfPage = true
				}
				next()
			}
		} catch (error) {
			console.log(error)
		}
	}else{ //路由不需要用户验证
		// 路由需要user参数
		if (to.params.hasOwnProperty('user')){
			const user = to.params.user
			const userInfo = await Apis.getUser(user)
			// 用户不存在
			if(!userInfo){
				next({
					path: '/',
				})
				return
			}
			store.state.username = userInfo.username
			store.state.id = userInfo._id
			store.state.power = userInfo.power
			store.state.createTime = userInfo.createTime
			if(user.icon){
				store.state.icon = userInfo.icon
			 }
			const cookieId = Cookies.get('uid')
			if(cookieId){
				store.state.login = true
			}
			if (Cookies.get('uid') === userInfo._id){
				store.state.selfPage = true
			}
		}
		next()
	}
})

export default router
