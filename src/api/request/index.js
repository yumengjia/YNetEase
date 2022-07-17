/* 
对axios进行二次封装
请求拦截器，响应拦截器
*/
import axios from "axios";

//引入仓库
// import store from "@/store";

/* 
1:利用axios对象的方法create，创建一个axios实例
1：request就是axios，只不过稍微配置一下
*/
const requests = axios.create({
    baseURL:'/netease',
    //请求超时时间[5s内如果没有响应，则请求失败]
    timeout:5000,
    // headers:{'Access-Control-Allow-Origin':'*'}
})

//请求拦截器
requests.interceptors.request.use((config) => {
    //config:配置对象，对象里面有一个属性很重要，headers请求头
    //请求头中添加一个字段userTempId[游客的临时身份]
   /*  if(store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token
    }
    let token = localStorage.getItem('TOKEN') */
    //用户的身份标识
 /*    if(token){
        config.headers.token = token
    } */
    

    return config
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    //成功响应的回调
    return res
},(error)=>{
    //失败的回调
    //终结Promise链 
    return Promise.reject(new Error('fail'))
})

function req(url,data={},type='GET'){
    // console.log(url,data,type);
    return new Promise((resolve,reject) => {
        let promise
        if(type==='GET'){
            promise = requests.get(url,{params:data})
        }else if(type==='POST'){
            promise = requests.post(url,data)
        }else{
            promise = requests.delete(url,data)
        }
        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            console.log('请求出错了：'+error.message)
        })
    })
}



export default req