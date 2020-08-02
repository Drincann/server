// 错误处理
function errHandler(err) {
    console.log(err);
    try {
        $('#infoBox').html(template('infoTpl', { info: JSON.parse(err.responseText).message }));
    } catch (error) {
        $('#infoBox').html(template('infoTpl', { info: '未知错误！' }));
    }
}

// 获取 query 参数
function getUrlParams(param) {
    var params = location.search.slice(1).split('&');
    if (params == '') return null;
    var obj = {};
    $.each(params, function (index, item) {
        var [key, value] = item.split('=');
        obj[key] = value;
    });
    if (param) {
        var { [param]: re } = obj;
        return re;
    }
    return obj;
}

var simplemde = undefined;
// simpleMDE
function renderSimplemde() {
    simplemde = new SimpleMDE({
        element: document.getElementById('textArea'),
        renderingConfig: {
            codeSyntaxHighlighting: true
        },
        // autofocus: true,
        placeholder: 'Markdown supported!',
        autoDownloadFontAwesome: false,

    });
    function getText(fileName) {
        return (simplemde.value().indexOf('<style>p img {width: 70%;}</style>') == -1 ? '<style>p img {width: 70%;}</style>\n' : '') + '![图片描述](/ali' + fileName.split('\\').join('/') + ')\n';
    }
    var options = {
        uploadUrl: '/ali/upload',               //后端上传图片地址
        uploadFieldName: 'img',          //上传的文件名
        jsonFieldName: 'img',              //返回结果中图片地址对应的字段名称
        progressText: '![图片上传中...]()',    //上传过程中用户看到的文案
        errorText: '图片上传失败',
        urlText: getText,    //上传成功后插入编辑器中的文案，{filename} 会被替换成图片地址
        // extraHeaders: {
        //     'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        // },
    };
    inlineAttachment.editors.codemirror4.attach(simplemde.codemirror, options);
}


// 渲染
$(function () {
    $.get('/ali/categories').done(function (categories) {
        // modify or add
        var _id = getUrlParams('_id');
        if (_id) {
            // modify
            $.get('/ali/posts/' + _id).done(function (data) {
                data.categories = categories;
                $('#addForm').replaceWith(template('modifyTpl', data));
                renderSimplemde();
            }).fail(errHandler);

        } else {
            // add
            $('#category').html(template('categoryTpl', categories));
            renderSimplemde();
        }

    }).fail(errHandler);
});

// modify 表单提交
$(document).on('submit', '#modifyForm', function () {

    var _id = $(this).attr('data-id');
    // markdown --> html 
    var md = simplemde.value();
    var html = simplemde.markdown(md);
    $('#content').val(html);
    $('#md').val(md);

    $.ajax({
        type: 'put',
        url: '/ali/posts/' + _id,
        data: $(this).serialize(),
        success: function (data) {
            location.href = 'posts.html';
        },
        error: errHandler
    })
    return false;

});

// 文章封面上传
$(document).on('change', '#feature', function () {
    var formData = new FormData();
    formData.append('cover', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/ali/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            // 给隐藏表单添加 value
            $('#thumbnail').val(data['cover']);
            $('#preview').prop('src', '/ali' + data['cover']).css('display', 'block');
        },
        error: errHandler
    });

});

// 添加文章提交
$('#addForm').on('submit', function () {
    // markdown --> html 
    var md = simplemde.value();
    var html = simplemde.markdown(md);
    $('#content').val(html);
    $('#md').val(md);
    // formData
    var formData = $(this).serialize();
    // post
    $.post('/ali/posts', formData).done(function (data) {
        location.href = 'posts.html';
    }).fail(errHandler);
    return false;
})

