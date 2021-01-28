import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/plugins/http.js'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        webConfig:{}, // 网站通用配置
        userInfo:{}, // 用户信息
    },
    mutations: {
        // 更新获取用户信息
        updateUser(state,callback){
            axios({
                url:'/user/userCenter'
            }).then((res)=>{
                if(res.code == 0){
                    state.userInfo = res.data;
                }
                if(callback){
                    callback()
                } 
            })
        }
    },
    actions: {}
})
export default store