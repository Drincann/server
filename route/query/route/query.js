const request = require('request');
const encrypt = require('../tools/encryption')
// request promise 封装
function requestAsync(options) {
    return new Promise((resolve, reject) => {
        request(options, (error, res, body) => {
            return resolve({ error, res, body }); // 请求成功的处理逻辑
        });
    });
}

module.exports = async function (req, res) {
    try {
        console.log(req.fields);

        // 解构参数
        let { question, type, pwd, reJson } = req.fields;
        if (!question || !(/[2-4]{1}/.test(type)) || pwd != 'diany') {
            return res.status(400).send({ message: '你能稍微 jb 把参数传对点不？强盗？' });
        }

        // 访问主页取 code
        let { err, body } = await requestAsync({
            url: 'http://jk.fm210.cn/',
            method: 'GET',
            headers: {
                'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`
            }
        });
        if (err) {
            return res.status(500).send({ message: '对面主页崩了。|' + err.message });
        }

        // js 加密
        let regexp = /[0-9a-z]{32}/;
        let code = regexp.exec(body);
        if (!code[0]) {
            return res.status(500).send({ message: '没取到主页的那个服务端给的那个东西，那一串那个。\n没取到，你给我说一声，让我看看。' });
        }
        let token = encrypt(question, code[0]);

        // 请求问题
        ({ err, body } = await requestAsync({
            url: 'http://jk.fm210.cn/web.php',
            method: 'POST',
            form: {
                token,
                type,
                question,
                headers: {
                    'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`
                }
            }
        }));
        if (err) {
            return res.status(500).send('查题的时候这崩了，你看看错误：' + err.message);
        }

        body = JSON.parse(body);
        if (reJson) {
            res.send({
                question: body['tm'].replace(/<.*>/, ''),
                answer: body['da'].replace(/<.*>/, '')
            });
        } else {
            res.send(`题目：${body['tm'].replace(/<.*>/, '')}\n答案：${body['da'].replace(/<.*>/, '')}`);

        }

    } catch (err) {
        res.status(500).send({ message: err.message });
    }

}