const { logs } = require('./config')
const { makeLog } = require('./functions')

const getBidAmount = async (page, amount) => {
	
	try{
		const amountBox = await page.$('.bid-amount > span')
		const amountContent = await amountBox.getProperty('textContent')
		const amountText = await amountContent.jsonValue()
		const current = Number(amountText.slice(1).replace(',', ''))

		if (amount <= current) {
			makeLog(logs.bigAmount(amount, current))
			process.send('amountError')
			return false
		}else {
			makeLog(logs.currentAmount(current))
			return current
		}

	}catch {
		makeLog(logs.failedGetAmount)
		return false
	}

}

module.exports = getBidAmount