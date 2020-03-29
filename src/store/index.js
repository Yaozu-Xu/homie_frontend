import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const state = {
	login: false,
	selfPage: false,
	icon: '',
	createTime: '',
	id: null,
	power: 0,
	username: null,
} 

export default new Vuex.Store({
	state,
	mutations,
	getters
})