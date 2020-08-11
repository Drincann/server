const fs = require('fs');

// 获取文件列表
function getDir(dir, result) {
    result = result || [];
    let fileList = fs.readdirSync(dir);
    for (file of fileList) {
        let stats = fs.statSync(dir + '/' + file);
        if (stats.isDirectory()) {
            getDir(dir + '/' + file, result);
        } else if (stats.isFile() && file.slice(-3) == '.md') {
            result.push(dir + '/' + file);
        }
    }

    return result;
}
module.exports = async function match(key) {
    let fileList = getDir('route/noteServer/public/doc', []);
    let regexp = new RegExp(`.{0,}${key}.{0,}`, 'i');
    let result = []

    for (file of fileList) {

        let find = regexp.exec(await fs.readFileSync(file));
        if (find) {
            let middleTemp = file && file.replace(/route\/noteServer\/public\//g, '').split('/');
            if (middleTemp && middleTemp.length == 3) {
                var filenameObj = {
                    father: middleTemp[1],
                    child: middleTemp[2],
                    link: '/' + middleTemp[0] + '/' + middleTemp[1] + '/' + middleTemp[2]
                }
            } else {
                var filenameObj = {
                    father: null,
                    child: file && '/' + file.replace(/route\/noteServer\/public\/doc\//g, ''),
                    link: file.replace(/route\/noteServer\/public\//g, ''),
                }
            }
            if (result.length >= 16) {
                return result;
            }
            result.push({
                title: filenameObj.father,
                link: filenameObj.link,
                label: filenameObj.child,
                description: find
            });
        }
    }
    return result;
}
