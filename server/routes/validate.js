const validate = (req, res) => {
  db.query('select * from user where id = ?', [res.locals.id], (err, result) => {
    res.send({ user: result[0] })
  })
}

module.exports = validate
