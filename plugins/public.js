// #ifdef H5
import config from '@/plugins/config.js';
const {
    appid
} = config;
// #endif
export default {
    // toast 提示
    toast(text, duration) {
        uni.showToast({
            title: text,
            icon: 'none',
            position: 'bottom',
            duration: duration || 2000,
        });
    },
    // 加载动画
    loading(text) {
        uni.showLoading({
            title: text || '加载中',
            mask: true
        });
    },
    // 模态框
    modal(data) {
        return new Promise((resolve, reject) => { // resolve(res) 抛出成功  reject(err)抛出失败  【抛出时可传递参数】
            uni.showModal({
                ...data,
                success: function (res) {
                    if (res.confirm) {
                        resolve();
                    }
                }
            })
        });
    },
    // 支付
    payment(data) {
        let that = this;
        // #ifdef MP-WEIXIN
        return new Promise((resolve, reject) => { // resolve(res) 抛出成功  reject(err)抛出失败  【抛出时可传递参数】
            wx.requestPayment({
                timeStamp: data.timeStamp,
                nonceStr: data.nonceStr,
                package: data.package,
                signType: data.signType,
                paySign: data.paySign,
                success(res) {
                    resolve(res)
                },
                fail(err) { 
                    reject(err)
                }
            })
        });
        // #endif

        // #ifdef H5
        return new Promise((resolve, reject) => { // resolve(res) 抛出成功  reject(err)抛出失败  【抛出时可传递参数】 
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    appId: appid, //公众号名称，由商户传入
                    timeStamp: data.timeStamp, //时间戳，自1970年以来的秒数
                    nonceStr: data.nonceStr, //随机串
                    package: data.package,
                    signType: data.signType, //微信签名方式：
                    paySign: data.paySign, //微信签名
                },
                function (data) {
                    if (data.err_msg == 'get_brand_wcpay_request:ok') {
                        // 使用以上方式判断前端返回,微信团队郑重提示：
                        //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                        resolve(data) 
                    } else {
                        reject(data) 
                    }
                }
            );
        });
        // #endif
    },
    login_openid() {
        return new Promise((resolve, reject) => { // resolve(res) 抛出成功  reject(err)抛出失败  【抛出时可传递参数】
            wx.login({
                success(res) {
                    if (res.code) {
                        resolve(res.code)
                    } else {
                        reject('登录失败！' + res.errMsg)
                    }
                }
            })
        });
    },
    // 打开文件
    openFile(url) {
        let that = this;
        that.loading('正在下载文件')
        uni.downloadFile({
            url: url, //仅为示例，并非真实的资源
            success: (res) => {
                console.log(res)
                if (res.statusCode === 200) {
                    setTimeout(() => {
                        uni.openDocument({
                            filePath: res.tempFilePath,
                            success: (data) => {
                                that.toast('打开成功');
                                uni.hideLoading();
                            },
                            fial: (err) => {
                                that.toast('打开文件失败');
                                uni.hideLoading();
                            }
                        });
                    }, 500)
                } else {
                    that.toast('文件缓存失败');
                    uni.hideLoading();
                }
            },
            fial: (err) => {
                that.toast('文件缓存失败');
                uni.hideLoading();
            }
        });
    }
}