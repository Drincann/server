// 获取模板列表
$.get('/faceWrap/tplList').done(function (data) {
    $('#faceList').html(template('faceListTpl', data.templateArr));
    $('#faceList').children().eq(0).trigger('click');
}).fail(errHandler)

// 模板列表 js 实现
var startX = 0;
var moveX = 0
var startScrollLeft = 0;
$('.face-list').on('touchstart', function (e) {
    startX = e.originalEvent.changedTouches[0].pageX;
    startScrollLeft = $(".face-list").scrollLeft();
})
$('.face-list').on('touchmove', function (e) {
    e.preventDefault();
    var list = $(".face-list");
    moveX = e.originalEvent.changedTouches[0].pageX - startX;
    list.scrollLeft(startScrollLeft - moveX)
})
// 切换类-动画
$(".face-list").on('click', '.face-item', function () {
    $(".face-item-active").prop('class', 'face-item');
    $(this).prop('class', 'face-item-active');
});


// #result 图与左侧同步
$('#facePreview').on('load', function () {
    $('#result').css({ 'width': $('#facePreview').css('width'), 'height': $('#facePreview').css('height') })
})
$(window).on('resize', function () {
    +-+
        $('#result').css({ 'width': $('#facePreview').css('width'), 'height': $('#facePreview').css('height') })
})

// 模板图切换
$('.face-list').on('click', '.face-item', function (e) {
    var selected = $(this).find('img');
    $('#facePreview').prop('src', selected.prop('src'));
})

// 节流阀
// 两个状态 done 及 loading，loading 时在 #upload 的 change 回调中禁止访问
var state = 'done';
// 图片触发 file click
$('#result').click(function (e) {
    e.preventDefault();
    if (state == 'loading') return;
    $('#upload').trigger('click')
})

// 图片改变后访问接口
$('#upload').on('change', function () {
    // 节流阀
    if (state == 'loading') return;

    // 验证图片
    if (this.files[0]) {
        if (this.files[0].size > 1024 * 1024 * 2) {
            return alert('图片大小不能超过 2mb ')
        }
    } else {
        return;
    }

    // 节流阀开启限制
    state = 'loading';

    // 提示信息
    info('请耐心等待 5s ~ 20s', 'alert-info');
    $('#loading').fadeIn();


    // 设置提交数据
    var formData = new FormData();
    formData.append('cover', this.files[0]);
    formData.append('index', $('#faceList').find('.face-item-active').attr('data-index'))

    // #upload 图片改成 default
    $('#result').prop('src', './uploads/default.png');

    // ajax request
    $.ajax({
        type: 'post',
        url: '/faceWrap',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            // 成功后等待图片 loaded 后回调
            $('#result').prop('src', data['img']).one('load', function () {
                // 开放节流阀
                state = 'done';

                // 提示信息
                $('#loading').fadeOut();
                info('长按图片保存', 'alert-success');

                // 判断 pc端 还是 移动端
                if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
                    //移动端
                    // 注册回调
                    $('#shareBox').children().children().on('click', getShareCall({
                        icon: data['img'],
                        link: 'https://gaolihai.top/faceWrap',
                        title: '河北农业大学',
                        desc: '制作毕业照',
                        from: 'from',
                    }));
                } else {
                    //pc端
                    setShareInfo($('#shareBox').children().children(), {
                        url: 'https://gaolihai.top/faceWrap',
                        title: '河北农业大学',
                        desc: '制作毕业照',
                        summary: '制作毕业照',
                        source: 'faceWrap@gaolihai',
                        image: data['img'],
                    });

                }

                // 加载模态框
                $('#shareModal').modal('show').one('shown.bs.modal', function () {
                    var image = new Image(); image.src = $('#result').prop('src');
                    var canvas = $('#shareCanvas')[0];
                    $(image).one('load', function () {
                        drawBar(canvas, image, 50, function () {
                            var base64 = canvas.toDataURL('image/jpeg');
                            $('#shareImg').prop('src', base64);
                        });
                    });
                });
            });
        },
        error: function (err) {
            $('#loading').fadeOut();
            errHandler(err)
            state = 'done';
        }
    });
})



// 工具封装

// 提示
function info(infoText, classText) {
    $('#infoBox').html(template('infoTpl', { infoText, classText }))
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
}

// pc 端分享 - 置分享信息
function setShareInfo(ele, option = { url: location.href, title: document.title, desc: '', summary: '', source: '', image: '', weibokey: '' }) {
    var link = $(ele).prop('href')
    if (!link) {
        return;
    }
    for (key in option) {
        link = link.replace('{{' + key + '}}', option[key]);
    }
    $(ele).prop('href', link);
}

// 移动端分享
// 这里两层层闭包分别为
// 1. 初始化 share 对象
// 2. 传入一个特定的 options，用于返回闭包函数被回调时的参数
window.getShareCall = (function () {
    window.nativeShare = new NativeShare();

    // 调用这一层返回一个用于回调的函数
    return function (options) {
        return function (e) {
            // 因为照顾 pc 端的分享功能，该 a 标签有 href 属性，所以必须阻止默认跳转行为
            e.preventDefault();
            nativeShare.call($(this).attr('data-target'), options);
        }
    }
})()