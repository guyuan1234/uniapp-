<template>
	<div class="gy-car-card" @tap="$emit('skip')">
		<view class="left_box">
			<image :src="item.cover_url" mode="aspectFill" />
			<!-- 底部标签 -->
			<view v-if="item.cid > 0" class="tags_box tags_box1"
				>点击<span style="margin-left: 4rpx; color: #f59936">拼团</span>
			</view>
		</view>
		<view class="right_box">
			<p class="title">{{ item.title }}</p>
			<p class="content">{{item.intro || ''}}</p>
			<p class="footer">
				<view>
                    <span class="span1">零售价：</span>
                    <span>￥ {{ item.price }} </span>
                </view>
				<view>
					<button>{{ item.cid > 0 ? '立即拼团' : '立即购买' }}</button>
				</view>
			</p>
		</view>
	</div>
</template>

<script>
export default {
	props: {
		tags: {
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
				return {
					cid: null,
					cover_url: '',
					gid: null,
					price: '00.00',
					title: '暂无',
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
			&.warning {
				background: #ff9900;
			}
			&.success {
				background: #19be6b;
			}
			&.info {
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
				background-color: rgba(0, 0, 0, 0.24);
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
            overflow: hidden;
			font-size: 24rpx;
			font-stretch: normal;
			line-height: 38rpx;
			letter-spacing: 0rpx;
			color: #666666;
            display: -webkit-box;
			text-overflow: ellipsis;
			-webkit-line-clamp: 1; /*要显示的行数*/
			-webkit-box-orient: vertical;
		}
		.footer {
			font-size: 26rpx;
			font-weight: normal;
			font-stretch: normal;
			line-height: 38rpx;
			letter-spacing: 0rpx;
			color: #444;
			// margin-bottom: -6rpx;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: flex-end;
			span {
				color: #43954a;
				font-weight: bold;
				height: 30rpx;
                &.span1{
                    color:#999;
                    font-weight: 500;
                    font-size: 22rpx;
                }
			}
			button {
				padding: 0;
				width: 131rpx;
				height: 46rpx;
				line-height: 46rpx;
				font-size: 24rpx;
				color: #ffffff;
				background-image: linear-gradient(-28deg, #6aa853 0%, #77b25c 100%),
					linear-gradient(0deg, #fd0036 0%, #ff1f4f 100%);
				background-blend-mode: normal, normal;
				border-radius: 23rpx;
				&:after {
					border: 0;
				}
				&:active {
					opacity: 0.6;
				}
			}
		}
	}
}
</style>
