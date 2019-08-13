

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


//随机推荐
$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function (res) {
        // console.log(res);

        var randomHTML = `
        {{each list}}
        <li>
        <a href="/detail.html?id={{$value._id}}">
          <p class="title">{{$value.title}}</p>
          <p class="reading">阅读({{$value.meta.views}})</p>
          <div class="pic">
            <img src="{{$value.thumbnail}}" alt="">
          </div>
        </a>
      </li>
      {{/each}}
        `;
        var html = template.render(randomHTML, { list: res });

        $('#randomUl').html(html);
    }
})

//导航栏
$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
        var navHtml = `
        {{each list}}
        <li>
            <a href="/list.html?id={{@$value._id}}">
                <i class="fa {{$value.className}}"></i>{{$value.title}}
            </a>
        </li>
        {{/each}}
        `;
        var html = template.render(navHtml,{list:res});
        $('.navTpl').html(html);
    }
})


// 搜索

$('.search form').on('submit',function(){
    var keys = $(this).find('.keys').val();
    
    location.href = '/search.html?key=' + keys;

    return false;
})