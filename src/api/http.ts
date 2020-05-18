import axios from "axios";
import { Spin, message } from 'antd';

export default {
    async get(url:string, param?: any, isLoding = false) {
        try {
            const res = await axios({
                method: 'get',
                url: url,
                // headers: {
                //     "Token": getCookie("Token") || '',
                //     "Token-Id": getCookie("User-Id") || '',
                // }
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
    async post(url:string, param?: any, isLoding = false) {
        try {
            const res = await axios({
                method: 'post',
                url: url,
                // headers: {
                //     "Token": getCookie("Token") || '',
                //     "Token-Id": getCookie("User-Id") || '',
                // }
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