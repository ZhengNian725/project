import axios from 'axios'
import {Toast} from 'antd-mobile'
//在请求发出之前进行一些操作
axios.interceptors.request.use(function (config) {
    Toast.loading('加载中',0)
    return config
})
//响应拦截器 在这里对返回的数据进行处理
axios.interceptors.response.use(function (config) {
    Toast.hide()
    return config
})
