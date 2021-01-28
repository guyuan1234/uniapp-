<template>
	<div class="gy-updata-img">
		<image v-if="!show_image" class="default-image" @tap="selectImage" :src="defaultImage" mode="" />
		<image @tap="showModal" class="default-image select" v-else :src="show_image" mode="" />
	</div>
</template>

<script>
export default {
	props: {
        disabled:{
            type:Boolean,
            default(){
                return false;
            }
        },
		value: {
			type: String,
		},
		defaultImage: {
			type: String,
		},
	},
	data: () => ({
		show_image: '',
	}),
	computed: {},
	methods: {
		showModal() {
			let that = this;
			uni.showActionSheet({
				itemList: that.disabled ? ['查看大图'] : ['查看大图', '删除'],
				success: function (res) {
					if (res.tapIndex == 0) {
						that.previewImage([that.show_image]);
					} else {
						that.show_image = '';
						that.$emit('input', '');
					}
				},
				fail: function (res) {
					console.log(res.errMsg);
				},
			});
		},
		selectImage() {
			if (!this.disabled) {
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function (res) {
						that.show_image = res.tempFilePaths[0];
						that.$emit('input', res.tempFilePaths[0]);
					},
				});
			}
		},
	},
	watch: {
		value: {
			handler(n, o) {
				if (n != this.show) {
					this.show_image = n;
				}
			},
			immediate: true, //刷新加载 立马触发一次handler
			deep: true, // 可以深度检测到 person 对象的属性值的变化
		},
	},

	created() {},

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
.gy-updata-img {
	.default-image {
		width: 488rpx;
		height: 320rpx;
		background-color: #ffffff;
		box-sizing: border-box;
		&.select {
			border-radius: 8rpx;
			border: 1px solid #ededed;
		}
	}
}
</style>
