import Vue from 'vue';
import Qs from 'qs';
import axios from 'axios';
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
        data: data,
    };
    config = Object.assign({}, config, options, option);
    return Result(config);
}

function PUT(method = 'post', url, data = {}, option = options) {
    let config = {
        method: method,
        url: url,
        data: data,
    };
    config = Object.assign({}, config, options, option);
    return Result(config);
}
function PATCH(method = 'post', url, data = {}, option = options) {
    let config = {
        method: method,
        url: url,
        data: data,
    };
    config = Object.assign({}, config, options, option);
    return Result(config);
}
function DELETE(method = 'post', url, data = {}, option = options) {
    let config = {
        method: method,
        url: url,
        data: data,
    };
    config = Object.assign({}, config, options, option);
    return Result(config);
}

function COPY(method = 'post', url, data = {}, option = options) {
    let config = {
        method: method,
        url: url,
        data: data,
    };
    config = Object.assign({}, config, options, option);
    return Result(config);
}


const Result = async function (config) {
    await AXIOS();
    return new Promise(function (resolve, reject) {
        axios(config).then(res => {
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

async function AXIOS() {
    axios.interceptors.request.use(config => {
        config.startTime = new Date();
        return config;
    }, (error => {
        error.config.startTime = new Date();
        return Promise.resolve(error)
    }))
    axios.interceptors.response.use(response => {
        response.config.endTime = new Date();
        response.duration = response.config.endTime - response.config.startTime;
        return response;
    }, (error => {
        console.log(error.response.status)
        error.response.config.startTime = new Date();
        error.response.config.endTime = new Date();
        error.response.duration = error.response.config.endTime - error.response.config.startTime;

        if (error.response && error.response.status == 404) {
            return Promise.resolve(error.response)
        }
        if (error.response && error.response.status == 401) {
            return Promise.resolve(error.response)
        }
        return Promise.resolve(error);
    }));
}


