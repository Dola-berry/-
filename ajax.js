//1.写入主题代码
        //2.提出不确定的数据作为参数
        //3.将参数代入函数中
        //4.调用测试
        var ajax = function (url,method,data,fn) {//请求方式和提交数据的方式不确定  url地址 提交的数据
            var xhr = new XMLHttpRequest(); //电话
            //判断 如果是get请求 就需要在url地址后面写入提交的数据 如果是post请求 则不用
            if(method == 'get'){
                xhr.open(method, url+'?'+data, true);
                xhr.send(); //请求发送成功
            }else if(method == 'post'){
                xhr.open(method, url, true);
                //如果是post 还需要设置请求头
                xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
                xhr.send(data); //请求发送成功
            }
            //获取响应数据
            xhr.onreadystatechange = function () {
                //判断  如果当前通信状态码为4 我就获取数据
                //ajax对象的 readyState属性就是通信状态码
                if (xhr.readyState == 4) {
                    if (xhr.status == 200 || xhr.status == 304) {
                        //响应成功 获取响应数据  响应数据就是ajax对象的responseText
                        //让外界能拿到响应数据   使用回调函数来实现
                        //如果响应数据成功  就调动传入的回调函数fn
                        fn(xhr.responseText);
                    }
                }
            }
        }