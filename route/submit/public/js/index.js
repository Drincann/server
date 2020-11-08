setInfo('请输入姓名并选择文件', 'alert-secondary');

// 节流阀
// 两个状态 done 及 loading，loading 时在 #upload 的 change 回调中禁止访问
var state = 'done';
$('#submit').click(function(e) {
    e.preventDefault();
    // 节流阀
    if (state == 'loading') return state = 'done';
    // 节流阀开启限制
    state = 'loading';

    // 验证姓名
    var name = $('#name').val().trim();
    if (!(name && name.length <= 4 && name.length >= 2)) return setInfo('姓名格式不规范', 'alert-danger'), state = 'done';;

    // 验证图片
    var screenshot = $('#upload')[0].files[0];
    if (screenshot) {
        if (screenshot.size > 1024 * 1024 * 5) {
            return setInfo('图片大小不能超过 5 MB', 'alert-danger'), state = 'done';;
        }
    } else {
        return setInfo('请选择欲上传的图片', 'alert-danger'), state = 'done';;
    }

    setInfo('正在上传...', 'alert-secondary');
    // 设置提交数据
    var formData = new FormData();
    formData.append('screenshot', screenshot);
    formData.append('name', name)
    setInfo('请耐心等待，正在上传...', 'alert-info');
    $.ajax({
        type: 'post',
        url: 'upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data) {
            setInfo(data.message, 'alert-success');
            state = 'done';
        },
        error: errHandler
    });

});


function setInfo(infoText, classText) {
    $('#infoBox').html(template('infoTpl', { infoText, classText }));
    $('#info').fadeIn();
}

// 错误处理
function errHandler(err) {
    try {
        $('#infoBox').html(template('infoTpl', { infoText: JSON.parse(err.responseText).message || '未知错误', classText: 'alert-danger' }))
    } catch (error) {
        $('#infoBox').html(template('infoTpl', { infoText: err.responseText || '未知错误', classText: 'alert-danger' }))

    }
    $('#info').fadeIn();
    state = 'done';
}

// 显示上传文件名
$('#upload').on('change', function(e) {
    $('#uploadLabel').html(this.files[0].name);
});