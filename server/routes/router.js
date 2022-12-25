const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.send('kita'))
router.post('/register', require('./register'))
router.post('/login', require('./login'))

module.exports = router
