// 错误处理
function errHandler(err) {
    console.log(err);
    try {
        $('#infoBox').html(template('infoTpl', { info: JSON.parse(err.responseText).message }));
    } catch (error) {
        $('#infoBox').html(template('infoTpl', { info: '未知错误！' }));
    }
}

$('#modifyForm').on('submit', function () {
    $.ajax({
        type: 'put',
        url: '/ali/users/password',
        data: $(this).serialize(),
        success: function (data) {
            location.reload();
        },
        error: errHandler
    });
    return false;
});
