// 错误处理
function errHandler(err) {
    console.log(err);
    try {
        alert('错误：' + JSON.parse(err.responseText).message);
    } catch (error) {
        alert('错误：未知！' + JSON.parse(err.responseText).message);
    }
}

// 处理模板中的时间
function dateFormat(date) {
    return (new Date(date)).toLocaleString();
}

// 渲染
$(function () {
    // 轮播图
    $.get('/ali/slides').done(function (data) {
        $('#swipeBox').html(template('swipeTpl', data));
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 4000,
            callback: function (index) {
                // index++;
                var span = $('.cursor span');
                span.eq(index % span.length).addClass('active').siblings('.active').removeClass('active');
            }
        });
        // 上/下一张
        $('.swipe .arrow').on('click', function () {
            var _this = $(this);
            if (_this.is('.prev')) {
                swiper.prev();
            } else if (_this.is('.next')) {
                swiper.next();
            }
        });

    }).fail(errHandler);

    // 最新发布
    $.get('/ali/posts/lasted').done(function (data) {
        $('#newBox').html(template('newTpl', data))
    }).fail(errHandler);

    // 随机推荐


})