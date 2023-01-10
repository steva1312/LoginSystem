const jwt = require('jsonwebtoken')
const config = require('../config')

const verify = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const { id } = jwt.verify(token, config.accessSecret)
    req.id = id
  } catch (err) {
    return res.send('Token expired or is invalid')
  }

  next()
}

module.exports = verify
