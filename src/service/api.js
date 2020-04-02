// request api
import axios from 'axios'
import './http'
import "@/common/css/sweetalert.css"
import "@/common/js/sweetalert.min.js"

const Apis = {}

const settingApi = {}

const analysisApi = {}

Apis.sendLogin = (params) =>
	axios.post('/api/user/login', params)

Apis.getUser = (user) =>
	axios.get(`/api/user/u/${user}`)

Apis.getOnesCategory = (uid) =>
	axios.get(`/api/category/get/${uid}`)

Apis.checkAuth = (uid) =>
	axios.get(`/api/user/auth/${uid}`)

Apis.register = (data) =>
	axios.post('/api/user/reg', data)

Apis.createCategory = (data) =>
	axios.post('/api/category/create', data)

// Publish
Apis.postArticle = (data) =>
	axios.post('/api/publish/create', data)

Apis.getOnesAriticles = (uid) =>
	axios.get(`/api/publish/get/${uid}`)

Apis.getArticleByAid = (aid) =>
	axios.get(`/api/publish/a/${aid}`)

Apis.putArticle = (doc) =>
	axios.put(`/api/publish/update`, doc)

Apis.delArticle = (aid) =>
	axios.delete(`/api/publish/del/${aid}`)

// upload img
Apis.uploadImg = (data) =>
	axios.post(`/api/publish/fileload`, data, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	})

settingApi.reset = (data) =>
	axios.put('/api/user/reset', data)

settingApi.changeIcon = (data) =>
	axios.post('/api/user/icon', data, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	})

analysisApi.getWritingStamp = (uid) =>
	axios.get(`/api/publish/analysis/${uid}`)

analysisApi.genCalendar = (uid) =>
	axios.get(`/api/publish/calendar/${uid}`)

export {
	settingApi,
	analysisApi
}

export default Apis