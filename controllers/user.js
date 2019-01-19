const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getById = async function(req, res) {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async function(req, res) {
  try {
    await User.remove({_id: req.params.id})
    res.status(200).json({
      message: 'Користувач видалений.'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}


module.exports.update = async function(req, res) {
    try {
      await User.findOneAndUpdate(
        {_id: req.params.id},
        {$set: {email: req.body.email,
                firstName: req.body.firstName, 
                lastName: req.body.lastName}},
        {new: true}
      )
      res.status(200).json({
        message: 'Дані успішно змінено.'
      })
    } catch (e) {
      errorHandler(res.status(409).json({
        message: 'Користувач з таким email вже існує'
      }), e)
    }
  }

module.exports.getCheck = async function(req, res) {
  try {
    const user = await User.findOne({_id: req.params.id, check: true, paymentExpiration: {$gt: Date.now()}})
    if (user) {
      res.status(200).json(user.check)
  } else {
    res.status(402).json(false)
  }} catch (e) {
    errorHandler(res, e)
  } 
}

module.exports.updateCheck = async function(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      {_id: req.params.id},
      {$set: {check: true,
              paymentExpiration: Date.now() + 2678400000}},
      {new: true}
    )
    res.status(200).json(user.paymentExpiration)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.pay = async function(req, res) {
  const payment = new Payment({
    payment_id: req.body.payment_id,
    response_status: req.body.response_status
  })
  try{
      await payment.save()
      res.status(201).json(payment)
  }catch(e){
      errorHandler(res, e)
  }
}


