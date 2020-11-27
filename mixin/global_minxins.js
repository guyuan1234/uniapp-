// 设置千分位公共函数
function money_num(num){
    if (isNaN(num)) {
        throw new TypeError("num is not a number");
    }

    var groups = (/([\-\+]?)(\d*)(\.\d+)?/g).exec("" + num),
        mask = groups[1], //符号位 
        integers = (groups[2] || "").split(""), //整数部分 
        decimal = groups[3] || "", //小数部分 
        remain = integers.length % 3;

    var temp = integers.reduce(function (previousValue, currentValue, index) {
        if (index + 1 === remain || (index + 1 - remain) % 3 === 0) {
            return previousValue + currentValue + ",";
        } else {
            return previousValue + currentValue;
        }
    }, "").replace(/\,$/g, "");
    return mask + temp + decimal;
}


export default {
    data() {
        return { 
            
        }
    },
    // 全局页面滚动监听   --  暂未使用到沉浸式导航栏
    // onPageScroll(e) {
    //     // 判断当前自定义沉浸式导航栏是否存在 
    //     if (this.$refs.gyNavBar) {
    //         // 执行内部滚动回调
    //         this.$refs.gyNavBar.pageScroll && this.$refs.gyNavBar.pageScroll(e)
    //     }
    // },
    methods: {
        money_num,
    },
    onShow(){
        
    },
    filters: {
        // 全局过滤器  金钱 - 千分位处理
        thousands(num) {
            return money_num(num)
        }
    },
}