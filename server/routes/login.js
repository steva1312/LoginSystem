const db = require('../config/database')

const login = (req, res) => {
  const { username, password } = req.body

  const messages = []

  //check if user exists
  db.query('select * from user where username = ?', [username], (err, result) => {
    if (result.length === 0) {
      messages.push('user not found')
    } else {
      //check password
      if (result[0].password !== password) {
        messages.push('wrong password')
      }
    }

    res.send({ messages: messages })
  })
}

module.exports = login
