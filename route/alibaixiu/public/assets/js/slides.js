// 错误处理
function errHandler(err) {
    console.log(err);
    try {
        $('#infoBox').html(template('infoTpl', { info: JSON.parse(err.responseText).message }));
    } catch (error) {
        $('#infoBox').html(template('infoTpl', { info: '未知错误！' }));
    }
}

// 渲染
$(function () {
    $.get('/ali/slides').done(function (data) {
        $('#slidesBox').html(template('slidesTpl', data));
    }).fail(errHandler);

});

// 图片上传
$('#file').on('change', function () {
    var formData = new FormData();
    formData.append('background', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/ali/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            var fileName = data['background'];
            $('#preview').prop('src', '/ali' + fileName).on('load', function () {
                $(this).css('display', 'block');
            });
            $('#image').val(fileName);
        },
        error: errHandler,
    });
});

// 表单提交
$('#slidesForm').on('submit', function () {
    var formData = $(this).serialize();
    $.post('/ali/slides', formData).done(function (data) {
        location.reload();
    }).fail(errHandler);
    return false;
});

$('#slidesBox').on('click', '.delete', function () {
    if (confirm('确认删除轮播图？')) {
        var _id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/ali/slides/' + _id,
            success: function (data) {
                location.reload();
            },
            error: errHandler
        });
    }
});