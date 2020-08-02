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
    var categoryId = getUrlParams('category');
    if (!categoryId) {
        errHandler({ responseText: JSON.stringify({ message: '参数无效' }) });
        return location.href = 'index.html';
    }
    $.get('/ali/posts/category/' + categoryId).done(function (data) {
        $('#listBox').html(template('listTpl', { list: data }));
    });


})