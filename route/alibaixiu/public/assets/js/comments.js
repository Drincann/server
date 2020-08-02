// 错误处理
function errHandler(err) {
    console.log(err);
    try {
        $('#infoBox').html(template('infoTpl', { info: JSON.parse(err.responseText).message }));
    } catch (error) {
        $('#infoBox').html(template('infoTpl', { info: '未知错误！' }));
    }
}

// 处理模板中的时间
function dateFormat(date) {
    return (new Date(date)).toLocaleString();
}

// 获取 query 参数
function getUrlParams(param) {
    var params = location.search.slice(1).split('&');
    if (params == '') return null;
    var obj = {};
    $.each(params, function (index, item) {
        var [key, value] = item.split('=');
        obj[key] = value;
    });
    if (param) {
        var { [param]: re } = obj;
        return re;
    }
    return obj;
}

// 切换页
function changePage(page) {
    $.get('/ali/comments', { page }).done(function (comments) {
        $('#commentsBox').html(template('commentsTpl', comments));
        $('#page').html(template('pageTpl', comments))
        globalPage = page;
    }).fail(errHandler);
}

// 渲染
// 全局页数
var globalPage = getUrlParams('page');
$(function () {
    $.get('/ali/comments', { page: getUrlParams('page') }).done(function (comments) {
        $('#commentsBox').html(template('commentsTpl', comments));
        $('#page').html(template('pageTpl', comments))
    }).fail(errHandler);
});

// 删除
$('#commentsBox').on('click', '.delete', function () {
    var _id = $(this).attr('data-id');
    $.ajax({
        type: 'delete',
        url: '/ali/comments/' + _id,
        success: function (data) {
            location.href = 'comments.html?page=' + globalPage;
        },
        error: errHandler
    })
})
// 批准
$('#commentsBox').on('click', '.approve', function () {
    var _id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/ali/comments/' + _id,
        data: { state: 1 },
        success: function (data) {
            location.href = 'comments.html?page=' + globalPage;
        },
        error: errHandler
    })
});
// 驳回
$('#commentsBox').on('click', '.turnDown', function () {
    var _id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/ali/comments/' + _id,
        data: { state: 0 },
        success: function (data) {
            location.href = 'comments.html?page=' + globalPage;
        },
        error: errHandler
    })
});

// }).fail(errHandler);
// for (i in [...new Array(10).keys()]) {
//     var content = '评论测试' + (i - 0 + 10),
//         post = '5e980c90b02de44ccc25758b',
//         state = 1;
//     $.post('/ali/comments', { content, post, state }).done(function (data) {
//         console.log(data);

//     }).fail(errHandler);
// }