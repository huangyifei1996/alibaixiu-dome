
var key = getUrl('key');

$.ajax({
    type:'get',
    url:'/posts/search/' + key,
    success:function(res){
        console.log(res);
        
        var html = template('searchTpl',{list:res});

        $('#searchContent').html(html);
    }
})