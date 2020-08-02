const mongoose = require('mongoose');
const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    age: {
        type: Number,
        default: 18
    },
    password: String,
    email: String,
    hobbies: [String]
}));
module.exports = User;