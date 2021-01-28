<template>
	<div class="gy-withdraw-card">
		<view class="header">
			<view class="top_box">
				<p>我的提现</p>
				<!-- 提现失败 class error  提现成功class success -->
				<p :class="item.status == 2 ? 'success' : 'error'">+{{ item.money }}元</p>
			</view>
			<view class="bot_box">
				<p>{{ type == 'distribution' ? '佣金' : '积分' }}{{item.status == 1?'提现审核中':item.status == 2 ? '提现成功' : '提现失败' }}</p>
				<p>{{ item.create_time }}</p>
			</view>
		</view>
		<!--  -->
		<view class="footer" v-if="item.reason && item.status == 3"> 原因：<span>{{item.reason}}</span> </view>
	</div>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
		},
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
.gy-withdraw-card {
	background: #fff;
	border-radius: 12rpx;
	.header {
		padding: 30rpx 30rpx;
		.top_box,
		.bot_box {
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
		}
		.top_box {
			& p:first-child {
				font-size: 28rpx;
				font-weight: bold;
				color: #222222;
			}
			& p:last-child {
				font-size: 32rpx;
				font-weight: bold;
				color: #222222;
				&.error {
					color: #999999;
				}
				&.success {
					color: #43954a;
				}
			}
		}
		.bot_box {
			margin-top: 20rpx;
			p {
				font-size: 24rpx;
				font-weight: normal;
				font-stretch: normal;
				line-height: 40rpx;
				letter-spacing: 0rpx;
				color: #999999;
			}
		}
	}
	.footer {
		padding: 16rpx 30rpx;
		border-top: 1px dashed #ededed;
		font-size: 24rpx;
		line-height: 38rpx;
		color: #222222;
		span {
			color: #666666;
		}
	}
}
</style>
