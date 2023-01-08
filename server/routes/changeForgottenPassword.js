const jwt = require('jsonwebtoken')
const { User } = require('../models')

const changeForgottenPassword = async (req, res) => {
  const { token, password } = req.body

  const messages = []

  if (password.length < 6 || password.length > 32) messages.push('INVALID_PASSWORD')

  let id

  try {
    const decode = jwt.verify(token, 'FORGOT_SECRET')
    id = decode.id
  } catch (err) {
    messages.push('INVALID_TOKEN')
  }

  if (messages.length === 0) {
    await User.update({ password }, { where: { id } })
  }

  res.send({ messages })
}

module.exports = changeForgottenPassword
