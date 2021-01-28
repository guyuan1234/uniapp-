<template>
	<div class="gy-order-card">
		<view class="header">
			<p class="title">订单编号：{{ item.out_trade_no }}</p>
			<p class="status">
				{{ item.statusInfo }}
				<span v-if="type == 'adopt' && item.status == 3"
					>-{{
						item.deliver_status == 1
							? '待发货'
							: item.deliver_status == 2
							? '待收货'
							: item.deliver_status == 3
							? '已完成'
							: '已寄卖'
					}}</span
				>
			</p>
		</view>
		<!--  -->
		<view class="goods_box">
			<gy-order-goods
				type="confirm"
				:item="{
					img: type == 'adopt' || type == 'consign' ? item.thumb : item.cover_url,
					num: type == 'adopt' || type == 'consign' ? 1 : item.number,
					title: item.title,
					price: type == 'adopt' || type == 'consign' ? item.money : item.price,
				}"
			></gy-order-goods>
		</view>
		<!--  -->
		<view class="footer">
			<p class="price_text" v-if="type == 'order'">
				<span>总价：￥{{ (Number(item.price) * item.number).toFixed(2) }}</span>
				<span>{{ item.status == 1 ? '需付' : '实付' }}：￥{{ item.money }}</span>
			</p>
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
		item: {
			type: Object,
			default() {
				return {};
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
.gy-order-card {
	padding: 0 30rpx 30rpx 30rpx;
	border-radius: 8rpx;
	background: #fff;
	.header {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		height: 86rpx;
		border-bottom: 2rpx solid #ededed;
		.title {
			font-size: 24rpx;
			color: #222222;
		}
		.status {
			font-size: 28rpx;
			color: #43954a;
		}
	}
	.goods_box {
		border-bottom: 1px solid #f7f7f7;
		padding: 20rpx 0;
	}
	.footer {
		padding-top: 30rpx;
		.price_text {
			font-size: 24rpx;
			font-weight: bold;
			color: #666666;
			text-align: right;
			padding-bottom: 30rpx;
			& span:last-child {
				margin-left: 20rpx;
			}
		}
	}
}
</style>
