$(function() {
    var form = layui.form
    var laypage = layui.laypage;
    var q = {
        //默认页码为1
        pagenum: 1,
        //每页默认显示2条数据
        pagesize: 2,
        //文章分页id
        cate_id: '',
        //文章发布状态
        state: ''
    }
    template.defaults.imports.dataFormate = function(date) {
        var dt = new Date(date);

        var y = dt.getFullYear();
        var m = addzero(dt.getMonth() + 1);
        var d = addzero(dt.getDate());

        var hh = addzero(dt.getHours());
        var mm = addzero(dt.getMinutes());
        var ss = addzero(dt.getSeconds());

        return y + '-' + m + '-' + d + '  ' + hh + '-' + mm + '-' + ss
    }

    function addzero(n) {
        return n >= 10 ? n : '0' + n
    }


    initTable()
    initCateName()

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                // console.log(res)
                var htmlStr = template('tpl_table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }

    function initCateName() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('文章类别获取失败')
                }
                var htmlStr = template('tpl_cate', res)
                $('[name=cate_id]').html(htmlStr);
                form.render()
            }
        })
    }

    $('#form_search').on('submit', function(e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();

        q.cate_id = cate_id;
        q.state = state;

        initTable()
    })

    function renderPage(total) {
        // console.log(total)
        laypage.render({
            elem: 'pageBox', //分页容器的id
            count: total, //总数据条数
            limit: q.pagesize, //每页显示几条数据
            curr: q.pagenum, //设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function(obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }

            }
        });

    }

    $('body').on('click', '#btn_delete', function() {
        var len = $('#btn_delete').length
        console.log(len)
        var id = $(this).attr('data-id')
            // console.log(id)
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('文章删除失败')
                    }
                    layui.layer.msg('文章删除成功！')
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            })

            layer.close(index);


        });
    })

    $('body').on('click', '#btn_edit', function() {
        var id = $(this).attr('data-id')
        sessionStorage.setItem('Id', id)
        location.href = '/article/art_edit.html'
    })
})