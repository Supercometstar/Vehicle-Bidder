const fs = require('fs')
const path = require('path')

exports.fillText = async (page, input, text) => {
	try{
		await input.focus()
		await page.keyboard.press('Backspace')
		await page.keyboard.press('Backspace')
		await page.keyboard.press('Backspace')
		await page.keyboard.press('Backspace')
		await page.keyboard.press('Backspace')
		await page.keyboard.press('Backspace')
		await page.keyboard.press('Backspace')
		await page.keyboard.press('Backspace')
		await page.keyboard.press('Backspace')
		await input.type(text.toString())
	}catch (e) {}
}

exports.delay = async (time) => {
	return new Promise((resolve) => {
		setTimeout(resolve, time)
	})
}

exports.makeLog = async (log) => {
	let url = process.argv[2].replace(/\//g, '-')
	let amount = process.argv[3]
	fs.appendFileSync(path.join(__dirname, `../logs/${url}---${amount}.log`), `${log}\n`)
}