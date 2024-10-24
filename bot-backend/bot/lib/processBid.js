const { logs } = require('./config')
const { fillText, makeLog, delay } = require('./functions')

const labels = {
	max: 'Set my maximum',
	edit: 'Change'
}

const processBid = async (page, type, amount) => {
	
	try{
		await page.waitForSelector('input[data-testid="vehicle-page-auto-bid-amount-field"]')

		const input = await page.$('input[data-testid="vehicle-page-auto-bid-amount-field"]')
		await fillText(page, input, amount)

		await delay(1000)

		// await page.click(`xpath///button[contains(@class,"ant-btn-default")]/span[contains(text(), "${labels[type]}")]`)
		
		return true
	}catch {
		makeLog(logs.processBid)
		process.send('error')
		return false
	}
	
}

module.exports = processBid