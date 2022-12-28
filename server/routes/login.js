const jwt = require('jsonwebtoken')

const db = require('../config/database')

const login = (req, res) => {
  const { username, password } = req.body

  const messages = []

  //check if user exists
  db.query('select * from user where username = ?', [username], (err, result) => {
    let user = null

    if (result.length === 0) {
      messages.push('user not found')
    } else {
      //check password
      if (result[0].password === password) {
        user = result[0]
      } else {
        messages.push('wrong password')
      }
    }

    const accessToken = messages.length === 0 ? jwt.sign({ id: user.id }, 'degdeg1312', { expiresIn: '2m' }) : null

    res.send({ messages, user, accessToken })
  })
}

module.exports = login
