const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const { accounts, secretKey } = require('../utils/constants.util')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jjay44480@gmail.com',
    pass: 'dvsb lnor evvo cssy'
  }
});

const createToken = (payload) => {
	const options = {
	    expiresIn: '24h'
	}

	const token = jwt.sign(payload, secretKey, options)
	return token
}

const parseToken = (token) => {
	return jwt.verify(token, secretKey)
}

exports.isAuth = async (req, res, next) => {
	const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.json({
    	message: 'failed'
    })

    try {
    	const parsedToken = parseToken(token)
    	for (let account of accounts) {
    		if ( account.email === parsedToken.email && account.verifyCode === parsedToken.verifyCode) {
    			req.account = account
    			return next()
    		}
    	}
    	console.log('aaaa', accounts, parsedToken)
    	return res.json({
    		message: 'failed'
    	})
    } catch {
    	return res.json({
    		message: 'failed'
    	})
    }
}

exports.verify = async (req, res, next) => {
	const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.json({
  	message: 'failed'
  })
	const parsedToken = parseToken(token)
	for (let account of accounts) {
		if (account.email === parsedToken.email) {
			if (account.verifyCode == req.body.verifyCode) {
				const token = createToken({ email: account.email, verifyCode: account.verifyCode })
				return res.json({
					message: 'success',
					token,
					email: account.email,
				})
			}
		}
	}
	return res.json({
		message: 'failed'
	})
}

exports.autoLogin = async (req, res, next) => {
	req.account.verifyCode = Math.floor(Math.random()*900000)+100000
	return res.json({
		message: 'success',
		token: createToken({ email: req.account.email, verifyCode: req.account.verifyCode }),
		email: req.account.email
	})
}

exports.login = async (req, res, next) => {
	let successFlag = false
	accounts.map((account, idx) => {
		if (account.email === req.body.email && account.password === req.body.password) {
			const token = createToken({ email: req.body.email })
			successFlag = true

			account.verifyCode = Math.floor(Math.random()*900000)+100000

			var mailOptions = {
			  	from: 'jjay44480@gmail.com',
			  	to: req.body.email,
			  	subject: 'Your One-Time Password',
			  	text: `Vehicle Automatic Bidder \n\n Hello ${req.body.email}, \n Your verification code is : ${account.verifyCode}`
			};

			transporter.sendMail(mailOptions, function(error, info){
			  	if (error) {
			    	console.log(error);
			  	} else {
			    	console.log('Email sent: ' + info.response);
			  	}
			});


			res.json({
				message: 'success',
				token,
				email: req.body.email,
			})
			return
		}
	})

	if (!successFlag) {
		res.json({
			message: 'failed'
		})
	}
}

exports.logout = async (req, res, next) => {
	res.json({
		message: 'success'
	})
}