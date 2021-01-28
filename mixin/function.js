// 设置千分位公共函数
export function money_num(num) {
    if (isNaN(num)) {
        console.error('请传入数字类型')
        return 0;
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

// 判断当前是否在微信浏览器中
export function browserType() {
    var ua = navigator.userAgent.toLowerCase();
    var isWinxin = ua.indexOf('micromessenger') != -1;
    if (isWinxin) {
        return true;
    } else {
        return false; 
    }
}