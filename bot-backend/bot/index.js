const openBrowser = require('./lib/openBrowser')
const login = require('./lib/login')
const bidListener = require('./lib/bidListener')

console.log(process.argv)

const start = async () => {
	const browser = await openBrowser()
	const result = await login(browser)

	bidListener(browser, process.argv[2], Number(process.argv[3]))
}

start()
