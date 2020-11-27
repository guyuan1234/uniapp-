<template>
	<div class="go_back_box" :style="fixed" @tap="tapEvent">
		{{isHome ? '首页' : '返回'}}
	</div>
</template>

<script>
export default {
	props: {
		fixed: {
			type: Object,
			default() {
				return {
					bottom: "30rpx",
					right: "30rpx",
				};
			},
		},
	},
	data() {
		return {
			isHome: true, // 是否显示返回到首页
		};
	},
	created() {
		// 获取当前路由有几层
		if (getCurrentPages().length > 1) {
			this.isHome = false;
		}
    },
    methods:{
        tapEvent(){
            if(this.isHome){
                uni.switchTab({
                        url: '/'
                })
            }else{
                uni.navigateBack();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.go_back_box {
	position: fixed;
	width: 40px;
	height: 40px;
	background: rgba(0, 0, 0, 0.6);
	border-radius: 50%;
    line-height: 40px;
    text-align: center; 
    transition: all linear 150ms;
    color: #fff;
    font-size: 24rpx;
}
</style>