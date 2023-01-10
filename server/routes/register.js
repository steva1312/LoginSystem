const { User } = require('../models/')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: config.email,
    pass: config.emailPassword,
  },
})

const register = async (req, res) => {
  const { email, password } = req.body

  const messages = []
  let user

  if (password.length < 6 || password.length > 32) messages.push('INVALID_PASSWORD')

  try {
    if (messages.length === 0) {
      const hashedPassword = await bcrypt.hash(password, 12)
      user = await User.create({
        email,
        password: hashedPassword,
      })
    }
  } catch (err) {
    console.log(err)
    //using for instead of forEach so await can be used
    for (const error of err.errors) {
      if (error.path === 'email') {
        if (error.type === 'Validation error') messages.push('INVALID_EMAIL')
        else if (error.type === 'unique violation') {
          //what if p1 tries to register with p2's email? p2 should still be able to register with different password
          user = await User.findOne({ where: { email } })
          if (!user.confirmed) await user.update({ password })
          else messages.push('EMAIL_REGISTERED')
        }
      } else messages.push('ERROR')
    }
  }

  if (messages.length === 0) {
    jwt.sign({ id: user.id }, config.emailSecret, { expiresIn: '1d' }, (err, emailToken) => {
      const url = `http://localhost:5000/confirm/${emailToken}`

      transporter.sendMail({
        to: user.email,
        subject: 'Confirm email',
        html: `Please click on this link to confirm your email: <a href="${url}">${url}</a>`,
      })
    })
  }

  res.send({ messages })
}

module.exports = register
