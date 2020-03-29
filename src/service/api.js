// request api
import axios from 'axios'
import './http'
import "@/common/css/sweetalert.css"
import "@/common/js/sweetalert.min.js"

const Apis = {}

const settingApi = {}

const analysisApi = {}

Apis.sendLogin = (params) =>
	axios.post('/server/api/user/login', params)

Apis.getUser = (user) =>
	axios.get(`/server/api/user/u/${user}`)

Apis.getOnesCategory = (uid) =>
	axios.get(`/server/api/category/get/${uid}`)

Apis.checkAuth = (uid) =>
	axios.get(`/server/api/user/auth/${uid}`)

Apis.register = (data) =>
	axios.post('/server/api/user/reg', data)

Apis.createCategory = (data) =>
	axios.post('/server/api/category/create', data)

// Publish
Apis.postArticle = (data) =>
	axios.post('/server/api/publish/create', data)

Apis.getOnesAriticles = (uid) =>
	axios.get(`/server/api/publish/get/${uid}`)

Apis.getArticleByAid = (aid) =>
	axios.get(`/server/api/publish/a/${aid}`)

Apis.putArticle = (doc) =>
	axios.put(`/server/api/publish/update`, doc)

Apis.delArticle = (aid) =>
	axios.delete(`/server/api/publish/del/${aid}`)

// upload img
Apis.uploadImg = (data) =>
	axios.post(`/server/api/publish/fileload`, data, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	})

settingApi.reset = (data) =>
	axios.put('/server/api/user/reset', data)

settingApi.changeIcon = (data) =>
	axios.post('/server/api/user/icon', data, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	})

analysisApi.getWritingStamp = (uid) =>
	axios.get(`/server/api/publish/analysis/${uid}`)

analysisApi.genCalendar = (uid) =>
	axios.get(`/server/api/publish/calendar/${uid}`)

export {
	settingApi,
	analysisApi
}

export default Apis