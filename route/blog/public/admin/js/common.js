function serializeToJson(form) {
    var re = {};
    var data = form.serializeArray();
    for (item of data) {
        re[item.name] = item.value;
    };
    return re;
}