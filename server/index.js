const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
const models = require('./models')

const app = express()

app.use(cors())
app.use(express.json())

app.use(router)

models.sequelize.sync().then(async () => {
  const PORT = 5000
  app.listen(PORT, () => console.log(`Running on port ${PORT} ...`))
})
