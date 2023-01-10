require('dotenv').config()

module.exports = {
  database: process.env.DATABASE,
  databaseUser: process.env.DATABASEUSER,
  databasePassword: process.env.DATABASEPASSWORD,
  email: process.env.EMAIL,
  emailPassword: process.env.EMAILPASSWORD,
  emailSecret: process.env.EMAILSECRET,
  accessSecret: process.env.ACCESSSECRET,
  forgotSecret: process.env.FORGOTSECRET,
}
