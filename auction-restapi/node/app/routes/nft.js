const express = require('express')
const router = express.Router()
const log4js = require('log4js')
const logger = log4js.getLogger('index')
const nftCtrl = require('../controllers/nftCtrl')
const config = require('config')
logger.level = config.logLevel

router.get('/me', nftCtrl.getNFTsByUser)
router.get('/:nftId', nftCtrl.getNftByID)
router.get('/:nftId/history', nftCtrl.getNftHistory)
router.post('/mint', nftCtrl.createNft)
router.post('/transfer', nftCtrl.transferNft)

//mandatary to export
module.exports = router
