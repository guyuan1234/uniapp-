<template>
    <div class="gy-donation-card">
        <p>
            <span>捐款人</span>
            <span>{{item.nickname}}</span>
        </p>
        <p>
            <span>捐款金额</span>
            <span>{{item.money}}</span>
        </p>
        <p>
            <span>捐款时间</span>
            <span>{{item.create_time}}</span>
        </p>
        <p>
            <span>捐款留言</span>
            <span>{{item.remark || '暂未留言'}}</span>
        </p>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default() {
                return {
                    create_time: "",
                    money: "0",
                    nickname: "",
                    remark: '',
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
.gy-donation-card {
    background-color: #ffffff;
    border-radius: 6rpx;
    border: solid 1rpx #f3f3f3;
    padding: 30rpx;
    p {
        font-size: 28rpx;
        color: #999999;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding-bottom: 24rpx;
        &:last-child {
            padding: 0;
        }
        & span:first-child {
            color: #222;
        }
        & span:last-child {
            width: calc(100% - 160rpx);
        }
    }
}
</style>
