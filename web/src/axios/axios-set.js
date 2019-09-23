import 'babel-polyfill'
import axios from 'axios'
import {baseUrl} from './base-url'
// import {message} from 'antd'
axios.defaults.baseURL = baseUrl
//设置全局允许跨域
axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {
    return config
})
axios.interceptors.response.use(response => {
    const code = response.data.code
    if (code === 601) {
        // 未登录
      window.location.href = '/web/index.html#/login'
      // message.error('请登录！')
      return
    }
    if (code !== 200 && code !== 0) {
        // return
    }
    return response
})
// 上传接口的配置
export const upLoadUrl = baseUrl
