
var pAll = [];
// 获取文章数据
$.ajax({
    type:'get',
    url:'/posts',
    success:function(res){
        // console.log(res);
        console.log(res);
        
        pAll.push(res);
       var html = template('psTpl',res);
       // console.log(html);
    
       $('tbody').html(html);
    }
})
// 格式化时间
function formateDate(time){
    time = new Date(time);
    return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
}
