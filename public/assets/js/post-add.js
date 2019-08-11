
// 获取分类数据 
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        // console.log(res);
        var html = template('pTpl', { list: res })
        //  console.log(html);
        //添加到下拉列表
        $('#category').html(html);
    }
})

// 上传图片到本地 并把路径写到隐藏域

$('#feature').on('change', function () {

    var formData = new FormData();

    formData.append('file', this.files[0]);

    // console.log(this.files[0]);
    // console.log(formData);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (res) {
            //把路径写到隐藏域
            $('#hidden').val(res[0].file);
            // 实现图片预览
            $('#pImg').attr('src', res[0].file).show();
        }
    })
})

// 创建文章
$('#pAdd').on('click', function () {
    // 获取用户在表单中输入的内容
    var formData = $('#pForm').serialize();
    // console.log(formData);
    
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function () {
            // 跳转到文章列表页面
            location.href = '/admin/posts.html';
        }
    })
})

// 