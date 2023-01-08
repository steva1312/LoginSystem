const jwt = require('jsonwebtoken')

const verify = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]

  jwt.verify(token, 'degdeg1312', (err, payload) => {
    if (err) {
      return res.json('Not authenticated')
    }

    req.id = payload.id

    next()
  })
}

module.exports = verify
