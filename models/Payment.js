const mongoose = require('mongoose')

const Schema = mongoose.Schema

const paymentSchema =new Schema({
    _id: ObjectId(),
    paymentStatus: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('payments', paymentSchema)