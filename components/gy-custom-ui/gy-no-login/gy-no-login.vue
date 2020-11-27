<template>
    <div>
        <view class="flex_box">
            <image src="/static/logo_canvas.png" mode="" />
            <p class="title">您还未登录</p> 
            <button @tap="skipLogin">前往授权登录</button>
        </view>
    </div>
</template>

<script>
    export default {
        methods: {
            skipLogin(){
                uni.navigateTo({ url: '/pages/views/login/login' })
            },
        },
    }
</script>

<style lang="scss" scoped>
    .flex_box{
        padding-top:200rpx;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        image{
            width: 320rpx;
            height: 181rpx;
        }
        .title{
            font-size: 38rpx;
            color: #555;
            font-weight: 550;
            padding:30rpx 0;
        }
        button{
            border:0;
            margin-top:20rpx;
            background: #ff0000;
            color: #fff;
            width: 300rpx;
            &:active{
                opacity: .6;
            }
            &:after{
                border:0;
            }
        }
    }
</style>