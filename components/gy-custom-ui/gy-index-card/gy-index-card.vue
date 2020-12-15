<template>
	<div class="gy-index-card" @tap="skipEvent">
		<image
			class="tui-skeleton-rect"
			:src="item.thumb"
			mode="aspectFill"
		/>
		<div class="bottom_box_gy">
			<p class="title tui-skeleton-rect">
				{{item.title}}
			</p>
			<p class="content tui-skeleton-rect">
				{{item.content}}
			</p>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		item: {
			type: Object,
			default() {
				return {
					id: 2,
					title: "文章标题",
					thumb: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2211283380,2655893385&fm=26&gp=0.jpg",
					content: "文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情文章详情",
				};
			},
		},
	},
	data: () => ({}),
	computed: {},
	methods: {
		skipEvent() {
			uni.navigateTo({
				url: `/pages/views/detail/detail?id=${this.item.id}`,
			});
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
.gy-index-card {
	background-color: #ffffff;
	box-shadow: 0rpx 0rpx 4rpx 0rpx rgba(0, 0, 0, 0.16);
	border-radius: 8rpx;
	overflow: hidden;
	image {
		width: 100%;
		height: 345rpx;
        
	}
	.bottom_box_gy {
		padding: 25rpx 0;
		.title {
			width: 100%;
			min-height: 27rpx;
			font-size: 28rpx;
			color: #222222;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			font-weight: 700;
			padding: 0 14rpx;
		}
		.content {
			margin-top: 20rpx;
			width: 100%;
			min-height: 61rpx;
			font-size: 26rpx;
			line-height: 36rpx;
			color: #999999;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			padding: 0 14rpx;
		}
	}
}
</style>
