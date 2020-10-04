$(function() {
    //点击去注册按钮,登陆框显示
    $('#link_reg').on('click', function() {
        $('.box_login').hide();
        $('.box_reg').show();
    })

    //点击去登录按钮,注册框显示
    $('#link_login').on('click', function() {
        $('.box_reg').hide();
        $('.box_login').show();
    })

    //从layui中获取form对象
    var form = layui.form;
    //从layui中获取layer提示框
    var layer = layui.layer;
    //通过form.verify()函数自定义校验规则
    form.verify({
        //pwd校验密码输入
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //repwd校验两次密码输入是否一致
        repwd: function(value) {
            var pwd = $('.box_reg [name=password]').val();
            if (pwd != value) {
                return '两次密码不一致'
            }
        }
    })

    //注册表单的监听事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        $.post('/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                return layer.msg('注册成功, 请登录!');
            }

        )

        //模拟人的点击行为
        $('#link_login').click();
    })

    //登录表单的监听行为
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功!');
                //将登录成功得到的token保存到localStorage中
                localStorage.setItem('token', res.token);
                // 登录成功后跳转到主页
                location.href = 'index.html';
            }
        })
    })


})