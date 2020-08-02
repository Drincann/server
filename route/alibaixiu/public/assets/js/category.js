var infoBox = $('#infoBox');
function errHandler(err) {
    console.log(err);
    infoBox.html(template('infoTpl', { info: JSON.parse(err.responseText).message }));
}

$('#addCategory').on('submit', function () {
    $.post('/ali/categories', $(this).serialize()).done(function (data) {
        // console.log(data);
        location.reload();
    }).fail(errHandler);
    return false;
})

// 渲染列表
$(function () {
    $.get('/ali/categories').done(function (categories) {
        $('#categorylist').html(template('categoryTpl', { categories }))
    }).fail(errHandler);
});

// 编辑
$('#categorylist').on('click', '.edit', function () {
    var _id = $(this).attr('_id');
    $.get('/ali/categories/' + _id).done(function (category) {
        $('#formBox').html(template('editTpl', { category }));
    }).fail(errHandler);
});

// 编辑提交
$('#formBox').on('submit', '#modifyCategory', function () {
    var _id = $(this).attr('_id');
    $.ajax({
        type: 'put',
        url: '/ali/categories/' + _id,
        data: $(this).serialize(),
        success: function (data) {
            location.reload();
        },
        error: errHandler
    });
    return false;
});

// 删除
$('#categorylist').on('click', '.delete', function () {
    if (!confirm('确认删除分类？')) {
        return;
    }
    var _id = $(this).attr('_id');
    $.ajax({
        type: 'delete',
        url: '/ali/categories/' + _id,
        success: function (data) {
            location.reload();
        },
        error: errHandler
    });
});


var deleteMany = $('#deleteMany');
// 多选逻辑
$('#selectAll').on('change', function () {
    if ($(this).prop('checked')) {
        $('#categorylist').find('input').prop('checked', true);
        deleteMany.css('visibility', 'visible');
    } else {
        $('#categorylist').find('input').prop('checked', false);
        deleteMany.css('visibility', 'hidden');
    }
});

$('#categorylist').on('change', 'input', function () {
    var total = $('#categorylist').find('input');
    var selected = total.filter(':checked');
    if (selected.length != 0) {
        deleteMany.css('visibility', 'visible');
    } else {
        deleteMany.css('visibility', 'hidden');
    }
    if (total.length == selected.length) {
        $('#selectAll').prop('checked', true);
    } else {
        $('#selectAll').prop('checked', false);
    }
})

// 多选删除
deleteMany.on('click', function () {
    if (!confirm('确认批量删除分类？')) {
        return;
    }
    var ids = [];
    $('#categorylist').find(':checked').each(function (index, item) {
        ids.push($(item).attr('_id'));
    });
    $.ajax({
        type: 'delete',
        url: '/ali/categories/' + ids.join('-'),
        success: function (data) {
            location.reload();
        },
        error: errHandler
    });
})
