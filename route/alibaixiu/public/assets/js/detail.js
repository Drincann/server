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

// 渲染
$(function () {
    // 文章
    var postId = getUrlParams('_id');
    if (!postId) {
        errHandler({ responseText: JSON.stringify({ message: '参数无效' }) });
        return location.href = 'index.html';
    }

    $.get('/ali/posts/' + postId).done(function (data) {
        $('#articleBox').html(template('articleTpl', data));
    }).fail(errHandler);

    // 评论
    $.get('/ali/comments/' + postId).done(function (data) {
        $('#articleCommentsBox').html(template('articleCommentsTpl', data));
    }).fail(errHandler);

    // 评论框
    $.get('/ali/settings').done(function (data) {
        if (data.comment) {
            $('#submitCommentsBox').html(template('commentsTpl'));
        }
    });
});

// 评论
$('#submitCommentsBox').on('click', '#submit', async function () {
    if (isLogin) {
        var content = $(this).siblings('textarea').val();
        var post = getUrlParams('_id');
        try {
            var state = (await $.get('/ali/settings')).review ? 1 : 0;
        } catch (error) {
            var state = 0;
        }
        $.post('/ali/comments', { content, post, state }).done(function (data) {
            location.reload();
        }).fail(errHandler);
    } else {
        location.href = '/ali/admin/login.html';
    }

})
