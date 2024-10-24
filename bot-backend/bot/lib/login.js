const { logs } = require('./config')
const { makeLog } = require('./functions')

const login = async (browser) => {
	const start = Date.now()
	
	const page = await browser.newPage()
	
	process.send('login')

	await page.goto('https://app.marketplace.autura.com/signin')

	await page.waitForSelector('[data-testid="sign-in-page-email-field"]')

	await page.type('[data-testid="sign-in-page-email-field"]', 'sales@drivetitanmotors.com')
	await page.type('[data-testid="sign-in-page-password-field"]', 'SellCars2023!')
	await page.click('[aria-label="Accept All"]')
	await page.click('[data-testid="sign-in-page-sign-in-button"]')

	const end = Date.now()
	makeLog(logs.loginSuccess)

	return true

}

module.exports = login