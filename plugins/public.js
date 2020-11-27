export default {
    // toast 提示
    toast(text){
        uni.showToast({
            title: text,
            icon:'none',
            position:'bottom',
            duration: 2000,
        });
    },
    // 加载动画
    loading(text){
        uni.showLoading({
            title:text || '加载中',
            mask:true
        });
    },
}