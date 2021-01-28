import {
    money_num,
} from './function';

// #ifdef H5
import {
    browserType,
} from './function';
// #endif

import {
    mapState
} from "vuex"
import config from '@/plugins/config.js';
export default {
    data() {
        return {
            // #ifdef H5
            wechatBrowser: browserType(), // 判断是否在微信浏览器内
            // #endif 
        }
    },
    // 全局页面滚动监听 暂未用到此功能
    // onPageScroll(e) {
    //     // 判断当前自定义沉浸式导航栏是否存在 
    //     if (this.$refs.gyNavBar) {
    //         // 执行内部滚动回调
    //         this.$refs.gyNavBar.pageScroll && this.$refs.gyNavBar.pageScroll(e)
    //     }
    // },
    onLoad() {

    },
    computed: {
        ...mapState(['webConfig'])
    },
    methods: {
        // 预览图片
        previewImage(data, index) {
            console.log(data, index)
            uni.previewImage({
                current: index === undefined ? data[0] : index,
                urls: data,
            });
        },

        // 联系客服弹框
        contactService() {
            const phonne = this.webConfig.customerService;
            this.common.modal({
                title: '客服电话',
                content: phonne,
                confirmText: '拨打电话'
            }).then(() => {
                uni.makePhoneCall({
                    phoneNumber: phonne 
                });
            })
        },

        // 全局过滤器  金钱 - 千分位处理
        money_num,

        // 定时器 - 主要用处配置骨架屏在请求完成后延迟一段时间隐藏骨架屏
        setTimeout(fun) {
            setTimeout(fun, config.skeleton_time)
        },

        // 全局跳转路由方法 1. type => uni 跳转路由的方式   2. url => 跳转的路由链接 
        skipLink(type, url) {
            if (!url) {
                this.common.toast('暂未开放')
                return
            }
            setTimeout(() => {
                uni[type]({
                    url: url
                })
            }, 100)
        }
    },
    onShow() {

    },
    filters: {
        // 全局过滤器  金钱 - 千分位处理
        thousands(num) {
            return money_num(num)
        }
    },
}