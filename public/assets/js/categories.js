// 这个数组是专用于存放 分类
var cArr = new Array();
// 添加分类
$('#cAdd').on('click', function () {

    $.ajax({
        type: 'post',
        url: '/categories',
        data: $('#cForm').serialize(),
        success: function (res) {
            cArr.push(res);
            render(cArr)
        }
    })
})
// 获取分类数据 
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        cArr = res;
        render(cArr);
    }
})

// 渲染页面 调用template方法 
function render(arr) {
    var str = template('cTpl', {
        list: arr
    })
    $('tbody').html(str);
}

// 编辑页面
var cid;
$('tbody').on('click', '.edit', function () {
    cid = $(this).parent().attr('data-id');
    $('#cForm > h2').text('修改分类');

    var title = $(this).parents('tr').children().eq(1).text();
    var className = $(this).parents('tr').children().eq(2).text();

    $('#title').val(title);
    $('#className').val(className);
    $('#cAdd').hide();
    $('#cEdit').show();

})
// 修改用户列表
$('#cEdit').on('click', function () {

    $.ajax({
        type: 'put',
        url: '/categories/' + cid,
        data: $('#cForm').serialize(),
        
        
        success: function (res) {

            var index = cArr.findIndex(item => item._id == cid);
            
            
            cArr[index] = res;

            render(cArr);
            $('#title').val('');
            $('#className').val('');
            $('#cAdd').show();
            $('#cEdit').hide();
        }
    })
})

// 删除分类列表
$('tbody').on('click','.del',function(){


    if (window.confirm('你确定要删除吗')) {
        // 获取id
        var id = $(this).parent().attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function (res) {
                var index = cArr.findIndex(item => item._id == res._id);

                cArr.splice(index, 1);

                render(cArr);
            }
        })
    }
})