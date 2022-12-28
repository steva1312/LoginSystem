const jwt = require('jsonwebtoken')

const verify = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]

  jwt.verify(token, 'degdeg1312', (err, payload) => {
    if (err) {
      return res.status(403).json('Not authenticated')
    }

    res.locals.id = payload.id

    next()
  })
}

module.exports = verify