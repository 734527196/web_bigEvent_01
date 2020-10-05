$.ajaxPrefilter(function(options) {

    options.url = 'http://ajax.frontend.itheima.net' + options.url
        // console.log(options.url)

    //统一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //不论成功还是失败， 都会调用complete回调函数
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //强制清空token
            localStorage.removeItem('token');
            //跳转到登录页面
            location.href = 'login.html';
        }
    }

})