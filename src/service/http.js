// encapsolute axios
import axios from 'axios'
import {getStore} from '@/config/utils'
import '@/common/css/sweetalert.css'  // 弹窗组件
import '@/common/js/sweetalert.min.js'


// axios.defaults.timeout = 10000;
// 2个token 一个refresh_token， 一个验证token
// refresh_token存在cookie里，过期则直接logout
// refresh_token 时间 > access_token
axios.interceptors.request.use(
     config => {
        // refresh_token没过期，则每次刷新access_token
        let token = getStore('access_token')
        if (token){
            config.headers.access_token = token
        }
        return config
    },
)

// 返回拦截器 一般做错误处理
axios.interceptors.response.use(    
    (response) => {
        const data = response.data
        return data
    }
)