<template>
	<div class="gy-coupon-card">
		<view class="left_box">
			<!-- 代金券显示 -->
			<view class="coupon" v-if="type == 'coupon'">
				<image src="/static/images/bg/coupon.png" mode="" />
				<view class="text" :class="`t${money > 0 && money < 10 ? 1 : money > 9 && money < 100 ? 2 : 3}`">{{
					money
				}}</view>
			</view>
			<!-- 领养券显示 -->
			<image v-else :src="img" mode="" />
			<!--  -->
			<view class="detail_box">
				<p v-if="type == 'coupon'">{{ money }}元代金券</p>
				<p v-else>{{ title }}</p>
				<p>有效期：{{ validity_time }}</p>
			</view>
		</view>
		<view class="right_box">
			<slot></slot>
		</view>
	</div>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
		},
		money: {
			type: Number,
		},
		validity_time: {
			type: String,
		},
		title: {
			type: String,
		},
		img: {
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
.gy-coupon-card {
	padding: 20rpx;
	background-color: #ffffff;
	border-radius: 10rpx;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
	.left_box {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		image {
			width: 120rpx;
			height: 120rpx;
			border-radius: 10rpx;
			background-color: #f7f7f7;
			margin-right: 10rpx;
		}
		.coupon {
			position: relative;
			.text {
				position: absolute;
				left: 18rpx;
				width: 40rpx;
				text-align: center;
				font-weight: bold;
				color: #ffffff;
				&.t1 {
					font-size: 32rpx;
					bottom: 28rpx;
				}
				&.t2 {
					font-size: 26rpx;
					bottom: 30rpx;
				}
				&.t3 {
					font-size: 20rpx;
					bottom: 32rpx;
				}
			}
		}
		.detail_box {
			& p:first-child {
				font-size: 32rpx;
				font-weight: bold;
				color: #222222;
			}
			& p:last-child {
				margin-top: 20rpx;
				font-size: 24rpx;
				color: #999999;
			}
		}
	}
}
</style>
