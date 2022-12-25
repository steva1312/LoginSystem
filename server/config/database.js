const mysql = require('mysql2')

const pool = mysql.createPool({
  user: 'root',
  host: 'localhost',
  password: 'degdeg',
  database: 'login_system',
  connectionLimit: 10,
})

module.exports = pool
