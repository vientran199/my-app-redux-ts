import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosClient = axios.create({
    baseURL:'http://js-post-api.herukoapp.com/api',
    headers:{
        'Content-Type':'application/json'
    }
})

axiosClient.interceptors.request.use((config:AxiosRequestConfig)=>{
    return config
}, (e)=>{
    return Promise.reject(e)
})
axiosClient.interceptors.response.use((response:AxiosResponse)=>{
    return response.data
}, (e)=>{
    return Promise.reject(e)
})

export default axiosClient