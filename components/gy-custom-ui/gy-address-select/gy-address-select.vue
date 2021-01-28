<template>
	<div class="gy-adress-select">
		<!-- 有地址 -->
		<view v-if="address" class="address_box" :class="select && 'select'" @tap="selectEvent">
			<view class="left_box" :style="select && 'width:calc(100% - 120rpx)'">
				<p class="top_text">
					<span>{{item.link_man}}</span>
					<span>{{item.link_phone}}</span>
				</p>
				<p class="detail_text">{{item.link_address}}</p>
			</view>
			<view v-if="select">
				<tui-icon name="turningright" color="#999"></tui-icon>
			</view>
		</view>
		<!-- 没有地址 -->
		<view v-else class="not_address_box">
			<tui-list-cell hover arrow unlined @tap="skipLink('navigateTo', '/pages/views/add-address/add-address?type=1')">
				<span class="null_text">请添加收货地址</span>
			</tui-list-cell>
		</view>
	</div>
</template>

<script>
export default {
	props: {
		address: {
			// 是否有地址
			type: Boolean,
			default() {
				return false;
			},
		},
		select: {
			// 是否可以切换地址
			type: Boolean,
			default() {
				return false;
			},
		},
		item: {
			type: Object,
			default() {
				return {
					area_id: '797,836,840',
					id: null,
					link_address: '暂无',
					link_man: '暂无',
					link_phone: '暂无',
				};
			},
		},
	},
	data: () => ({}),
	computed: {},
	methods: {
		selectEvent() {
			if (this.select) {
				this.skipLink('navigateTo', '/pages/views/address-list/address-list?select=true');
			}
		},
	},
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
.gy-adress-select {
	background: #fff;
	.address_box {
		padding: 30rpx;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: space-between;
		&.select:active {
			opacity: 0.6;
		}
		.left_box {
			.top_text {
				font-size: 28rpx;
				font-weight: bold;
				color: #000000;
				margin-bottom: 20rpx;
				& span:first-child {
					margin-right: 20rpx;
				}
			}
			.detail_text {
				font-size: 24rpx;
				word-break: break-all;
				color: #666666;
			}
		}
	}
	.not_address_box {
		.null_text {
			font-size: 24rpx;
			color: #999999;
		}
	}
}
</style>
