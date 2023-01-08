const jwt = require('jsonwebtoken')

const verify = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const { id } = jwt.verify(token, 'degdeg1312')
    req.id = id
  } catch (err) {
    return res.send('Token expired or is invalid')
  }

  next()
}

module.exports = verify
