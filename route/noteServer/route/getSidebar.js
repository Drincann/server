const mapDir = require('../tools/mapDir');
module.exports = function (req, res) {
    res.send(mapDir('route/noteServer/public/doc'));
}