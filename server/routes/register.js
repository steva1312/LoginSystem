const db = require('../config/database')

const register = (req, res) => {
  const { username, password } = req.body

  const messages = []

  if (password.length < 6) messages.push('password too short')

  //search if username already exists
  db.query('select * from user where username = ?', [username], (err, result) => {
    if (result.length !== 0) {
      messages.push('username already taken')
    }

    if (messages.length === 0) {
      //insert new user
      db.query('insert into user (username, password) VALUES (?, ?)', [username, password])
    }

    res.send({ messages: messages })
  })
}

module.exports = register
