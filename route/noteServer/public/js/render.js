$.ajax({
    type: 'post',
    url: './getSidebar'
}).done(function (sidebar) {
    console.log(sidebar);
    options = {
        tocVisibleDepth: 4,
        disableSidebarToggle: true,
        sidebar,
        layout: 'wide',
        highlight: ['javascript', 'java', 'cpp', 'python', 'json', 'bash'],
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
        }]
    };
    new Docute(options);
});

