const express = require('express')

const bidController = require('../controllers/bid.controller')
const authController = require('../controllers/auth.controller')

const router = express.Router()

router.route('/')
	.get(authController.isAuth, bidController.getUrlInfos)
	.put(authController.isAuth, bidController.addUrlInfo)

router.route('/:id')
	.get(authController.isAuth, bidController.getUrlInfo)
	.delete(authController.isAuth, bidController.removeUrlInfo)
	.patch(authController.isAuth, bidController.editUrlInfo)

module.exports = router