const loginInfo = {
	username: 'sales@drivetitanmotors.com'
	password: 'SellCars2023!'
}

const closePages = {
	count: 0
}

const logs = {
	openBrowser: '\nOpen browser!',
	loginSuccess: 'Login successfully!',
	checkLogs: {
		max: 'Not found <Max bid> button. Find <Edit bid> button!',
		edit: 'Not found <Edit bid> button. Restarting!'
	},
	checkBtn: (epoch) => `There is no <Bid> buttons!. Retry number ${epoch}`,
	bigAmount: (amount, current) => `Current price is ${amount}. Must bid higher than ${current}!`,
	currentAmount: (current) => `Current bid amount is ${current}!`,
	failedGetAmount: 'Failed get current bid amount!',
	processBid: 'Can not bid this item!',
	successBid: () => `Success bid!`,
	invalidUrl: 'The URL is invalid!',
}

module.exports = {
	logs,
	closePages,
	loginInfo
}