const req = require('request');
const fs = require('fs');

// request promise 封装
function request(options) {
    return new Promise((resolve, reject) => {
        req(options, (error, res, body) => {
            if (error) {
                return reject({ error });
            } else if (res.statusCode != 200) {
                return reject({ error: JSON.parse(body) });
            } else {
                return resolve(body); // 请求成功的处理逻辑
            }
        })

    })
}

// 返回脸部信息
async function detectFace(faceImg) {
    try {
        let url = 'https://api-cn.faceplusplus.com/facepp/v3/detect';
        let form = {
            api_key: 'x2NyKaa6vYuArYwat4x0-NpIbM9CrwGU',
            api_secret: 'OuHx-Xaey1QrORwdG7QetGG5JhOIC8g7',
            image_base64: new Buffer.from(faceImg).toString('base64'),
            return_landmark: 1
        };
        return await request({
            url,
            method: "POST",
            form
        });
    } catch (error) {
        return error;
    }
}

// 换脸
async function faceWrap(templateImg, wrapImg, mergeRate = 100, featureRate = 45) {
    try {
        // 识别面部
        // let faceTpl = detectFace(templateImg);
        // let faceWrap = detectFace(templateImg);


        let url = 'https://api-cn.faceplusplus.com/imagepp/v1/mergeface';
        let form = {
            api_key: '1GAMAXrpseA5uI-knjAe2eVCH6W0JcZP',
            api_secret: 'jft6M_OP_12zd4ycMKmfoRT5YKXqIEHF',
            template_base64: new Buffer.from(templateImg).toString('base64'),
            merge_base64: new Buffer.from(wrapImg).toString('base64'),
            marge_rate: mergeRate,
            feature_rate: featureRate
        };
        let res = await request({
            url,
            method: "POST",
            form
        });

        return new Buffer.from(JSON.parse(res).result, 'base64')


    } catch (error) {
        return error;

    }


}
async function debug() {
    const time = Date.now();
    let img = await faceWrap(fs.readFileSync(__dirname + '\\1.jpg'), fs.readFileSync(__dirname + '\\2.jpg'));
    fs.writeFileSync(__dirname + '\\out.jpg', img);
    console.log(Date.now() - time);

}
// debug();

function getFirst(obj) {
    for (i in obj) {
        return obj[i];
    }
    return undefined;
}

function getUrl(req) { return req.protocol + '://' + req.get('host') + req.originalUrl; }
module.exports = { faceWrap, getFirst, getUrl };