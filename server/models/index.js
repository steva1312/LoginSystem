const s = require('sequelize')
const Sequelize = s.Sequelize
const config = require('../config')

const sequelize = new Sequelize(config.database, config.databaseUser, config.databasePassword, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})

const db = {
  User: require('./user')(sequelize, s.DataTypes),
}

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize

module.exports = db
