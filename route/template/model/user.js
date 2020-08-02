const mongoose = require('mongoose');

function test() {
    return 'niubi';
}
module.exports = mongoose.model('Student', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
    },
    age: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 25
    },
    sex: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    hobbies: {
        type: [String],
        default: []
    },
    collage: {
        type: String
    },
    enterDate: {
        type: Date,
        default: Date.now
    }
}));