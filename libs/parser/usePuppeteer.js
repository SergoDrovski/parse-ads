const puppeteer = require("puppeteer");
// const axios = require("axios");
const { patternSearch } = require("./PatternSearch.js");


// const isLoadingPage = async (url) => {
// 	return await axios.get(url)
// 		.then(res => {
// 			return { valid: true, status: res.status }
// 		})
// 		.catch(err => {
// 			return { valid: false, status: err.status }
// 		})
// }

const usePuppeteer = async () => {

	// Нужно убивать браузер, после завершения проверки 
	const browser = await puppeteer.launch({
		executablePath: '/usr/bin/google-chrome',
		args: [
			"--disable-gpu",
			"--disable-dev-shm-usage",
			"--disable-setuid-sandbox",
			"--no-sandbox",
		],
		headless: true,
		'ignoreHTTPSErrors': true
	})

	const checker = async (array = []) => {
		const result = await Promise.all(array.map(async item => {
			// const { valid: isValidLink, status: axiosStatus } = await isLoadingPage(item.url)

			// свойства объекта
			const resultObj = { ...item, ads_name: null, ads_exist: false, is_valid_link: true, page_status: null }

			// если ссылка не валидна, возвращаем obj
			// if (!isValidLink) {
			// 	return resultObj
			// }

			console.log('Начинается проверка ' + item.url)

			// ссылка валидна
			// создаем новую страницу
			const page = await browser.newPage()

			// переходим по ссылке
			// еще можно проверять на долгий timeout
			// Пробуем открыть сайт, если ошибка возвращаем невалидную ссылку и проверяем след.

			try {
				const status = await page.goto(item.url, { waitUntil: 'load', timeout: 0 })
				resultObj.page_status = status.status();
				if (status.status() !== 200) {
					resultObj.is_valid_link = false;
					return resultObj;
				}
			} catch (e) {
				return { ...resultObj, page_status: 500,  is_valid_link: false}
			}

			// действия на странице открытой ссылки
			await page.evaluate(async (args) => {
				// создаем div чтобы скролить к нему в конец сайта
				// fix lazy load на сайтах
				// есть вероятность что не все блоки/рекламы успеют загрузиться за 3-6 сек.
				const footer = document.createElement('div')
				footer.id = 'puppeteerTarget'
				document.body.append(footer)

				await new Promise(resolve => setTimeout(resolve, 3000))
				document.querySelector('#puppeteerTarget').scrollIntoView({ behavior: "smooth" })
				await new Promise(resolve => setTimeout(resolve, 3000))
				document.querySelector('#puppeteerTarget').scrollIntoView({ behavior: "smooth" })
				await new Promise(resolve => setTimeout(resolve, 3000))
			})

			// здесь будет поиск по паттернам
			const res = await page.evaluate(patternSearch)
			await page.close();

			return { ...resultObj , ...res}
		}))

		//убиваем(закрываем) браузер
		await browser.close()

		return result
	}

	return { checker }
}

exports.usePuppeteer = usePuppeteer