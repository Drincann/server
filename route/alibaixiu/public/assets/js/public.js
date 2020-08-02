// 错误处理
function errHandler(err) {
    console.log(err);
    try {
        alert('错误：' + JSON.parse(err.responseText).message);
    } catch (error) {
        alert('错误：未知！' + JSON.parse(err.responseText).message);
    }
}

// 处理模板中的时间
function dateFormat(date) {
    return (new Date(date)).toLocaleString();
}

// randomTpl
var randomTpl = `
<h4>随机推荐</h4>
<ul class="body random">
    {{each}}
    <li>
        <a href="detail.html?_id={{$value._id}}">
            <p class="title">{{$value.title}}</p>
            <p class="reading">阅读({{$value.meta.views}})</p>
            <div class="pic">
                <img style="object-fit:cover;" src={{$value.thumbnail != ''  ? '/ali' + $value.thumbnail : '/ali/uploads/defaultPost.jpg'}} alt="">
            </div>
        </a>
    </li>
    {{/each}}
</ul>
`
// commentsTpl
var commentsTpl = `
<h4>最新评论</h4>
<ul class="body discuz">
    {{each}}
    <li>
        <a href="detail.html?_id={{$value.post}}">
            <div class="avatar">
                <img style="object-fit:cover;" src={{$value.author.avatar != '' ? '/ali' + $value.author.avatar : '/ali/assets/img/default.jpg'}} alt="">
            </div>
            <div class="txt">
                <p>
                    <span>{{$value.author.nickName}}</span>{{$imports.dateFormat($value.createAt)}}:
                </p>
                <p>{{$value.content}}</p>
            </div>
        </a>
    </li>
    {{/each}}
</ul>
`

// hotsTpl
hotsTpl = `
<h3>热门推荐</h3>
<ul>
    {{each}}
    <li>
        <a href="detail.html?_id={{$value._id}}">
            <img style="object-fit:cover;" src={{$value.thumbnail != ''  ? '/ali' + $value.thumbnail : '/ali/uploads/defaultPost.jpg'}} alt="">
            <span>{{$value.title}}</span>
        </a>
    </li>
    {{/each}}
</ul>
`;

// headerTpl
var navTpl = `
    {{each}}
    <li><a href="list.html?category={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
    {{/each}}
`
// logo
var logoTpl = `<img style="object-fit: cover;" src={{logo != '' ? '/ali' + logo : '/ali/assets/img/logo.png'}} alt="logo">`

// login
var loginTpl = `<li><a href={{link}}><i class="fa {{icon}}"></i>{{login}}</a></li>`
// 渲染
$(function () {
    // lobo
    $.get('/ali/settings').done(function (data) {
        $('#logo').html(template.render(logoTpl, data));
    });

    // login
    if (isLogin) {
        $('#login').html(template.render(loginTpl, { icon: 'fa-sign-out', login: '退出登录', link: 'javascript:;' })).on('click', 'a', function () {
            $.post('/ali/logout').done(function () {
                location.reload();
            }).fail(errHandler);
        });
    } else {
        $('#login').html(template.render(loginTpl, { icon: 'fa-sign-in', login: '登录', link: '/ali/admin/login.html' }));

    }

    // nav
    $.get('/ali/categories').done(function (data) {

        // 侧边栏
        $('#navBox').html(template.render(navTpl, data));
        // 顶部栏
        $('#topnavBox').html(template.render(navTpl, data));

    });




    // 随机推荐
    $.get('/ali/posts/random').done(function (data) {
        $('#randomBox').html(template.render(randomTpl, data));
    }).fail(errHandler);

    // 最新评论
    $.get('/ali/comments/lasted').done(function (data) {
        $('#commentsBox').html(template.render(commentsTpl, data));
    }).fail(errHandler);

    // 热门推荐
    $.get('/ali/posts/recommend').done(function (data) {
        $('#recommendBox').html(template.render(hotsTpl, data));
    }).fail(errHandler);


})

// 点赞
$(document).on('click', '.like', function () {
    var _id = $(this).attr('data-id');
    $.post('/ali/posts/fabulous/' + _id).done(function (data) {
        alert('点赞成功！')
        $(this).children('span').html(`赞(${data.meta.likes})`);
    }.bind(this)).fail(errHandler);



})

// 搜索
$('.search form').on('submit', function () {
    console.log(1);
    var key = $(this).children('.keys').val();
    location.href = 'search.html?key=' + key;
    return false;
})