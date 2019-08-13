$.ajax({
    type:'get',
    url:'/posts/lasted',
    success:function(res){
       // console.log(res);
        var html = template('newTpl',{list:res});

        $('#newpnb').append(html);
    }
})

