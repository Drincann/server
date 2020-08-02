console.log(1);

(async function () {
    var data = {};

    var { postCount, draftCount } = await $.get('/ali/posts/count');
    var { commentCount, unapprovedCount } = await $.get('/ali/comments/count');

    data.categoryCount = (await $.get('/ali/categories/count')).categoryCount;
    data.postCount = postCount; data.draftCount = draftCount; data.commentCount = commentCount; data.unapprovedCount = unapprovedCount;

    $('#count').html(template('countTpl', data));

})()