

var id = getUrl('id');
// alert(id)

$.ajax({
    type:'get',
    url:'/posts/category/'+id,
    success:function(res){
        // console.log(res);
        
        var html = template('listTpl',{list:res});

        $('#listContent').append(html);
        
    }
})