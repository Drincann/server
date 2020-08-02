const path = require('path');
const gm = require('gm');
const green = gm(__dirname + '\\green.jpg');
const white = gm(__dirname + '\\white.jpg');
const word = gm(__dirname + '\\word.jpg');
const test = gm(__dirname + '\\out1.jpg');


let writeAsync = function (img, fileName) {
    return new Promise(function (resolve, reject) {
        img.write(fileName, function (err) {
            if (!err) {
                resolve(fileName);
            } else {
                reject(err);
            }
        });
    });
}
let toBufferAsync = function (img, format) {
    return new Promise(function (resolve, reject) {
        img.toBuffer(format, function (err, buf) {
            if (!err) {
                resolve(buf);
            } else {
                reject(err);
            }
        });
    });
}
let sizeAsync = function (img) {
    return new Promise(function (resolve, reject) {
        img.size(function (err, value) {
            if (!err) {
                resolve(value);
            } else {
                reject(err);
            }
        });
    });

}
async function run(info) {
    try {
        // 读入图片信息
        let { width, height } = await sizeAsync(gm(__dirname + '\\1.jpg'));


        // 制作头部
        const top = await writeAsync(
            gm(width, 100, "#fff")
                .append(__dirname + '\\word.jpg', true)
                .resize(null, 100)
                .font(__dirname + '\\Product Sans.ttf', 100)
                .drawText(0, 100, "GMagick1!")
            ,
            __dirname + '\\0.jpg');


        // await writeAsync(
        //     word.append(__dirname + '\\0.jpg'),
        //     __dirname + '\\out1.jpg')
        console.log(1);
    } catch (error) {
        console.log(error.message);
    }
}

run()