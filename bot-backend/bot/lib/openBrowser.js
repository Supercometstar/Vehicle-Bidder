const puppeteer = require('puppeteer')

const { logs } = require('./config')
const { makeLog } = require('./functions')

const openBrowser = async () => {

	process.send('open')
	const browser = await puppeteer.launch({
		headless: 'shell',
		protocolTimeout: 1000000000
	})

	const context = await browser.createBrowserContext()
	makeLog(logs.openBrowser)

	return context
	// return browser

}

module.exports = openBrowser