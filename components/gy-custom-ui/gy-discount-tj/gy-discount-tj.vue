<template>
	<div class="gy-discount-tj" @tap="$emit('skip')">
		<image class="bg" src="/static/images/bg/q1.png" mode="" />
		<view class="left_box">
			<p class="title">{{ title }}</p>
			<p class="content">{{ content }}</p>
		</view>
		<view class="right_box">
			<slot></slot>
		</view>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
		},
		content: {
			type: String,
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
.gy-discount-tj {
	width: 690rpx;
	box-sizing: border-box;
	height: 154rpx;
	position: relative;
	padding: 0 26rpx;
	color: #fff;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
	.bg {
		width: 690rpx;
		height: 154rpx;
		border-radius: 10rpx;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
	}
	.left_box {
		display: flex;
		flex-flow: column nowrap;
		height: 100%;
		justify-content: center; 
		z-index: 1;
		.title {
			font-size: 36rpx;
			font-weight: bold;
			font-stretch: normal;
		}
		.content {
			margin-top: 20rpx;
			font-size: 26rpx;
			font-weight: normal;
			color: #dcefe1;
		}
	}
	.right_box {
		z-index: 1;
	}
}
</style>
