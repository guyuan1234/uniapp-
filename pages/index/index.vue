<template>
	<view class="content">
        <!--  -->
        <gy-navBar ref="gyNavBar" show_back></gy-navBar>
        <!--  -->
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text> 
		</view>
        <navigator url="/pages/webview/webview?src=https://www.laiyid.com/" hover-class="className">跳转</navigator>
        <div style="height:3000px"></div>
	</view>
</template>

<script> 
	export default { 
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
            
		},
		methods: {
            
        }, 
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
