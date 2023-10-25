const express = require('express')
const Controller = require('../controllers/controller')
const { authentication } = require('../middlewares/auth')
const router = express.Router()

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/login/google', Controller.googleLogin)

router.use(authentication)

router.get('/stocks', Controller.getData)
router.get('/stocks/:ticker', Controller.stockDetail)
router.post('/payments', Controller.generateInvoice)
router.post('/mystocks', Controller.addMyStock)
router.get('/mystocks', Controller.getMyStock)
router.delete('/mystocks/:id', Controller.deleteMyStock)

module.exports = router