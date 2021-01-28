<template>
	<div>
		<div
			v-if="mode == 'immersion'"
			class="gy-nav-bar"
			:style="{ backgroundColor: `rgba(${colorRgb(bg)},${opacity / 100})` }"
		>
			<div :style="{ height: `${statusBarHeight}px` }"></div>
			<div class="nav_bar">
				<div
					class="left_button"
					@tap="tapEvent"
					:style="{ left: back_left, background: `rgba(0, 0, 0, ${((100 - opacity) / 100) * 0.6})` }"
					v-if="show_back"
				>
					<!-- 图标基于thorui 可更换其他ui组件库图标 -->
					<tui-icon
						v-if="!search_path"
						:name="isHome ? 'home' : 'arrowleft'"
						:size="isHome ? 16 : 26"
						:color="opacity < 10 ? '#ffffff' : `rgba(${colorRgb(active_color)},${opacity / 100})`"
					></tui-icon>
					<tui-icon
						v-else
						name="search-2"
						:size="isHome ? 16 : 26"
						:color="opacity < 10 ? '#ffffff' : `rgba(${colorRgb(active_color)},${opacity / 100})`"
					></tui-icon>
				</div>
				<div
					class="title_box"
					:style="{
						color: opacity < 10 ? default_color : `rgba(${colorRgb(active_color)},${opacity / 100})`,
					}"
				>
					{{ title }}
				</div>
			</div>
		</div>
		<!--  -->
		<div
			v-else-if="mode == 'general'"
			class="gy-nav-bar"
			:style="{ backgroundColor: `rgba(${colorRgb(bg)},${!transparent ? 1 : 0})` }"
		>
			<div :style="{ height: `${statusBarHeight}px` }"></div>
			<div class="nav_bar">
				<div
					class="left_button"
					@tap="tapEvent"
					:style="{ left: back_left, background: `rgba(0, 0, 0, 0.6)` }"
					v-if="show_back"
				>
					<!-- 图标基于thorui 可更换其他ui组件库图标 -->
					<tui-icon
						v-if="!search_path"
						:name="isHome ? 'home' : 'arrowleft'"
						:size="isHome ? 16 : 26"
						:color="transparent ? '#fff' : default_color"
					></tui-icon>
					<tui-icon
						v-else
						name="search-2"
						:size="isHome ? 16 : 26"
						:color="transparent ? '#fff' : default_color"
					></tui-icon>
				</div>
				<div class="title_box" :style="{ color: default_color }">{{ title }}</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
export default {
	props: {
		mode: {
			//  immersion 沉浸式导航栏渐变显示   general 不需要渐变
			type: String,
			default() {
				return 'immersion';
			},
		},
		transparent: {
			// 是否纯透明  mode  为 general 时生效
			type: [String, Boolean],
			default() {
				return false;
			},
		},
		// 标题文字
		title: {
			type: String,
			default() {
				return '标题栏';
			},
		},
		// 搜索按钮点击跳转的路径 （也控制了搜索按钮是否显示  ---必须要显示返回按钮） 是否显示搜索按钮
		search_path: {
			type: [String, Boolean],
			default() {
				return false;
			},
		},
		// 是否显示返回按钮    ---  返回按钮根据当当前页面是否可以返回上一页  否则直接显示  跳转首页  默认为false
		show_back: {
			type: Boolean,
			default() {
				return false;
			},
		},
		// 背景颜色只能是16进制颜色代码
		bg: {
			type: String,
			default() {
				return '#FFCC00';
			},
		},
		// 导航栏左侧按钮距离屏幕左边的距离 默认为 30rpx
		back_left: {
			type: [Number, String],
			default() {
				return '30rpx';
			},
		},
		// 默认展示字体颜色
		default_color: {
			type: String,
			default() {
				return '#333333';
			},
		},
		// 渐变展示的字体颜色
		active_color: {
			type: String,
			default() {
				return '#ffffff';
			},
		},
	},
	data: () => ({
		statusBarHeight: 0, // 状态栏的高度 px
		nav_bar_bg: '0,0,0',
		opacity: 0, // 透明度
		distance_top: 0, // 控制背景色:  显示 <-> 隐藏
		isHome: true, // 是否显示返回到首页
	}),
	computed: {},
	methods: {
		// 按钮点击事件
		tapEvent() {
			if (this.search_path) {
				uni.navigateTo({
					url: this.search_path,
				});
			} else {
				if (this.isHome) {
					uni.switchTab({
						url: '/pages/tabbar/index/index',
					});
				} else {
					uni.navigateBack();
				}
			}
		},
		// 通过mixin 出发滚动事件
		pageScroll(e) {
			// console.log(e);
			// 设置渐变背景色透明度
			if (e.scrollTop < this.distance_top) {
				let percentage = e.scrollTop / this.distance_top;
				percentage = percentage.toFixed(3);
				this.opacity = 100 * percentage;
			} else if (this.opacity < 100) {
				this.opacity = 100;
			}
		},
		// 16进制颜色代码转换成
		colorRgb(data) {
			// 16进制颜色值的正则
			var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
			// 把颜色值变成小写
			var color = data.toLowerCase();
			if (reg.test(color)) {
				// 如果只有三位的值，需变成六位，如：#fff => #ffffff
				if (color.length === 4) {
					var colorNew = '#';
					for (var i = 1; i < 4; i += 1) {
						colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
					}
					color = colorNew;
				}
				// 处理六位的颜色值，转为RGB
				var colorChange = [];
				for (var i = 1; i < 7; i += 2) {
					colorChange.push(parseInt('0x' + color.slice(i, i + 2)));
				}
				return colorChange.join(',');
			} else {
				return data;
			}
		},
	},
	watch: {},
	created() {
		let systemInfo = uni.getSystemInfoSync();
		// 控制背景色:  显示 <-> 隐藏
		this.distance_top = systemInfo.windowWidth;
		// 状态栏高度
		this.statusBarHeight = systemInfo.statusBarHeight;
		this.$emit('bar-height', this.statusBarHeight + 44);
		// 获取当前路由有几层
		if (getCurrentPages().length > 1) {
			this.isHome = false;
		}
	},
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
.gy-nav-bar {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	color: #333;
	z-index: 99999;
	.nav_bar {
		height: 44px;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		position: relative;
		.left_button {
			width: 30px;
			height: 30px;
			line-height: 30px;
			text-align: center;
			position: absolute;
			top: 0;
			border-radius: 50%;
			bottom: 0;
			margin: auto;
			&:active {
				opacity: 0.6;
			}
		}
		.title_box {
			width: 40%;
			text-align: center;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			font-size: 16px;
		}
	}
}
</style>
