$('#logout').on('click', function () {
    if (confirm('是否退出登录？')) {
        $.post('/ali/logout').done(function (data) {
            location.href = '/ali/admin/login.html';
        }).fail(function (err) {
            alert('错误：' + err.status)
        })
    }
});

// 渲染侧边栏
$(function () {
    $.get('/ali/users/' + userId).done(function (data) {
        $('.name').html(data.nickName);
        data.avatar && $('.avatar').prop('src', '/ali' + data.avatar);
    })
})