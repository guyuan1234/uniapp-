import Vue from 'vue'
import App from './App'
import uView from "components/uview-ui";
Vue.use(uView);

// 全局正则验证
import reg from 'plugins/regular.js';
Vue.prototype.reg = reg;

// 全局通用方法
import common from 'plugins/public.js';
Vue.prototype.common = common;

// 全局发起请求
import axios from 'plugins/http.js';
Vue.prototype.$axios = axios;

//引入vuex
import store from 'store';  

// 全局mixins
import global_minxins from "@/mixin/global_minxins.js";
Vue.mixin(global_minxins);

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
    ...App,
    store
});
app.$mount();