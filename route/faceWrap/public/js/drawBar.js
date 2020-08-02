function drawBar(canvas, image, barH, callback) {
    var context = canvas.getContext('2d');
    // 栏的 css 高度
    var barCssH = barH;

    // 确定图片 css 的高度 
    var cavCssW = $(canvas).width();
    // 确定图片缩放比例
    var scale = cavCssW / image.width;
    // 确定图片 css 的宽度
    var cavCssH = image.height * scale + barCssH;
    $(canvas).css({ width: cavCssW, height: cavCssH });

    // 栏的实际高度
    var barRealH = barCssH / scale;

    // 确定图片实际宽度
    var cavRealW = image.width;
    // 确定图片实际高度
    var cavRealH = image.height + barRealH;
    canvas.width = cavRealW;
    canvas.height = cavRealH;

    // 图片 css 高度
    var imgCssW = image.width * scale;
    var imgCssH = image.height * scale;

    // 图片实际高度
    var imgRealW = image.width;
    var imgRealH = image.height;
    // 填充白色背景
    context.fillStyle = '#fff'
    context.fillRect(0, 0, cavRealW, cavRealH)

    // // 填充 bar 的渐变背景
    // // 获取渐变对象
    // var linearGradient = context.createLinearGradient(0, 0, imgRealW, cavRealH);
    // // 添加渐变颜色
    // linearGradient.addColorStop(0, '#ccc');
    // linearGradient.addColorStop(1, '#fff');
    // context.fillStyle = linearGradient;
    // context.fillRect(0, imgRealH, imgRealW, barRealH);
    // 画图片
    context.drawImage(image, 0, 0, imgRealW, imgRealH);
    // 绘制字体
    context.fillStyle = '#000'; context.font = 14 / scale + 'px google'; context.textBaseline = 'top';
    context.fillText('计算机科学与技术专业留念', 10 / scale, imgRealH + 10 / scale);
    context.fillText('河北农业大学  2020 年 6 月', 10 / scale, imgRealH + 32 / scale);
    // 绘制徽章
    var canvasScale = scale;
    var badge = new Image(); badge.src = '/faceWrap/img/faceWLogo.jpg';

    badge.onload = function () {
        var scale = barRealH / this.height;
        var badgeW = this.width * scale;
        var badgeH = this.height * scale;
        context.drawImage(this, cavRealW - badgeW, cavRealH - badgeH, badgeW, badgeH);
        // 画 bar 与图片的分隔线
        drawLine([0, imgRealH + 1], [imgRealW, imgRealH + 1], 1 / canvasScale, '#c0c0c0');
        callback();
    }
    function drawLine(start, end, width, color) {
        context.save();
        // 画 bar 与图片的分隔线
        context.strokeStyle = color;
        context.lineWidth = width;
        // 开始绘制
        context.beginPath();
        //设置绘制起点
        context.moveTo(start[0], start[1]);
        //设置绘制下一个点
        context.lineTo(end[0], end[1]);
        //结束绘制
        context.closePath();
        context.stroke()
        context.restore()
    }

}
