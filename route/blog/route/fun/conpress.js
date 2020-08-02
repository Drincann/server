const sharp = require('sharp');
const fs = require('fs');
module.exports = async function compress(path) {
    try {
        let { data } = await sharp(path)
            .jpeg({ quality: 50 })
            .toBuffer({ resolveWithObject: true });
        await fs.writeFileSync(path, data);
    } catch (e) {
        return e;
    }
};