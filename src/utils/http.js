import Vue from 'vue';
import Qs from 'qs';

let options = {

    // `headers` 是即将被发送的自定义请求头
    headers: {},
    // paramsSerializer: function (params) {
    //     return Qs.stringify(params, { arrayFormat: 'brackets' })
    // },
    timeout: 5000,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: false, // default

}

function GET(method = 'get', url, data = {}, option = options) {
    let config = {
        method: method,
        url: url,
        params: data,
    };
    config = Object.assign({}, config, options, option);
    return Result(config);
}

function POST(method = 'post', url, data = {}, option = options) {
    let config = {
        method: method,
        url: url,
        params: data,
    };
    config = Object.assign({}, config, options, option);
    return Result(config);
}

const Result = async function (config) {
    AXIOS()
    return new Promise(function (resolve, reject) {
        Vue.axios(config).then(res => {
            console.log(res)
            resolve(res)
        }).catch((error) => {
            reject(error);
        });
    })
}

export function $ajax(method = 'get', url, data, option) {
    let method_type = method.toUpperCase();
    return eval(`${method_type}`)(method, url, data, option);
    return new Promise((resolve, reject) => {
        eval(`${method_type}`)(method, url, data, option).then(res => resolve(res)).catch(error => reject(error))
    })
}

function AXIOS() {
    Vue.axios.interceptors.request.use(config => {
        config.metadata = { startTime: new Date() }
        return config;
    }, (error => { return Promise.reject(error) }))
    Vue.axios.interceptors.response.use(response=>{
        response.config.metadata.endTime = new Date();
        response.duration = response.config.metadata.endTime - response.config.metadata.startTime;
        return response;
    }, error=>{
        error.config.metadata.endTime = new Date();
        error.duration = error.config.metadata.endTime - error.config.metadata.startTime;
        return Promise.reject(error);
    });
}