var express = require('express')
var router = express.Router()

router.use('/cars', require('./cars'))
router.use('/animals', require('./animals'))

router.get('/', function(req, res) {
  res.send('Home page')
})

router.get('/about', function(req, res) {
  res.send('Learn about us')
})

module.exports = router
