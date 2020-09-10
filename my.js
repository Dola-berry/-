   //获取任意元素的非行内样式******************************************************************************************************
    function getStyle(ele, attr) {
        // 判断当前浏览器是否为标准浏览器
        if (window.getComputedStyle) {
            // 当浏览器为标准浏览器时执行
            return getComputedStyle(ele)[attr];
        } else {
            // 当浏览器为非标准浏览器时执行
            return ele.currentStyle[attr];
        }
    }


    // 获取随机数
    function getRandom(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


    //这是一个用来做左右移动的动画的函数
    function move(ele, attr, target, callback) {// 元素  属性 目标值  回调函数
        clearInterval(obj.timer);
        timer = setInterval(function () {
            // 获取值
            var speed = parseInt(getStyle(ele, attr));
            var step = speed < target ? 10 : -10;
            speed += step;
            if ((speed >= target && step > 0) || (speed <= target && step < 0)) {
                speed = target;
            }
            // 当前值等于目标值，清除定时器，调用回调函数
            if (speed == target) {
                clearInterval(timer);
                callback && callback();
            }
            ele.style[attr] = speed + 'px';
        }, 10)
    }

    //事件绑定兼容
    function bind(ele, type, callback) {
        //1.写入主要代码
        //2.查询不确定数据 ，提出来 作为参数  元素  事件类型  事件处理函数
        //3.将形参带入到函数中
        if (ele.addEventListener) {
            //证明页面在标准浏览器中打开， 直接使用addEventListener即可
            ele.addEventListener(type, callback)
        } else {
            //否则，证明页面在ie中打开，就使用attachEvent
            ele.attachEvent('on' + type, callback)
        }
    }

    //事件解绑兼容
    function unbind(ele, type, callback) {
        if (ele.removeEventListener) {
            //证明页面在标准浏览器中打开， 直接使用addEventListener即可
            ele.removeEventListener(type, callback)
        } else {
            //否则，证明页面在ie中打开，就使用attachEvent
            ele.detachEvent('on' + type, callback)
        }
    }

    // 阻止事件冒泡
    function stopPropagation(){
        if(eval.stopPropagation) eval.stopPropagation();
        else eval.cancelBubble = true;
    }

    // 阻止默认行为				
    function preventDefault(event) {
        var event = getEvent(event);
        // 标准浏览器
        if (event.preventDefault) {
            event.preventDefault();
            // IE浏览器
        } else {
            event.returnValue = false;
        }
    }


    //封装缓冲动画函数 bufferMove
function bufferMove(ele, json ,fun) { //json是一个用来接收对象的形参
    //json接收的对象形式： {添加动画的属性名:终点值}
    //fun用来接收回调函数
    //让一个元素left移动到指定位置

    //在每次添加定时器之前 先清除一次定时器  防止定时器的叠加
    clearInterval(ele.timer);
    //每一个添加动画效果的元素自己都应该拥有一个自己的定时器，这样才能做到互不影响
    ele.timer = setInterval(function () {
        //为了让所有属性都可以运动到终点 因此这里我们给一个判断标识
        var flag = true;//true表示大家都执行完了
        //循环整个json对象 给每一个属性都添加动画效果
        for (var key in json) { //json:{width:500,height:500,opacity:50}
            var attr = key;//属性名
            var target = json[key];//终点值
            //1.获取起点
            if (attr == 'opacity') {
                var cur = getStyle(ele, attr) * 100;
            } else {
                var cur = parseInt(getStyle(ele, attr));//300
            }
            //2.计算步长
            var step = (target - cur) / 10; // 如果步长大于0 要向上取整， 步长小于0 要向下取整
            // console.log(step);
            //3.处理步长
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            //4.迈出第一只脚  确定下一步的位置
            cur += step;
            //6.在定位之前，判断是否有人没到终点
            if(step>0 && cur<target){
                flag = false//证明有人没到终点
            }else if(step<0 && cur>target){
                flag = false;
            }
            //5.第二只脚跟上  定位
            if (attr == 'opacity') {
                ele.style[attr] = cur / 100;
            } else {
                ele.style[attr] = cur + 'px';
            }
        }
        //判断 如果大家都到终点了 flag的值为true 否则，值为false
        if(flag==true){
            //清除定时器
            clearInterval(ele.timer);
            //在动画执行完之后 如果用户传入了 回调函数 我们就调用
            if(fun){
                fun();
            }
        }
    }, 25)
}