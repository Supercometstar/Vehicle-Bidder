const { delay } = require('./functions')

const reload = async (page) => {

	const preBtn = await page.$('button.ant-pagination-item-link span[aria-label="left"]')
	const nextBtn = await page.$('button.ant-pagination-item-link span[aria-label="right"]')

	const preDisabled = eval(await page.$eval('li[title="Previous Page"]', el => el.getAttribute('aria-disabled')))
	const nextDisabled = eval(await page.$eval('li[title="Next Page"]', el => el.getAttribute('aria-disabled')))

	if (!preDisabled) {
		await preBtn.click()
		await nextBtn.click()
		
	}else if (!nextDisabled) {
		await nextBtn.click()
		await preBtn.click()
	}

}

module.exports = reload