<template>
	<view class="gy-order-goods">
		<image
			:style="type === 'detail' && 'width:200rpx;height:200rpx'"
			:src="type === 'detail' || type === 'confirm' ? item.img : ''"
			mode="aspectFill"
		/>
		<view class="right_box" :style="type === 'detail' && 'width:calc(100% - 220rpx)'">
			<view class="top">
				<view class="title" :style="type === 'detail' && 'width:100%'">
					{{ type === 'detail' || type === 'confirm' ? item.title : '' }}
				</view>
				<span v-if="type != 'detail'">x {{ type === 'confirm' ? item.num : '' }}</span>
			</view>
			<view class="inventory" v-if="type === 'detail' && item.stock>-1">库存：{{ type === 'detail' ? item.stock : '' }}</view>
			<view class="bottom"> ¥ {{ type === 'detail' || type === 'confirm' ? item.price : '' }} </view>
		</view>
	</view>
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
.gy-order-goods {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	image {
		width: 142rpx;
		height: 142rpx;
		background: #f7f7f7;
	}
	.right_box {
		width: calc(100% - 162rpx);
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		.top {
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			.title {
				font-size: 24rpx;
				font-weight: bold;
				color: #222222;
				width: calc(100% - 50rpx);
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			span {
				font-size: 24rpx;
				line-height: 32rpx;
				letter-spacing: 0rpx;
				color: #999999;
			}
		}
		.inventory {
			font-size: 26rpx;
			color: #999999;
		}
		.bottom {
			font-size: 28rpx;
			font-weight: bold;
			color: #43954a;
		}
	}
}
</style>
