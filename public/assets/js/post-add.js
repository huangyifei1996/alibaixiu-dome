
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

// 修改文章
var id = getUrl('id');
// console.log(id);

if(id != -1){
    $.ajax({
        type:"get",
        url:'/posts/'+id,
        success:function(res){
            console.log(res);
            
            $('#pEdit').show();
            $('#pAdd').hide();

            // 将标题 内容 时间 显示出来
            $('#title').val(res.title);
            $('#content').val(res.content);
            $('#created').val(res.createAt && res.createAt.substr(0,16));

            var coption = $('#category > option');

            coption.each(function(k,v){
                if($(v).attr('value')==res.createAt){
                    $(v).prop('selected',true);
                }
            })

            var soption = $('#category > option');

            soption.each(function(k,v){
                if($(v).attr('value')==res.state){
                    $(v).prop('selected',true);
                }
            })

            $('#hidden').val(res.thumbnail);

            $('#pImg').show().attr('src',res.thumbnail);
        }
    })
}

$('#pEdit').on('click',function(){
    var formData = $('#pForm').serialize();
    $.ajax({
        type:'put',
        url:'/posts/'+id,
        data:formData,
        success:function(res){
            location.href = '/admin/posts.html';
        }
    })
})
//定义查询地址栏参数函数
function getUrl(name){
    // 获取?之后的参数
    var paramsAry = location.search.substr(1).split('&');

    for(var i = 0;i<paramsAry.length;i++){
        var tmp = paramsAry[i].split('=');
        if(tmp[0]==name){
            return tmp[1];
        }
    }
    return -1;
}