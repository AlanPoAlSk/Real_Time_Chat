const mongoose = require ('mongoose');

const UserSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        minlength: 2,
    },
    lastName : {
        type: String,
        required: true,
        minlength: 2,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
    },
    image : {
        type: String
    }
}, {timestamps: true});

module.exports.UserModel = mongoose.model('User', UserSchema);