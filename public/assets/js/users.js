
// 主要是用于操作用户的 
var userArr = [];
// 用于用户展示
$.ajax({
    type: 'get',
    url: '/users',
    success: function (res) {
        userArr = res;
        render(userArr);
    }
})
// 渲染页面 调用template方法 
function render(arr) {
    var str = template('userTpl', {
        list: arr
    })
    $('tbody').html(str);
}
// 用户添加
$('#userAdd').on('click', function () {
    $.ajax({
        type: 'post',
        url: '/users',
        data: $('#userForm').serialize(),
        success: function (res) {
            userArr.push(res);
            render(userArr);
        }
    })
})
// 图片上传功能
$('#avatar').on('change', function () {

    var formData = new FormData();
    // 把用户选择的文件添加到 formData对象中
    formData.append('avatar', this.files[0]);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (res) {
            //  实现图片预览
            //  console.log(res);
            $('#preview').attr('src', res[0].avatar);
            // 将图片的地址添加到表单里面的隐藏域
            $('#hiddenAvatar').val(res[0].avatar);
        }
    })
})
// 定义全局变量 用于存储id 
var userId;
$('tbody').on('click', '.edit', function () {
    // 保存当前被修改的这个用户的id
    userId = $(this).parents().attr('data-id');

    $('#userForm > h2').text('修改用户');
    // 先获取 当前被点击这个元素的祖先 叫tr 
    var trObj = $(this).parents('tr');
    // 获取图片的地址
    var imgSrc = trObj.children(1).children('img').attr('src');
    // 将图片的地址写入到隐藏域 
    $('#hiddenAvatar').val(imgSrc);

    if (imgSrc) {
        // 如果imgSrc有值 
        $('#preview').attr('src', imgSrc);
    } else {
        // 没有值就给一张默认的图片
        $('#preview').attr('src', "../assets/img/default.png");
    }


    // 将对应的内容写入到左边的输入框里面
    $('#email').val(trObj.children().eq(2).text());
    $('#nickName').val(trObj.children().eq(3).text());

    var status = trObj.children().eq(4).text();
    var role = trObj.children().eq(5).text();

    if (status == '激活') {
        $('#jh').prop('checked', true)
    } else {
        $('#wjh').prop('checked', true)
    }

    if (role == '超级管理员') {
        $('#admin').prop('checked', true);
    } else {
        $('#normal').prop('checked', true);
    }
    // 当我们点击编辑按钮时 将添加按钮隐藏 同时将修改按钮 显示出来 
    $("#userAdd").hide();
    $('#userEdit').show();
})
// 完成修改用户功能 
$('#userEdit').on('click', function () {
    // 我们需要发送ajax给服务器时 需要传递Id 
    $.ajax({
        type: 'put',
        url: '/users/' + userId,
        data: $('#userForm').serialize(),
        success: function (res) {
            // 我们只是将数据库里面的数据给修改 但是我们将userArr这个数组里面的元素给修改
            // 我们要从userArr这个数组中 将要修改这个数组元素找出来 
            var index = userArr.findIndex(item => item._id == userId);
            // 根据这个index找到数组的这个元素 将它的数据更新 
            userArr[index] = res;
            // 调用render方法 重新渲染页面 
            render(userArr);

            // 修改用户以后将表单数据还原
            $('#userForm > h2').text('添加新用户');
            $('#hiddenAvatar').val("");
            $('#preview').attr('src', "../assets/img/default.png");
            $('#userAdd').show();
            $('#userEdit').hide();
            $('#email').val("");
            $('#nickName').val("");
            $('#admin').prop('checked', false);
            $('#normal').prop('checked', false);
            $('#jh').prop('checked', false);
            $('#wjh').prop('checked', false);
        }
    })
})

// 删除一个用户功能
$('tbody').on('click', '.del', function () {
    if (window.confirm('你确定要删除吗')) {
        // 获取id
        var id = $(this).parent().attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function (res) {
                // 查询数组元素中的id 和 数据库返回数据的id 是否一致  相等就返回当前元素索引
                var index = userArr.findIndex(item => item._id == res._id);
                // 删除数组中的数据
                userArr.splice(index, 1);
                // 重新渲染页面
                render(userArr);
            }
        })
    }
})
// 正选反选 
$('thead input').on('click', function () {
    // 查询元素input 的选择状态  选中就是true
    var flag = $(this).prop('checked');
    // 让下面复选框和全选一致
    $('tbody input').prop('checked', flag);
    // 让删除多个按钮 显时和隐藏
    if (flag) {
        $('.btn-sm').show();
    } else {
        $('.btn-sm').hide();
    }

})
//复选按钮  
$('tbody').on('click', 'input', function () {
    // 如果input的总数量 等于 选中input 就激活全选按钮
    if ($('tbody input').length == $('tbody input:checked').length) {
        $('thead input').prop('checked', true);
    } else {
        $('thead input').prop('checked', false);
    }
    // 选中的input 大于 1 就显示 删除多个按钮
    if ($('tbody input:checked').length > 1) {
        $('.btn-sm').show();
    } else {
        $('.btn-sm').hide();
    }
})
// 删除多个
$('.btn-sm').on('click', function () {
    // 用于存储删除 的 id 
    var ids = [];
    // 返回选中状态的 表单控件
    var checkUser = $('tbody input:checked');

    // console.log(checkUser);
    
    checkUser.each(function (k, v) {
        // 获取id
        var id = v.parentNode.parentNode.children[6].getAttribute('data-id');
        // 把id放进数组
        ids.push(id);

        // console.log(id);
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function (res) {
                res.forEach(e=>{
                    var index = userArr.findIndex(item=>item._id == e._id);

                    userArr.splice(index,1);
                    
                    render(userArr);
                })
            }
        })

    })

})