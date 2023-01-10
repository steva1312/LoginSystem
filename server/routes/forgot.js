const { User } = require('../models/')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const config = require('../config')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: config.email,
    pass: config.emailPassword,
  },
})

const forgot = async (req, res) => {
  const { email } = req.body

  const messages = []

  const user = await User.findOne({ where: { email } })

  if (!user) messages.push('USER_NOT_FOUND')
  else if (!user.confirmed) messages.push('NOT_CONFIRMED')

  if (messages.length === 0) {
    jwt.sign({ id: user.id }, config.forgotSecret, { expiresIn: '1h' }, (err, forgotToken) => {
      const url = `http://localhost:3000/change-forgotten-password?token=${forgotToken}`

      transporter.sendMail({
        to: user.email,
        subject: 'Change forgotten password',
        html: `Please follow the link to change your password: <a href="${url}">${url}</a>`,
      })
    })
  }

  res.send({ messages })
}

module.exports = forgot
