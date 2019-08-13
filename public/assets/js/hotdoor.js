$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function (res) {
        // console.log(res);
        
        var hotHtml = `
        {{each list}}
        <li>
        <a href="javascript:;">
          <img src="{{$value.thumbnail}}" alt="">
          <span>{{$value.title}}</span>
        </a>
        </li>
        {{/each}}
        `
        var html = template.render(hotHtml,{list:res})

        $('#hotUl').html(html);
    }
})