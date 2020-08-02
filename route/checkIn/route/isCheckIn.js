
const superagent = require('superagent');


module.exports = function (req, res) {
    try {
        // 获取请求参数
        const { studentid } = req.query;
        // 验证
        if (!(/[0-9]{13}/.test(studentid))) {
            // 不匹配
            return res.status(500).send({ result: { err: { message: '学号非法!' } } });
        }

        // 请求
        superagent
            .get('http://211.68.191.30:8090/yqfx/search') // 请求地址
            .query({ studentid }) // 请求参数
            .end((err, response) => {
                if (err) {// 出错
                    return res.status(500).send({ result: { err } });
                }
                // 没出错
                res.send({ result: { text: response.text } });

            });
    } catch (err) {
        res.status(500).send({ result: { err } });
    }
    // // callback
    // a = {
    //     "err": null,
    //     "response": {
    //         "req": {
    //             "method": "GET",
    //             "url": "http://211.68.191.30:8090/yqfx/search?studentid=2019984040519",
    //             "headers": {}
    //         },
    //         "header": {
    //             "content-type": "text/plain;charset=UTF-8",
    //             "content-length": "19",
    //             "date": "Sat, 01 Aug 2020 07:48:04 GMT",
    //             "connection": "close"
    //         },
    //         "status": 200,
    //         "text": "高俊康:已签到"
    //     }
    // }

}