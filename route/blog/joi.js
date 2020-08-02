const joi = require('joi');

const schema = {
    username: joi.string().min(2).max(20).required().error(new Error('出问题了'))
}
async function run() {
    try {
        let re = await joi.validate({ username: 'i1' }, schema)
        console.log(re);
    } catch (error) {
        console.log(error.message);
        return;
    }
    console.log('ok');

}
run();