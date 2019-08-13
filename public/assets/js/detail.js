var id = getUrl('id');
$.ajax({
    type:'get',
    url:'/posts/' + id,
    success:function(res){
        console.log(res);
        var datailHtml = template('datailTpl',res);

        $('.article').html(datailHtml)
    }
})