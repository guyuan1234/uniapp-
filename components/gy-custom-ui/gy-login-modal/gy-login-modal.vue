<template>
    <div class="gy-login-modal">
        <tui-modal
            width="600rpx"
            radius="16rpx"
            padding="0"
            @cancel="show = false"
            :show="show"
            :custom="true"
        >
            <view class="center_box">
                <p class="title">
                    <span>爱在流动小程序</span>
                    <view @tap.stop="show = false">
                        <tui-icon name="shut" :size="28" color="#999'"></tui-icon>
                    </view>
                </p>
                <image class="logo" :src="logo" mode />
                <p class="tips_box">
                    点击 {{type === "getUserInfo" ? '授权登录' : type === "getPhoneNumber" && '获取手机号' }} 即同意
                    <navigator url hover-class="className">《优享拍拍车》</navigator>
                </p>
                <button
                    :style="{backgroundColor:color}"
                    :open-type="type"
                    :loading="loading" 
                    @getphonenumber="getphonenumber"
                    @getuserinfo="getuserinfo"
                >{{type === "getUserInfo" ? '授权登录' : type === "getPhoneNumber" && '获取手机号' }}</button>
            </view>
        </tui-modal>
    </div>
</template>

<script>
export default {
    props: {
        type: String,
        value: Boolean,
        color: String,
        logo: String,
    },
    data: () => ({
        code: "",
        show: false,
        loading: false,
    }),
    computed: {},
    methods: {
        // 调用登录之前必须要先通过父组件触发此事件
        loginEvent() { 
            this.common
                .login_openid()
                .then((code) => {
                    this.code = code;
                })
                .catch((err) => { 
                    this.common.toast("获取openid 失败");
                });
        },
        getuserinfo(data) {
            this.all_fun(data, 1);
        },
        getphonenumber(data) {
            this.all_fun(data, 2);
        },
        all_fun(data, type) {
            if (
                data.detail.errMsg === "getPhoneNumber:ok" ||
                data.detail.errMsg === "getUserInfo:ok"
            ) {
                let open_id = this.code;
                this.auth_login(data, type, open_id);
            } else {
                // 授权失败
                this.common.toast("授权失败");
            }
        },
        auth_login(data, type, open_id) {
            let iv = data.detail.iv;
            let encryptedData = data.detail.encryptedData;
            this.$axios({
                url: type == 1 ? "/auth/login" : "/user/bindPhone",
                data: {
                    code: open_id,
                    iv: iv,
                    encryptedData: encryptedData,
                },
            })
                .then((res) => {
                    console.log(res)
                    this.loading = false;
                    if (res.code == 0) {
                        this.common.toast(
                            type == 1 ? "授权成功" : "获取成功",
                            500
                        );
                        this.$emit("input", false);
                        if (type == 1) {
                            uni.setStorageSync("token", res.data.token);
                            this.$emit("auth",res.data.phone);
                        } else {
                            this.$emit("phone");
                        }
                    }
                })
                .catch((err) => {
                    setTimeout((res) => {
                        this.loading = false;
                    }, 500);
                });
        },
    },
    watch: {
        show(n) {
            if (n != this.value) {
                this.loading = false;
                this.$emit("input", false);
            }
        },
        value: {
            handler(n, o) {
                if (n != this.show) {
                    this.show = n;
                }
            },
            immediate: true, //刷新加载 立马触发一次handler
            deep: true, // 可以深度检测到 person 对象的属性值的变化
        },
    },

    // 组件周期函数--监听组件挂载完毕
    mounted() {},
    // 组件周期函数--监听组件数据更新之前
    beforeUpdate() {},
    // 组件周期函数--监听组件数据更新之后
    updated() {},
    // 组件周期函数--监听组件激活(显示)
    activated() {},
    // 组件周期函数--监听组件停用(隐藏)
    deactivated() {},
    // 组件周期函数--监听组件销毁之前
    beforeDestroy() {},
};
</script>

<style lang="scss" scope>
.center_box {
    padding: 30rpx;
    .title {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        position: relative;
        span {
            font-size: 28rpx;
            font-weight: bold;
            color: #222222;
        }
        view {
            position: absolute;
            right: 0;
            padding: 5rpx;
        }
    }
    .logo {
        display: block;
        width: 244rpx;
        height: 244rpx;
        margin: 64rpx auto;
    }
    .tips_box {
        display: flex;
        font-size: 24rpx;
        justify-content: center;
        letter-spacing: -1rpx;
        color: #222222;
        navigator {
            color: #00a0e9;
        }
    }
    button {
        width: 474rpx;
        height: 60rpx;
        background-color: #299bfe;
        line-height: 60rpx;
        border-radius: 0;
        color: #fff;
        padding: 0;
        font-size: 28rpx;
        margin: auto;
        margin-top: 38rpx;
        &:after {
            border: 0;
        }
        &:active {
            opacity: 0.6;
        }
    }
}
</style>
