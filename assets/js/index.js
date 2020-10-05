$(function() {

    //调用函数获取用户基本信息
    getUserInfo();

    var layer = layui.layer;
    //为退出按钮添加点击事件
    $('#btnLogOut').on('click', function() {
        layer.confirm(
            '确定退出登录?', { icon: 3, title: '提示' },
            function(index) {
                //清空本地存储中的token
                localStorage.removeItem('token');
                //重新跳转到登录页面
                location.href = 'login.html';
                //关闭confirm询问框
                layer.close(index);
            });
    })
})

//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || '',
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data);
        },

    })
}

function renderAvatar(user) {
    //1.获取用户名称
    var name = user.nickname || user.username;
    //2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //3.按需渲染用户的头像
    if (user.user_pic !== null) {
        //3.1渲染用户头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text_avatar').hide();

    } else {
        //3.2渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text_avatar').html(first).show();
    }

}