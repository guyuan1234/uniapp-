<template>
    <div class="gy-message-card">
        <p class="top">
            <image :src="item.avatar" mode="" />
            <span>来自 <span style="color:#ff0000;padding:0 6rpx;">{{item.nickname}}</span> 的感谢留言：</span>
        </p>
        
        <p class="content">{{item.content}} </p>
        <p class="time">{{item.create_time}}</p>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default() {
                return {
                    avatar: "",
                    content: "",
                    create_time: "0",
                    nickname: "",
                };
            },
        },
    },
    data: () => ({}),
    computed: {},
    methods: {},
    watch: {},

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
.gy-message-card {
    padding: 30rpx;
    background-color: #ffffff;
    border-radius: 6rpx;
    border: solid 1rpx #f3f3f3;
    .top {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        image {
            width: 44rpx;
            height: 44rpx;
            background: #f7f7f7;
            margin-right: 15rpx;
            border-radius: 50%;
        }
        span {
            font-size: 28rpx;
            line-height: 42rpx;
            color: #222222;
        }
    }
    .content {
        padding: 27rpx 0;
        font-size: 28rpx;
        line-height: 42rpx;
        word-break: break-all;
        color: #999999;
    }
    .time {
        text-align: right;
        font-size: 24rpx;
        color: #999999;
    }
}
</style>
