const axios = require("axios");
const convert = require('xml-js');
var fs = require('fs');

const arrayKey = ["без рецепта"]


// запрос к XMLRiver и получение ответа в виде XML 
const getXmlPage = async (url) => {
	axios.defaults.headers.get['Accept'] = 'application/xml';
	return await axios.get(url)
		.then(res => {
			return res
		})
		.catch(err => {
			return err
		})
}



// arrayKey - слова для поиска нужных ссылок
// searchApiUrl - API ссылка для подключения к одну из поскивиков, берём из кабинета XMLRiver
async function ApiXMLRiver(arrayKey, searchApiUrl) {
	return await Promise.all(arrayKey.map(async query => {
		let url = `${searchApiUrl}&query=${query}`;
		const xml = await getXmlPage(url)

		// const xmlTest = fs.readFileSync("test.xml").toString()
		// console.log(xmlTest)

		const jObj = convert.xml2js(xml, {compact: true, spaces: 4});
		const arrayObjUrl = jObj.yandexsearch.response.results.grouping.group;
		return arrayObjUrl.map((objElem)=> {
			return {url: objElem.doc.url._text}
		})
		// console.log(arrayUrl)
	}))
}