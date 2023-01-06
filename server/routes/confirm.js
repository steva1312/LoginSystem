const jwt = require('jsonwebtoken')
const { User } = require('../models')

const confirm = async (req, res) => {
  const emailToken = req.params.token

  try {
    const { id } = jwt.verify(emailToken, 'EMAIL_SECRET')
    await User.update({ confirmed: true }, { where: { id } })
  } catch (err) {
    return res.send('invalid token')
  }

  res.send('Email confirmed!')
}

module.exports = confirm
