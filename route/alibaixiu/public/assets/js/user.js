function errHandler(err) {
    console.log(err);
    try {
        $('#infoBox').html(template('infoTpl', { info: JSON.parse(err.responseText).message }));
    } catch (error) {
        $('#infoBox').html(template('infoTpl', { info: '未知错误！' }));
    }
}



// 渲染列表
$(function () {
    $.get('/ali/users').done(function (data) {
        $('#userlist').html(template('userTpl', { users: data }));
    }).fail(errHandler);
})

// 创建表单提交
$('#userForm').on('submit', function () {
    var formData = $(this).serialize();
    $.post('/ali/users', formData, 'json').done(function (data) {
        location.reload(true);
    }).fail(errHandler);
    return false;
});

// 头像上传
$('#formBox').on('change', '#avatar', function () {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/ali/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            $('#preview').attr('src', '/ali' + data.avatar);
            $('#hiddenAvatar').val(data.avatar);
        },
        error: errHandler
    });
});

// 编辑按钮
$('#userlist').on('click', '.edit', function () {
    var _id = $(this).attr('_id');
    $.get('/ali/users/' + _id, function (data) {
        console.log(data);
        $('#formBox').html(template('editTpl', data))
    }).fail(errHandler);
})

// 修改表单提交
$('#formBox').on('submit', '#modifyForm', function () {
    var formData = $(this).serialize();
    var _id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/ali/users/' + _id,
        data: formData,
        success: function (data) {
            // console.log(data);

            location.reload(true);
        },
        error: errHandler
    })
    return false;
});

// 删除用户
$('#userlist').on('click', '.delete', function () {
    var _id = $(this).attr('_id')

    if (confirm('确认删除用户？')) {
        $.ajax({
            type: 'delete',
            url: '/ali/users/' + _id,
            success: function (data) {
                location.reload();
            },
            error: errHandler
        })
    }

})


// 全选-选择逻辑
$('#selectAll').on('change', function () {
    var total = $('#userlist').find('input');
    total.prop('checked', $(this).prop('checked'));
    if ($(this).prop('checked')) {
        $('#deleteMany').css('visibility', 'visible');
    } else {
        $('#deleteMany').css('visibility', 'hidden');
    }
});
$('#userlist').on('change', 'input', function () {
    var total = $('#userlist').find('input');
    var selected = total.filter(':checked');
    // 批量删除按钮逻辑
    if (selected.length != 0) {
        $('#deleteMany').css('visibility', 'visible');
    } else {
        $('#deleteMany').css('visibility', 'hidden');
    }
    // 触发全选逻辑
    if (total.length == selected.length) {
        $('#selectAll').prop('checked', true);
    } else {
        $('#selectAll').prop('checked', false);
    }
});


// 批量删除
$('#deleteMany').on('click', function () {
    if (!confirm('确认批量删除用户？')) {
        return;
    }
    var ids = [];
    var select = $('#userlist').find('input').filter(':checked');
    select.each(function (index, item) {
        ids.push($(item).attr('_id'));
    });
    $.ajax({
        type: 'delete',
        url: '/ali/users/' + ids.join('-'),
        success: function (data) {
            location.reload();
        },
        error: errHandler
    })
});
