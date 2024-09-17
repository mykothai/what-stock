import express from 'express'
const router = express.Router()

const storeController = require('../controllers/storeController')

router.get('/inventories', storeController.getInventories)

module.exports = router