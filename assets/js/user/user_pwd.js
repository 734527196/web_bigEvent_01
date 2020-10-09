$(function() {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samepwd: function(value) {
            var oldpwd = $('[name=oldPwd]').val()
            if (value === oldpwd) {
                return '新旧密码不能相同'
            }
        },
        repwd: function(value) {
            var newpwd = $('[name=newPwd]').val()
            if (value !== newpwd) {
                return '两次密码不一致'
            }
        }

    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: {
                oldPwd: $('[name=oldPwd]').val(),
                newPwd: $('[name=newPwd]').val(),
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('更新密码成功');
                $('.layui-form')[0].reset();
            }
        })
    })
})