const fs = require('fs');
const path = require('path');
module.exports = (req, res) => {
    fs.readFile(path.join(__dirname, '..', 'public', 'NOTFOUND.md'), (err, data) => {
        console.log('notfound');
        if (!err)
            res.send(data);
        else
            res.send('# server error');
    });
}