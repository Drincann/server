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
    $.get('/ali/settings').done(function (data) {
        console.log(data);

        $('#settingsForm').html(template('settingsTpl', data));
    }).fail(errHandler);
});

// 表单提交
$('#settingsForm').on('submit', function () {
    var formData = $(this).serialize();
    $.post('/ali/settings', formData).done(function (data) {
        location.reload();
    }).fail(errHandler);
    return false;
})
// 图片上传
$('#settingsForm').on('change', '#logoFile', function () {
    var formData = new FormData();
    formData.append('logo', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/ali/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            var logoName = data['logo'];
            console.log(data);
            $('#logoImg').prop('src', '/ali' + logoName);
            $('#logoHidden').val(logoName);
        },
        error: errHandler
    });

});