const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema =new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    check: {
        type: Boolean,
        default: false
    },
    resetToken: String,
    resetTokenExpiration: Date
})

module.exports = mongoose.model('users', userSchema)