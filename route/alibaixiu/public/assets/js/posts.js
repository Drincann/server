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

// 获取 query
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


// query 字符串转换
var toQueryString = function () {
    function recursive(value, key) {
        var queryStr = '';
        if (typeof value != 'object')
            // normal
            queryStr += key + '=' + value + '&';
        else
            // obj or array
            for (var item in value)
                queryStr += key == undefined ? recursive(value[item], item) : recursive(value[item], key + '[\'' + item + '\']');
        return queryStr;
    }
    return function (value) {
        return recursive(value).slice(0, -1);
    }
}();

// 切换页
function changePage(page) {
    filter.page = page;
    $.get('/ali/posts', { page, category: filter.category, state: filter.state }).done(function (data) {
        $('#posts').html(template('postsTpl', data));
        $('#page').html(template('pageTpl', data));
    }).fail(errHandler);
}


// 渲染数据
// 全局筛选条件
var filter = getUrlParams();
$(function () {
    // posts page
    $.get('/ali/posts', filter).done(function (data) {
        $('#posts').html(template('postsTpl', data))
        $('#page').html(template('pageTpl', data))
    }).fail(errHandler);
    // category
    $.get('/ali/categories').done(function (data) {
        console.log(data);
        $('#categories').html(template('categoriesTpl', { categories: data }));
    }).fail(errHandler);
});


// 筛选表单提交
$('#filter').on('submit', function () {
    // 更改全局筛选条件
    var formData = $(this).serializeArray();
    $.each(formData, function (index, item) {
        filter[item.name] = item.value;
    });
    $.get('/ali/posts', $(this).serialize()).done(function (data) {
        $('#posts').html(template('postsTpl', data))
        $('#page').html(template('pageTpl', data))
    }).fail(errHandler);
    return false;
});

// 删除文章
$('#posts').on('click', '.delete', function () {
    if (confirm('确认删除文章？')) {
        var _id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/ali/posts/' + _id,
            success: function (data) {
                location.href = 'posts.html?' + toQueryString(filter);
            },
            error: errHandler
        });
    }
})