<template>
	<div class="gy-null" :style="{ paddingTop: paddingTop + 'rpx' }">
		<image :src="image" mode="" />
		<p v-if="tip">{{ tip }}</p>
		<button v-if="buttonText" @tap="tapEvent" :style="{ background: buttonColor }">{{ buttonText }}</button>
	</div>
</template>

<script>
export default {
	props: {
		image: {
			// 显示图片
			type: String,
			default() {
				return '/static/images/bg/null.png';
			},
		},
		tip: {
			// 提示文字
			type: String,
			default() {
				return '暂无数据';
			},
		},
		paddingTop: {
			// 距离顶部距离 单位 rpx
			type: [String, Number],
			default() {
				return 30;
			},
		},
		buttonColor: {
			// 按钮的背景颜色
			type: String,
			default() {
				return '#77b25c';
			},
		},
		buttonText: {
			type: [String, Boolean],
			default() {
				return false;
			},
		},
		url: {
			//
			type: [String, Boolean],
			default() {
				return false;
			},
		},
	},
	data: () => ({}),
	computed: {},
	methods: {
		tapEvent() {
			if (this.url) {
				uni.navigateTo({
					url: this.url,
				});
			} else {
				this.$emit('tapEvent');
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
.gy-null {
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	image {
		width: 440rpx;
		height: 275rpx;
	}
	p {
		font-size: 28rpx;
		font-weight: 550;
		line-height: 40rpx;
		color: #999;
		padding: 20rpx 0 36rpx 0;
	}
	button {
		width: 180rpx;
		height: 64rpx;
		border-radius: 4rpx;
		line-height: 64rpx;
		font-size: 28rpx;
		color: #ffffff;
		&:after {
			border: 0;
		}
		&:active {
			opacity: 0.6;
		}
	}
}
</style>
