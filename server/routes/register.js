const { User } = require('../models/')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'stevan.randjelovic.apps@gmail.com',
    pass: 'ywhiolfipwjucpoj',
  },
})

const register = async (req, res) => {
  const { email, password } = req.body

  const messages = []
  let user

  try {
    user = await User.create({
      email,
      password,
    })
  } catch (err) {
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
      } else if (error.path === 'password') {
        if (error.type === 'Validation error') messages.push('INVALID_PASSWORD')
      } else messages.push('ERROR')
    }
  }

  if (messages.length === 0) {
    jwt.sign({ id: user.id }, 'EMAIL_SECRET', { expiresIn: '1d' }, (err, emailToken) => {
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
