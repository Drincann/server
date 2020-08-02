function dblclick(elementSelector, childSelector, dblCallback, clickCallback = undefined) {
    var click = false;
    $(elementSelector).on('click', childSelector || '', function () {
        if (click) {
            // 双击
            click = false;
            dblCallback.bind(this)();
        } else {
            click = true;
            setTimeout(function () {
                if (click) {
                    // 单击
                    console.log(this);

                    click = false;
                    clickCallback && clickCallback.bind(this)();
                }
            }.bind(this), 200)
        }
    });
}
$(document).on('ajaxStart', function () {
    NProgress.start();
});
$(document).on('ajaxComplete', function () {
    NProgress.done();
});