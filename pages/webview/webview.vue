<template>
	<div class="webview">
        <web-view :webview-styles="webviewStyles" :src="src"></web-view>
    </div>
</template>

<script>
import Vue from "vue";
export default {
	components: {},
	data: () => ({
        src:'',
        webviewStyles: {
            progress: {
                color: '#FF3333'
            }
        }
    }),
	computed: {},
	methods: {},
	watch: {},

	// 页面周期函数--监听页面加载
	onLoad(data) {
        console.log(data)
        this.src = data.src
    },
	// 页面周期函数--监听页面初次渲染完成
	onReady() {},
	// 页面周期函数--监听页面显示
	onShow() {},
	// 页面周期函数--监听页面隐藏
	onHide() {},
	// 页面周期函数--监听页面卸载
	onUnload() {},
	// 页面处理函数--监听用户下拉动作
	onPullDownRefresh() {
		uni.stopPullDownRefresh();
	},
	// 页面处理函数--监听用户上拉触底
	onReachBottom() {},
	// 页面处理函数--监听页面滚动
	/* onPageScroll(event) {}, */
	// 页面处理函数--用户点击右上角分享
	/* onShareAppMessage(options) {}, */
};
</script>

<style></style>
