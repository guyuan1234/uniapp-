// 引入公共请求地址
import config from './config.js';
let {
    request_url,
    request_timeout
} = config;

// 引入公共方法
import publicFUn from './public.js';
let {
    toast,
    loading
} = publicFUn;

// 请求拦截器封装 
let request = (data, resolve, reject) => {
    let _url, // 请求地址
        _method, // 请求方式
        _data; // 请求参数 

    // 请求地址  如果请求地址有https 或者有 http 则不添加公共请求头
    if (data && data.url) {
        if (data.url.indexOf('http://') < 0 && data.url.indexOf('https://') < 0) {
            _url = request_url + data.url;
        } else {
            _url = data.url;
        }
    } else { // 没有请求地址
        console.error('请求地址不能为空')
        return;
    }

    // 请求方式   ==  默认等于post 请求
    if (data.method) {
        _method = data.method;
    } else {
        _method = 'post'
    }

    // 请求参数
    if (data.data) {
        _data = data.data;
    }
    const _token = uni.getStorageSync('token')
    uni.request({
        url: _url, //仅为示例，并非真实接口地址。
        data: _data,
        method: _method,
        timeout: request_timeout * 1000, // 请求超时时间
        header: {
            'content-type': 'application/json',
            'Authorization': _token
        },
        success: (res) => { 
            if (res.data.code == 102 || res.data.code == 103) { 
                // 重新请求更新token  ---- 无感刷新
                if (res.data.code == 102) {
                    uni.setStorageSync('token', res.data.data)
                }
                request(data, resolve, reject);
            } else if ( res.data.code === 101 || res.data.code === 104 || res.data.code === 105) { 
                // 需要重新登录
                toast(res.data.message); 
                uni.navigateTo({
                    url: '/pages/views/login/login'
                })

            } else { 
                // 返回
                if (res.data.code !== 0) {
                    toast(res.data.message)
                }
                resolve(res.data)
            }

        },
        fail: (err) => {
            reject(err)
        }
    });
}

// 此处再次封装一遍  解决当需要更新 token 时做无感刷新
let axios = (data) => {
    return new Promise((resolve, reject) => { // resolve(res) 抛出成功  reject(err)抛出失败  【抛出时可传递参数】
        // 开启加载动画
        if (data.loading) {
            loading();
        }
        request(data, resolve, reject)
    });
};

export default axios;