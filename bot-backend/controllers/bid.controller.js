const { accounts } = require('../utils/constants.util')
const { v4: uuidv4 } = require('uuid')
const spawn = require('child_process').spawn

const createProcess = (info) => {
	const child = spawn('../bin/node.exe', [ './bot/index.js', info.url, info.amount ], {
		stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
	  	cwd: process.cwd(),
	  	env: process.env,
	  	shell: false
	})

	child.on('message', (message) => {
		if (['success', 'failed'].includes(message)) {
			info.state = message
		}else {
			info.log = message
		}
	})

	child.on('exit', () => {
		if (info.state === 'running') {
			info.state = 'stop'
		}
	})

	info.process = child
}

const createId = () => {
	return uuidv4()
}

exports.getUrlInfo = async (req, res, next) => {
	const id = req.params.id

	for (let bid of req.account.bids) {
		if (bid.id === id) {
			return res.json({
				message: 'success',
				data: { id: bid.id, url: bid.url, amount: bid.amount, state: bid.state, log: bid.log }
			})
		}
	}

	return res.json({
		message: 'failed',
	})
}

exports.getUrlInfos = async (req, res, next) => {
	return res.json({
		message: 'success',
		data: req.account.bids.map((item) => {
			return { id: item.id, url: item.url, amount: item.amount, state: item.state, log: item.log }
		})
	})
}

exports.addUrlInfo = async (req, res, next) => {
	const bid = { ...req.body, id: createId() }
	req.account.bids.push(bid)

	res.json({
		message: 'success',
		data: bid
	})
}

exports.editUrlInfo = async (req, res, next) => {
	const id = req.params.id

	for (let bid of req.account.bids) {
		if (bid.id === id) {
			let idx = req.account.bids.indexOf(bid)
			req.account.bids[idx] = { ...req.body, process: req.account.bids[idx].process }
			if (req.body.state === 'running') {
				req.account.bids[idx].log = undefined
				createProcess(req.account.bids[idx])
			}else if (req.body.state === 'stop') {
				req.account.bids[idx].log = undefined
				try {
					req.account.bids[idx].process.kill()
				} catch (err) {}
			}
			return res.json({
				message: 'success',
				data: req.body
			})
		}
	}
	return res.json({
		message: 'failed',
	})
}

exports.removeUrlInfo = async (req, res, next) => {
	const id = req.params.id
	for (let bid of req.account.bids) {
		if (bid.id === id) {
			let idx = req.account.bids.indexOf(bid)
			try {
				req.account.bids[idx].process.kill()
			} catch (err) {}
			req.account.bids.splice(idx, 1)
			return res.json({
				message: 'success',
				data: id
			})
		}
	}
	return res.json({
		message: 'failed'
	})
}