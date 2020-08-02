const bcrypt = require('bcrypt');

async function run() {
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    console.log(await bcrypt.hash('123456', salt));


}
run();