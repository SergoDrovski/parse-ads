const puppeteer = require("puppeteer");
const axios = require("axios");
const { patternSearch } = require("./PatternSearch.js");


const isLoadingPage = async (url) => {
	return await axios.get(url)
		.then(res => true)
		.catch(err => false)
}

const usePuppeteer = async () => {

	// Нужно убивать браузер, после завершения проверки 
	const browser = await puppeteer.launch({ headless: false })

	const checker = async (array = []) => {
		const result = await Promise.all(array.map(async item => {
			const isValidLink = await isLoadingPage(item.url)

			// свойства объекта по дефолту false
			const resultObj = { ...item, ads_name: null, ads_exist: false, is_valid_link: false, page_status: null}

			// если ссылка не загружается
			// сразу возвращаем obj
			// Возвращать статус от аксиоса !!!!!!!!!
			if (!isValidLink) {
				return resultObj
			}

			console.log('Начинается проверка ' + item.url)

			// ссылка валидна
			// создаем новую страницу
			const page = await browser.newPage()

			// открываем ссылку
			// еще можно проверять на долгий timeout
			const status = await page.goto(item.url, { waitUntil: 'load', timeout: 0 })
			if (status.status() !== 200) {
				return { ...resultObj, page_status: status.status() }
			}

			resultObj.is_valid_link = true
			resultObj.page_status = status.status()

			// действия на странице открытой ссылки
			await page.evaluate(async (args) => {
				// создаем div чтобы скролить к нему в конец сайта
				// fix lazy load на сайтах
				// есть вероятность что не все блоки/рекламы успеют загрузиться за 3-6 сек.
				const footer = document.createElement('div')
				footer.id = 'triggered'
				document.body.append(footer)

				await new Promise(resolve => setTimeout(resolve, 3000))
				document.querySelector('#triggered').scrollIntoView({ behavior: "smooth" })
				await new Promise(resolve => setTimeout(resolve, 3000))
				document.querySelector('#triggered').scrollIntoView({ behavior: "smooth" })
				await new Promise(resolve => setTimeout(resolve, 3000))
			})

			// здесь будет поиск по паттернам
			const res = await page.evaluate(patternSearch)
			await page.close();

			return { ...resultObj , ...res}
		}))

		return result
	}

	return { checker }
}


exports.usePuppeteer = usePuppeteer