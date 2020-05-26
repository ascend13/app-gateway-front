import axios from "axios";
import {
    getCookie,
    removeCookie
} from "../util/util";
import { Spin, message } from 'antd';

// 携带cookie
axios.defaults.headers["Token"] = getCookie("Token") ? getCookie("Token") : '';
axios.defaults.headers["Token-Id"] = getCookie("User-Id") ? getCookie("User-Id") : '';
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
    if (getCookie("Token")) {
        config.headers["Token"] = getCookie("Token")
    }
    if (getCookie("User-Id")) {
        config.headers["Token-Id"] = getCookie("User-Id")
    }
    return config;
}, (error) => {
    console.log(error)
});

axios.interceptors.response.use(response => {
    // if(response.data.code === 412) {
    //     window.location.href = '/login';
    // }
    if (response.data.code === 108) {
        removeCookie('Token');
        removeCookie('User-Id');
        // history.push('/login');
        message.error('请重新登录')
    }
    return response;
}, err => {
    if (err.message.includes('timeout')) {
        // message.error('请求超时');
        return Promise.reject(err);
    }
    message.error(err.message);
    return Promise.reject(err);
})

export default {
    async get(url:string, param?: any) {
        try {
            const res = await axios({
                method: 'get',
                url: url,
                headers: {
                    "Token": getCookie("Token") || '',
                    "Token-Id": getCookie("User-Id") || '',
                },
                data: {},
                params: param
            })
            return new Promise((resolve, reject) => {
                if(res.data.code === 0) resolve(res.data)
                else reject(res)
            })
        }
        catch(err) {
            message.error(err)
        }
    },
    async post(url:string, param?: any) {
        try {
            const res = await axios({
                method: 'post',
                url: url,
                headers: {
                    "Token": getCookie("Token") || '',
                    "Token-Id": getCookie("User-Id") || '',
                },
                data: param,
            })
            return new Promise((resolve, reject) => {
                if(res.data.code === 0) resolve(res.data)
                else reject(res)
            })
        }
        catch(err) {
            message.error(err)
        }
    }
}