const { User } = require('../models')

const me = async (req, res) => {
  const user = await User.findOne({ where: { id: req.id }, raw: true })

  res.send({ user })
}

module.exports = me
