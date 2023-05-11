const express = require('express')
const router = express.Router()
const log4js = require('log4js')
const logger = log4js.getLogger('index')
const bidCtrl = require('../controllers/bidCtrl')
const config = require('config')
logger.level = config.logLevel

router.get('/:bidID', bidCtrl.getBidByID)
router.get('/high/:auctionID', bidCtrl.getHighestBid)
router.get('/auction/:auctionID', bidCtrl.getBidsByAuctionID)
router.post('/', bidCtrl.postBid)
router.post('/buynow', bidCtrl.buyItNow)

//mandatary to export
module.exports = router
