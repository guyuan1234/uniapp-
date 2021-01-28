<template>
	<div class="gy-integral-card" :class="type == 'integral' && 'integral'">
		<view class="left_box">
			<image v-if="item.avatar" :src="item.avatar" mode="" />
			<view>
				<!-- 佣金显示 -->
				<p v-if="type == 'distribution'">
					{{ item.type == 1 ? '直推' : item.type == 2 ? '间推' : '团队' }} {{ item.nickname }} 收益
				</p>
				<!-- 积分显示 -->
				<p v-else>代金券兑换</p>
				<p>{{ item.create_time }}</p>
			</view>
		</view>
		<view class="right_box"> +{{ type == 'distribution' ? item.money : item.integral }} 元 </view>
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
.gy-integral-card {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-content: center;
	&.integral {
		background: #fff;
        padding:20rpx 30rpx;
        border-radius: 8rpx;
	}
	.left_box {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		image {
			width: 89rpx;
			height: 89rpx;
			background: #f7f7f7;
			border-radius: 50%;
			margin-right: 20rpx;
		}
		view {
			& p:first-child {
				font-size: 28rpx;
				font-weight: bold;
				color: #222222;
			}
			& p:last-child {
				font-size: 24rpx;
				margin-top: 10rpx;
				color: #999999;
			}
		}
	}
	.right_box {
		font-size: 32rpx;
		font-weight: bold;
		display: flex;
		align-items: center;
		color: #43954a;
	}
}
</style>
