<template>
	<div class="gy-car-card" @tap="$emit('skip')">
		<view class="left_box">
			<!-- 右上角标签 -->
			<view
				class="top-left-tabs"
				:class="item.examine_status == 1 ? 'warning' : item.examine_status == 2 ? 'success' : 'info'"
				v-if="status"
				>{{ item.examine_status == 1 ? '审核中' : item.examine_status == 2 ? '审核通过' : '审核不通过' }}</view
			>
			<image :src="item.thumb" mode="" />
			<!-- 底部标签 -->
			<view class="tags_box" :class="'tags_box' + item.status" v-if="[1, 2, 3].indexOf(item.status) > -1 && tags">{{
				item.bidStatus
			}}</view>
		</view>
		<view class="right_box">
			<p class="title">{{ item.title }}</p>
			<p class="content">车辆编号: {{ item.car_number }}</p>
			<p class="footer">
				车辆价格：<span>{{ item.money | thousands }} 元</span>
			</p>
		</view>
	</div>
</template>

<script>
export default {
	props: {
        tags:{
            // 底部状态
			type: Boolean,
			default() {
				return false;
			},
        },
		status: {
			// 是否加左上角状态标签
			type: Boolean,
			default() {
				return false;
			},
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
.gy-car-card {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	.left_box {
		position: relative;
		overflow: hidden;
		image {
			width: 170rpx;
			height: 170rpx;
			border-radius: 8rpx;
		}
		.top-left-tabs {
			width: 200rpx;
            padding: 0 0 4rpx 0;
			text-align: center;
			position: absolute;
			top: 26rpx;
			left: -61rpx;
			font-size: 18rpx;
			transform: rotate(-45deg);
			color: #fff;
            &.warning{
                background: #ff9900;
            }
            &.success{
                background: #19be6b;
            }
            &.info{
                background: #909399;
            }
		}
		.tags_box {
			width: 100%;
			height: 36rpx;
			position: absolute;
			left: 0;
			bottom: 0;
			color: #fff;
			text-align: center;
			font-size: 24rpx;
			line-height: 36rpx;
			color: rgba(255, 255, 255, 1);
			border-radius: 0 0 8rpx 8rpx;
			&.tags_box1 {
				background-color: rgba(220, 104, 81, 0.6);
			}
			&.tags_box2 {
				background-color: rgba(0, 0, 0, 0.6);
			}
			&.tags_box3 {
				background-color: rgba(255, 255, 255, 0.6);
			}
		}
	}

	.right_box {
		width: calc(100% - 190rpx);
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		.title {
			overflow: hidden;
			display: -webkit-box;
			text-overflow: ellipsis;
			-webkit-line-clamp: 2; /*要显示的行数*/
			-webkit-box-orient: vertical;
			font-size: 28rpx;
			font-weight: bold;
			font-stretch: normal;
			line-height: 38rpx;
			letter-spacing: 0rpx;
			color: #222222;
			margin-top: -6rpx;
		}
		.content {
			font-size: 24rpx;
			font-stretch: normal;
			line-height: 38rpx;
			letter-spacing: 0rpx;
			color: #666666;
		}
		.footer {
			font-size: 26rpx;
			font-weight: normal;
			font-stretch: normal;
			line-height: 38rpx;
			letter-spacing: 0rpx;
			color: #444;
			margin-bottom: -6rpx;
			span {
				color: #ff0000;
				font-weight: bold;
			}
		}
	}
}
</style>
