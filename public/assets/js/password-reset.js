
// 修改密码
$('#passForm').on('submit',function(){
    var formData = $(this).serialize();
    $.ajax({
        url:'/users/password',
        type:'put',
        data:formData,
        success:function(){
            location.href = '/admin/login.html'
        }
    })
    // 阻止表单默认行为
    return false;
})