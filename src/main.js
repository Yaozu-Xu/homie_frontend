import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// summernote依赖
import 'bootstrap/js/src/modal'
import 'bootstrap/js/src/tooltip'
import 'bootstrap/js/src/dropdown'
import 'summernote'
import 'summernote/dist/lang/summernote-zh-CN'
import 'summernote/dist/summernote.css'
import 'font-awesome/css/font-awesome.min.css' 
import vHotKey from 'v-hotkey'
import zoomValidate from '@/common/plugins/zoomValidate/index'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(zoomValidate)
Vue.use(vHotKey)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')