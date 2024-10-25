const checkBtn = require('./checkBtn')
const getBidAmount = require('./getBidAmount')
const processBid = require('./processBid')
const reload = require('./reload')
const { logs, closePages, bidInfos } = require('./config')
const { delay, makeLog } = require('./functions')


const bidListener = async (browser, url, amount) => {
	
	const page = await browser.newPage()
	process.send('checkVehicle')
	try{
		await page.goto(url)
	} catch {
		makeLog(logs.invalidUrl)
		process.send('invalidUrl')
		process.exit()
	}

	let epoch = 0

	while (true) {
		epoch ++
		let start = Date.now()
		let btnType = false

		await page.waitForSelector('.swiper-slide.swiper-slide-active')
		btnType = await checkBtn(page, 'max')
		btnType = await checkBtn(page, 'edit', true)?'edit':btnType
		let end = Date.now()

		if (!await getBidAmount(page, amount)) break

		if (!btnType) {
			process.send('finding')
			makeLog(logs.checkBtn(epoch))
			await reload(page)
			let end = Date.now()
			continue
		}

		if (!await processBid(page, btnType, amount)) break

		makeLog(logs.successBid())
		process.send('success')
		process.send('end')
		process.exit()
		break
	}
	process.send('failed')
	process.exit()

}

module.exports = bidListener