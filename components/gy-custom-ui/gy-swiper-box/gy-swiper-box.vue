<template>
	<view>
		<!-- 容器 -->
		<view class="outerBox" :style="'height:' + scrollBoxHeight + 'rpx;'">
			<scroll-view
				:scroll-x="true"
				class="scrollBox"
				:show-scrollbar="false"
				scroll-left="0"
				@scroll="scrollEvent"
			>
				<view class="itemBox" :style="'width:' + itemBoxWidth + 'rpx;height:' + scrollBoxHeight + 'rpx;'">
					<view class="item" v-for="(v, k) in listData" :key="k" @click="skipLink('navigateTo',`/pages/views/car-list/car-list?cid=${v.cid}&title=${v.title}`)">
						<image :src="v.thumb" lazy-load mode="aspectFill"></image>
						<span>{{ v.title }}</span>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 展示框 -->
		<view class="scroll-bar" :style="'width:' + scrollBarWidth + 'rpx;'">
			<view
				class="item"
				:style="'width:' + scrollBarItemWidth + 'rpx;margin-left:' + scrollBarLeft + 'rpx;'"
			></view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		listData: {
			type: Array,
			default() {
				return [
					// {
					//     cid:'1',
					//     thumb:
					//         "https://img12.360buyimg.com/n7/jfs/t1/118814/16/2375/145445/5ea1b47aEdffc2a25/92bfb36f6b45f7f3.jpg",
					//     title: "西裤",
					// },
				];
			},
		},
		scrollBarWidth: {
			// 滚动条显示框的宽度
			type: Number,
			default() {
				return 64;
			},
		},
		scrollBoxHeight: {
			// 滚动容器的高度
			type: Number,
			default() {
				return 148;
			},
		},
	},
	watch: {
		listData: {
			handler: function (newV, oldV) {
				this.initFun();
			},
			immediate: true,
			deep: true,
		},
	},
	computed: {
		itemBoxWidth() {
			let width;
			width = 100 * this.listData.length;
			width += (this.listData.length - 1) * 47;
			return width;
		},
	},
	data() {
		return {
			scrollBarItemWidth: 0,
			ratio: 0,
			scrollBarLeft: 0,
		};
	},
	methods: { 
		initFun() {
			// 设置内部滚动条长度
			let scrollBox = uni.createSelectorQuery().in(this).select('.scrollBox'),
				scrollitem = uni.createSelectorQuery().in(this).select('.itemBox');
			scrollBox
				.fields(
					{
						size: true,
					},
					(boxWidth) => {
						scrollitem
							.fields(
								{
									size: true,
								},
								(itemWidth) => {
									this.ratio = this.scrollBarWidth / itemWidth.width;
									this.ratio = parseFloat(this.ratio.toFixed(3));
									this.scrollBarItemWidth = (this.scrollBarWidth * boxWidth.width) / itemWidth.width;
								}
							)
							.exec();
					}
				)
				.exec();
		},
		scrollEvent(e) {
			this.scrollBarLeft = parseInt(e.detail.scrollLeft * this.ratio);
			if (this.scrollBarLeft <= 4) {
				this.scrollBarLeft = 0;
			} else if (this.scrollBarLeft > parseInt(this.scrollBarWidth - this.scrollBarItemWidth) - 4) {
				this.scrollBarLeft = this.scrollBarWidth - this.scrollBarItemWidth + 1;
			}
		},
	},
};
</script>

<style lang="less" scoped>
.outerBox {
	overflow: hidden;
	position: relative;
}

.scrollBox {
	height: calc(100% + 30rpx);
	.itemBox {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		.item {
			margin-right: 48rpx;
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-between;
			align-items: center;
			image {
				width: 100rpx;
				height: 100rpx;
				background: #f7f7f7;
			}
			span {
				color: #666666;
				font-size: 24rpx;
				width: 100rpx;
				text-align: center;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
		}
		& .item:first-child {
			// margin-left: 30rpx;
		}
		& .item:last-child {
			// margin-right: 30rpx;
		}
	}
}

.scroll-bar {
	height: 6rpx;
	border-radius: 6rpx;
	overflow: hidden;
	margin: 20rpx auto;
	background: #d6d6d6;

	.item {
		height: 100%;
		border-radius: 6rpx;
		background: #299bfe;
	}
}
</style>
