//  配置文件 

// 开发环境或者默认配置
let config = {
    request_url: 'http://192.168.1.51:8001', // 请求地址公共url 
    reg_open: true, // 是否开启正则验证  
    request_timeout: 10, // 请求超时时间  单位s
    skeleton_time: 100, // 骨架屏等待时间 ms 用于mixin 内的全局定时器
}

// 非开发环境下配置
if (process.env.NODE_ENV != 'development') {
    config.reg_open = true; // 开启正则验证
    config.request_url = 'http://crowd.weimeigu.com.cn/api'; // 请求地址
    config.skeleton_time = 0; // 骨架屏等待时间
}

export default config