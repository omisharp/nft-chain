const express = require('express')
const router = express.Router()
const log4js = require('log4js')
const logger = log4js.getLogger('users')
const usersCtrl = require('../controllers/userCtrl')
const userValidate = require('../middlewares/validate/userValidate')
const config = require('config')
logger.level = config.logLevel

router.post('/login', userValidate.login, usersCtrl.login)

router.post('/register', userValidate.register, usersCtrl.register)

//mandatary to export
module.exports = router
