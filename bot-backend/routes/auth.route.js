const express = require('express')

const authController = require('../controllers/auth.controller')

const router = express.Router()

router.route('/')
	.get(authController.isAuth, authController.autoLogin)
	.post(authController.login)
	.patch(authController.verify)
	.delete(authController.logout)

module.exports = router