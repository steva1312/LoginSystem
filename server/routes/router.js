const express = require('express')
const router = express.Router()

const verify = require('../middlewares/verify')

router.get('/', (req, res) => res.send('kita'))
router.post('/register', require('./register'))
router.get('/confirm/:token', require('./confirm'))
router.post('/login', require('./login'))
router.get('/validate', verify, require('./validate'))

module.exports = router
