$.ajax({
    // 请求笔记列表
    type: 'post',
    url: './getSidebar'
}).done(function (sidebar) {
    // 搜索 api，注册回调
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
    // 页面刷新 api，用来刷新 valine
    let refreshValine = {
        name: 'refreshValine',
        extend(api) {
            console.log(location.href);
            api.onContentUpdated(() => {
                new Valine({
                    el: '#vcomments',
                    appId: 'ik2aTAKBgdcRDvpwj25iFfk4-gzGzoHsz',
                    appKey: 'gz4c5n4iXKA08zMuXWD7AnnY',
                    path: window.location.href
                });
            });
        },
    }

    let options = {
        tocVisibleDepth: 4,
        disableSidebarToggle: true,
        sidebar,
        layout: 'wide',
        highlight: ['javascript', 'java', 'cpp', 'python', 'json', 'bash', 'php', 'html', 'css'],
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
            refreshValine
        ],
    };


    // Docute init
    new Docute(options);
    // 提供 valine 的容器
    $('#content .Content').append(`
    <div id="vcomments"></div>
    `);
});

