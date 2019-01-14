const mongoose = require('mongoose')

const Schema = mongoose.Schema

const paymentSchema =new Schema({
    
    payment_id: Number,
    response_status: String
  
})

module.exports = mongoose.model('payments', paymentSchema)