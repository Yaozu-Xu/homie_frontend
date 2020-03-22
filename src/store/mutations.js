import {RECORD_USERINFO} from './mutation-types'
import {setStore, getStore} from '@/config/utils'
import { refreshTokenExprie } from '@/config/env' 
import Cookies from 'js-cookie'

export default {

	[RECORD_USERINFO](state, res){
		const user = res.user
		state.username = user.username
		state.power = user.power
		state.id = user._id
		state.login = true
		if(user.icon){
			state.icon = user.icon
		}
		Cookies.set('refresh_token', res.refresh_token, {expires: refreshTokenExprie})
		Cookies.set('uid', user._id, {expires: refreshTokenExprie})
		setStore('access_token', res.access_token)
	},
}
