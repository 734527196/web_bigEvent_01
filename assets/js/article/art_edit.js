$(function() {
    var form = layui.form

    initCate()

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                var htmlStr = template('tpl_cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    // 初始化富文本编辑器
    initEditor()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#btnChooseImg').on('click', function() {
        $('#file').click()
    })

    $('#file').on('change', function(e) {
        var fileslist = e.target.files;
        if (fileslist.length === 0) {
            return layui.layer.msg('请选择图片')
        }
        var file = fileslist[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    initArtContent()

    function initArtContent() {
        var id = sessionStorage.getItem('Id');
        console.log(id)
        $.ajax({
            method: 'GET',
            url: '/my/article/' + id,
            success: function(res) {
                form.val('form_pub', res.data)
                sessionStorage.removeItem('Id')
            }
        })
    }

})