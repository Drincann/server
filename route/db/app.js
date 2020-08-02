const path = require('path');
require(path.join(__dirname, 'model', 'index.js'));
const User = require(path.join(__dirname, 'model', 'user.js'));
const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
// POST body 处理中间件
router.use(bodyParser.urlencoded({ extended: false }));

router.get(['/list', '/'], async (req, res) => {
    res.send(getListHtml(await User.find().sort({ _id: 1 })));
})

router.get('/add', (req, res) => {
    let add = `
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
      <meta charset="UTF-8">
      <title>用户列表</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
  </head>
  <body>
      <div class="container">
          <h3>添加用户</h3>
          <form action="/db/add" method="POST">
            <div class="form-group">
              <label>用户名</label>
              <input name="name" type="text" class="form-control" placeholder="请填写用户名">
            </div>
            <div class="form-group">
              <label>密码</label>
              <input name="password" type="password" class="form-control" placeholder="请输入密码">
            </div>
            <div class="form-group">
              <label>年龄</label>
              <input name="age" type="text" class="form-control" placeholder="请填写年龄">
            </div>
            <div class="form-group">
              <label>邮箱</label>
              <input name="email" type="email" class="form-control" placeholder="请填写邮箱">
            </div>
            <div class="form-group">
              <label>请选择爱好</label>
              <div>
                  <label class="checkbox-inline">
                    <input type="checkbox" value="足球" name="hobbies"> 足球
                  </label>
                  <label class="checkbox-inline">
                    <input type="checkbox" value="篮球" name="hobbies"> 篮球
                  </label>
                  <label class="checkbox-inline">
                    <input type="checkbox" value="橄榄球" name="hobbies"> 橄榄球
                  </label>
                  <label class="checkbox-inline">
                    <input type="checkbox" value="敲代码" name="hobbies"> 敲代码
                  </label>
                  <label class="checkbox-inline">
                    <input type="checkbox" value="抽烟" name="hobbies"> 抽烟
                  </label>
                  <label class="checkbox-inline">
                    <input type="checkbox" value="喝酒" name="hobbies"> 喝酒
                  </label>
                  <label class="checkbox-inline">
                    <input type="checkbox" value="烫头" name="hobbies"> 烫头
                  </label>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">添加用户</button>
          </form>
      </div>
  </body>
  </html>    
  `
    res.send(add);
})

router.get('/modify', async (req, res) => {
    res.send(getUserHtml(await User.findOne({
        _id: req.query._id
    })));
})

router.get('/remove', async (req, res) => {
    await User.findByIdAndDelete(req.query._id);
    res.writeHead(301, {
        Location: '/db/list'
    });
    res.send();
})
router.post('/add', async (req, res) => {
    await User.create(req.body);
    res.writeHead(301, {
        Location: '/db/list'
    });
    res.send();
})

router.post('/modify', async (req, res) => {
    await User.updateOne({ _id: req.query._id }, req.body);
    res.writeHead(301, {
        Location: '/db/list'
    });
    res.send();

})


function getUserHtml(user) {
    let modify = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title>用户列表</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
    </head>
    <body>
        <div class="container">
            <h3>修改用户信息</h3>
            <form action="/db/modify?_id=${user._id}" method="POST">
              <div class="form-group">
                <label>用户名</label>
                <input name="name" type="text" class="form-control" placeholder="请填写用户名" value="${user.name}">
              </div>
              <div class="form-group">
                <label>密码</label>
                <input name="password" type="password" class="form-control" placeholder="请输入密码" value="${user.password}">
              </div>
              <div class="form-group">
                <label>年龄</label>
                <input name="age" type="text" class="form-control" placeholder="请填写年龄" value="${user.age}">
              </div>
              <div class="form-group">
                <label>邮箱</label>
                <input name="email" type="email" class="form-control" placeholder="请填写邮箱" value="${user.email}">
              </div>
              <div class="form-group">
                <label>请选择爱好</label>
                <div>
                    <label class="checkbox-inline">
                      <input type="checkbox" value="足球" name="hobbies" ${hobbyIsInclude(user, '足球')}> 足球
                    </label>
                    <label class="checkbox-inline">
                      <input type="checkbox" value="篮球" name="hobbies" ${hobbyIsInclude(user, '篮球')}> 篮球
                    </label>
                    <label class="checkbox-inline">
                      <input type="checkbox" value="橄榄球" name="hobbies" ${hobbyIsInclude(user, '橄榄球')}> 橄榄球
                    </label>
                    <label class="checkbox-inline">
                      <input type="checkbox" value="敲代码" name="hobbies" ${hobbyIsInclude(user, '敲代码')}> 敲代码
                    </label>
                    <label class="checkbox-inline">
                      <input type="checkbox" value="抽烟" name="hobbies" ${hobbyIsInclude(user, '抽烟')}> 抽烟
                    </label>
                    <label class="checkbox-inline">
                      <input type="checkbox" value="喝酒" name="hobbies" ${hobbyIsInclude(user, '喝酒')}> 喝酒
                    </label>
                    <label class="checkbox-inline">
                      <input type="checkbox" value="烫头" name="hobbies" ${hobbyIsInclude(user, '烫头')}> 烫头
                    </label>
                </div>
              </div>
              <button type="submit" class="btn btn-primary">应用</button>
            </form>
        </div>
    </body>
    </html>    
    `
    return modify;
}

function getListHtml(users) {
    let list = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title>用户列表</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
    </head>
    <body>
        <div class="container">
            <h6>
                <a href="/db/add" class="btn btn-primary">添加用户</a>
            </h6>
            <table class="table table-striped table-bordered">
                <tr>
                    <td>用户名</td>
                    <td>年龄</td>
                    <td>爱好</td>
                    <td>邮箱</td>
                    <td>操作</td>
                </tr>
    `

    users.forEach(item => {
        list += `
        <tr>
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>
        `
        item.hobbies.forEach(item => {
            list += `<span> ${item} </span>`
        })


        list += `
        </td>
        <td>${item.email}</td>
        <td>
            <a href="/db/remove?_id=${item._id}" class="btn btn-danger btn-xs">删除</a>
            <a href="/db/modify?_id=${item._id}" class="btn btn-success btn-xs">修改</a>
        </td>
    </tr>
        `
    })


    list += `
    </tr>
</table>
</div>
</body>
</html>
    `
    return list;
}

function hobbyIsInclude(user, hobby) {
    if (user.hobbies.includes(hobby)) {
        return 'checked="checked"';
    } else {
        return '';
    }
}
module.exports = router;