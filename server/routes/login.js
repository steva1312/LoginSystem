const jwt = require('jsonwebtoken')
const { User } = require('../models')
const bcrypt = require('bcrypt')
const config = require('../config')

const login = async (req, res) => {
  const { email, password } = req.body

  const messages = []

  const user = await User.findOne({ where: { email } })

  if (!user) messages.push('USER_NOT_FOUND')
  else {
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) messages.push('WRONG_PASSWORD')
    if (!user.confirmed) messages.push('NOT_CONFIRMED')
  }

  const accessToken = messages.length === 0 ? jwt.sign({ id: user.id }, config.accessSecret, { expiresIn: '2m' }) : null

  res.send({ messages, accessToken })
}

module.exports = login
