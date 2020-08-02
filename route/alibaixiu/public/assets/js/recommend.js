// 错误处理
function errHandler(err) {
    console.log(err);
    try {
        alert('错误：' + JSON.parse(err.responseText).message);
    } catch (error) {
        alert('错误：未知！' + JSON.parse(err.responseText).message);
    }
}

