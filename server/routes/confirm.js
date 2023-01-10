const jwt = require('jsonwebtoken')
const { User } = require('../models')
const config = require('../config')

const confirm = async (req, res) => {
  const emailToken = req.params.token

  try {
    const { id } = jwt.verify(emailToken, config.emailSecret)
    await User.update({ confirmed: true }, { where: { id } })
  } catch (err) {
    return res.send('invalid token')
  }

  res.redirect('http://localhost:3000/login?confirmed=true')
}

module.exports = confirm
