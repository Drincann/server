$.ajax({
    // 请求笔记列表
    type: 'post',
    url: './getSidebar'
}).done(function (sidebar) {
    // plugin: 搜索 api，注册回调
    let searchPlugin = {
        name: 'searchPlugin',
        extend: (api) => {
            api.enableSearch({
                handler: key => {
                    if (!(key.trim())) {
                        return [];
                    }
                    return new Promise((resolve, reject) => {
                        $.ajax({
                            // 请求搜索接口
                            type: 'get',
                            url: './search',
                            data: {
                                key
                            },
                            success(data) {
                                resolve(data);
                            },
                            error(xhr) {
                                reject('请求 search 路由出错：');
                                console.error('请求 search 路由出错：');
                                console.error(xhr);
                            }
                        })
                    });
                }
            });
        }
    }
    // plugin: 页面刷新 api，用来刷新 valine 及渲染 mermaid
    let refreshValine = {
        name: 'refreshValine',
        extend(api) {
            api.onContentUpdated(() => {
                // 刷新 valine
                $(document).find('.leancloud_visitors').prop('id', location.href);
                new Valine({
                    el: '#vcomments',
                    appId: 'ik2aTAKBgdcRDvpwj25iFfk4-gzGzoHsz',
                    appKey: 'gz4c5n4iXKA08zMuXWD7AnnY',
                    path: window.location.href,
                    placeholder: '高厉害最近很不开心！',
                    visitor: true
                });

                // parse mermaid
                mermaid.init(undefined, '.mermaid');
            });
        },
    }

    // plugin: Marked 渲染器，用于替换 mermaid 标签的类名
    let onParseCode = {
        name: 'onParseCode',
        extend(api) {
            api.extendMarkedRenderer((render) => {
                let oldProcess = render.code.bind(render);
                render.code = function (code, language, n, i) {
                    if (code.match(/^sequenceDiagram/) || code.match(/^graph/)) {
                        // var graph = mermaid.mermaidAPI.render('graphDiv', code);
                        return '<div class="mermaid" >' + code + '</div>';
                    } else {
                        return oldProcess(code, language, n, i);
                    }
                };
            })
        }
    }


    let options = {
        tocVisibleDepth: 4,
        disableSidebarToggle: true,
        sidebar,
        layout: 'wide',
        highlight: ['javascript', 'java', 'cpp', 'python', 'json', 'bash', 'php', 'html', 'css', 'sql'],
        target: '#content',
        darkThemeToggler: true,
        title: '高厉害的笔记本',
        nav: [{
            title: '首页',
            link: '/'
        }, {
            title: '主站',
            link: 'https://gaolihai.top'
        }, {
            title: '知乎',
            link: 'https://www.zhihu.com/people/gao-jun-kang'
        }, {
            title: 'GitHub',
            link: 'https://github.com/GAOSILIHAI'
        }, {
            title: 'CSDN',
            link: 'https://blog.csdn.net/qq_16181837'
        }],
        plugins: [
            searchPlugin,
            refreshValine,
            onParseCode,
        ],
    };


    // Docute init
    new Docute(options);
    // 提供 valine 的容器
    $('#content .Content').append(`
    <hr>
    <div id="" class="leancloud_visitors" style="padding: 5px 10px; margin: 15px 0;text-align: center; background:rgba(0, 150, 136, .05); border-radius: 5px;">
        文章被点了
        <i class="leancloud-visitors-count" style="color: #009688;">loading...</i>
        次，高厉害却一点都不开心
    </div>
    <div id="vcomments"></div>
    `);

    // 由于 docute onContentUpdated 接口回调功能存在 bug，无法有效刷新渲染，这里两秒自动渲染一次
    setInterval(() => {
        // parse mermaid
        mermaid.init(undefined, '.mermaid');
    }, 2000);
});

