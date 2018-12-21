const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require ('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}))

module.exports.login = async function(req, res){
    const candidate = await User.findOne({email: req.body.email})

    if(candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        
        if(passwordResult) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 3600})
            res.status(200).json({
                token: `Bearer ${token}`,
                id: candidate._id
            })

        }else{
            res.status(401).json({
                message: 'Пароль не правильний. Спробуйте ще раз'
            })
        }
    } else {
        res.status(404).json({
            message: 'Користувача з таким email не знайдено'
        })
    }
}

module.exports.register = async function(req, res){
    const candidate = await User.findOne({email: req.body.email})

    if(candidate) {
        res.status(409).json({
            message: 'Користувач з таким email вже існує'
        })
    } else {
        const salt = bcrypt.genSaltSync(13)
        const password = req.body.password
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })
        try{
            await user.save()
            res.status(201).json(user)
        }catch(e){
            errorHandler(res, e)
        }
    }
}

module.exports.forgot = async function(req, res) {
    const user = await User.findOne({email: req.body.email})

    if(user) {

        crypto.randomBytes(32, (err, buffer) => {
            if (err) {
                return res.status(400).json({
                    message: 'Помилка'
                })
            }
            const token = buffer.toString('hex')
            user.resetToken = token
            user.resetTokenExpiration = Date.now() + 3600000
            try{
                user.save()
                transporter.sendMail({
                    to: user.email,
                    from: 'help@ctrlstock.com',
                    subject: 'Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'https://'+ req.headers.host +'/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                })
                res.status(200).json('На ваш email відправлено посилання для відновлення паролю')
            }catch(e){
                errorHandler(res, e)
            }
        }) 
    } else {
        res.status(404).json({
            message: 'Користувача з таким email не знайдено'
        })
    }

}

module.exports.postNewPassword = async function(req, res) {
    const newPassword = req.body.password
    const passwordToken = req.params.token
    const salt = bcrypt.genSaltSync(13)
    let resetUser

    User.findOne({resetToken: passwordToken, resetTokenExpiration: {$gt: Date.now()}})
    .then(user => {
        resetUser = user
        return bcrypt.hashSync(newPassword, salt)
    })
    .then(hashedPassword => {
        resetUser.password = hashedPassword
        resetUser.resetToken = undefined
        resetUser.resetTokenExpiration = undefined
        return resetUser.save()
    })
    .then(result => {
        res.status(200).json({
            message: 'Пароль змінено'
        })
    })
    .catch(err => {
        errorHandler(res, err)
    })
}