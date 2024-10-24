const { logs } = require('./config')

const labels = {
	max: 'Set',
	edit: 'Edit'
}

const checkBtn = async (page, type, immediately=false) => {
	try {
		let btn
		if (!immediately) {
			btn = await page.waitForSelector(`xpath///button[@data-testid="vehicle-page-submit-auto-bid-button"]/span[contains(text(), "${labels[type]}")]`, { timeout: 1500 })
		}else {
			btn = await page.$(`xpath///button[@data-testid="vehicle-page-submit-auto-bid-button"]/span[contains(text(), "${labels[type]}")]`)
		}
		if (btn) {
			btn.click()
			return type
		}else {
			// console.log(logs.checkLogs[type])
			return false
		}
	}catch {
		// console.log(logs.checkLogs[type])
		return false
	}
}

module.exports = checkBtn