<template>
    <div>
        <view class="flex_box">
            <image :src="logo" v-if="logo" mode="widthFix" />
            <view v-else style="height:200rpx"></view>
            <p class="title">您还未登录</p> 
            <button :style="{background:color}" @tap="$emit('tap-change')">前往登录</button>
        </view>
    </div>
</template>

<script>
    export default {
        props:{
            logo:String,
            color:{
                type: String,
                default(){
                    return 'linear-gradient(-28deg, #6aa853 0%, #77b25c 100%), linear-gradient(#000000, #000000)'
                }
            },
        },
        methods: { 
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
        }
        .title{
            font-size: 38rpx;
            color: #333;
            font-weight: 550;
            padding:30rpx 0;
        }
        button{
            border:0; 
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