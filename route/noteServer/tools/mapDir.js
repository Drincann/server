const fs = require('fs');
module.exports = function mapDir(dir) {
    let obj = [];
    let fileList = fs.readdirSync(dir);
    for (file of fileList) {
        let stats = fs.statSync(dir + '/' + file);
        if (stats.isDirectory()) {
            obj.push({
                title: file,
                children: mapDir(dir + '/' + file)
            });
        } else if (stats.isFile()) {
            if (file.slice(-3) == '.md') {
                obj.push({
                    title: file,
                    link: dir.replace('route/noteServer/public', '') + '/' + file
                });
            }

        }
    }
    return obj;
}
