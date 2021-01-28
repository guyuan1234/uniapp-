<template>
	<div class="gy-message-card">
		<p class="time_box">{{item.create_time}}</p>
		<view class="warp_box">
			<p class="title">{{item.title}}</p>
			<p class="content">{{item.content}}</p>
		</view>
	</div>
</template>

<script>
export default {
	props: {
		item: {
			type: Object,
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
	.time_box {
		text-align: center;
		padding-bottom: 20rpx;
		font-size: 22rpx;
		color: #666666;
	}
	.warp_box {
		background-color: #ffffff;
		border-radius: 10rpx;
		padding: 30rpx;
		.title {
			font-size: 32rpx;
			font-weight: bold;
			color: #222222;
		}
		.content {
            margin-top: 20rpx;
			font-size: 28rpx; 
			color: #999999;
		}
	}
}
</style>
