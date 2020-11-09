renderInfo('请输入姓名并选择文件', 'alert-secondary');
renderCount();
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
    if (!(name && name.length <= 4 && name.length >= 2)) return renderInfo('姓名格式不规范', 'alert-danger'), state = 'done';;

    // 验证图片
    var screenshot = $('#upload')[0].files[0];
    if (screenshot) {
        if (screenshot.size > 1024 * 1024 * 5) {
            return renderInfo('图片大小不能超过 5 MB', 'alert-danger'), state = 'done';;
        }
    } else {
        return renderInfo('请选择欲上传的图片', 'alert-danger'), state = 'done';;
    }

    renderInfo('正在上传...', 'alert-secondary');
    // 设置提交数据
    var formData = new FormData();
    formData.append('screenshot', screenshot);
    formData.append('name', name)
    renderInfo('请耐心等待，正在上传...', 'alert-info');
    $.ajax({
        type: 'post',
        url: 'upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data) {
            renderInfo(data.message, 'alert-success');
            renderCount();
            state = 'done';
        },
        error: errHandler
    });

});

$('#query').on('click', function(e) {
    // 验证姓名
    var name = $('#name').val().trim();
    if (!(name && name.length <= 4 && name.length >= 2)) return renderInfo('姓名格式不规范', 'alert-danger'), state = 'done';;

    var src = './uploads/' + getTodayStr() + name + '.jpg';
    // 加载模态框
    isImgExists(src).then(function() {
        $('#uploadedImgModal').html(template('uploadedImgModalTpl', { name, src }));
        $('#uploadedImgModal').modal('show');
    }).catch(function() {
        renderInfo('该姓名今日尚未上传图片', 'alert-danger');
    });

})
$('#name').on('change', function(e) {
    $('#thumb').prop('src', );
});

function getTodayStr() {
    function getDouble(num) {
        return num <= 9 ? '0' + num : num;
    }
    var today = new Date;
    return '' + today.getFullYear() + getDouble(today.getMonth() + 1) + getDouble(today.getDate());
}

function renderInfo(infoText, classText) {
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

function renderCount() {
    $.ajax({
        type: 'get',
        url: 'submitCount',
        success: function(data) {
            $('#countBox').html(template('countTpl', { count: data.count }));
        },
        error: errHandler
    });
}

function isImgExists(url) {
    return new Promise(function(resolve, reject) {
        var img = new Image();
        img.src = url;
        img.on('load', function() {
            resolve();
        });
        img.on('error', function() {
            reject();
        });
    })
}



// 显示上传文件名
$('#upload').on('change', function(e) {
    $('#uploadLabel').html(this.files[0].name);
});