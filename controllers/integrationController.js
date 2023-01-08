const { connectDb, disconnectDb } = require('../libs/mongoos.js');
const UrlNew = require('../models/urlNew.js').model;
const KeySearch = require('../models/keySearch.js').model;
const StatusSearch = require('../models/statusSearchNewUrl.js').model;
const axios = require("axios");
const convert = require("xml-js");

//Сохранение ключей для поиска URL 
exports.setKeySearch = async function(request, response, next){
	 if(!request.body.keys) return next(new Error('no data!'))
    let error = await connectDb();
    if(error instanceof Error) next(error)

	 // Валидация и форматирование данных
	 const formattingData = new FormattingDataForm(request.body.keys);
	 if(!formattingData.getStatus()) {
		 response.json({status: formattingData.getStatus(), formattingData: formattingData.getData()});
		 await disconnectDb();
		 return 
	 }
	 
    const arrayModel = formattingData.getData().map((el)=>{
        return { key: el }
    })

    await KeySearch.insertMany(arrayModel, {ordered: false}).then(function(data){
        disconnectDb();
        response.status(200);
        response.json({status: true, formattingData: data});
    }).catch(function(error){
        disconnectDb();
        console.log(error)
        next(new Error('error save new Key in db'))
    });
};

//Получение ключей для поиска
exports.getKeySearch = async function(request, response, next){
	let error = await connectDb();
	if(error instanceof Error) next(error)

	await KeySearch.find({}).then(function(data){
		disconnectDb();
		let keySearchToObj = data.map((elem)=>{
			return elem.toObject();
		})
		response.status(200);
		response.json(keySearchToObj);
	}).catch(function(error){
		disconnectDb();
		console.log(error)
		next(new Error('error get Key in db'))
	});
}

//Удаление ключей
exports.deleteKeySearch = async function(request, response, next){
	if(!request.body) return next(new Error('no data!'))
	let error = await connectDb();
	if(error instanceof Error) next(error)
	
	//Передача массива, сосержащего только id ключей
	await KeySearch.deleteMany({_id: { $in:request.body }}).then(function(data){
		disconnectDb();
		response.status(200);
		response.json(data);
	}).catch(function(error){
		disconnectDb();
		console.log(error)
		next(new Error('error delete Key in db'))
	});
}

exports.getUrlApi = async function(request, response, next){
	if(!request.body.conf) return next(new Error('no data!'))
    let error = await connectDb();
    if(error instanceof Error) next(error)

	// Получение и преобразование запросов для поиска URL
    const keyQueryObj = await KeySearch.find({});
    const arrayQuery = keyQueryObj.map((el)=>{
        return el.key;
    })
	
	try {
		// Получение функуции api для запросов или ошибки
		const apiSearch = apiSwitchConnector(request.body.conf);
		if (apiSearch.error !== null || apiSearch.func === null) {
			console.log(apiSearch)
			response.status(400);
			response.json({mess: 'нет подходящих Api'});
			return
		}
		
		// Создаём задание
		const newStatusSearch = new StatusSearch({
			status: "search",
		});

		//Сохранение
		newStatusSearch.save().then((data) => {
			// Если Ок то =>
			// Загрузка ссылок частями через полученную api фукцию
			response.status(200);
			response.json(data);
			runSearchUrl(arrayQuery, apiSearch.func, data._id);

		}).catch((err)=>{
			if (err) return next(err);
		});
		
	} catch (e) {
		await disconnectDb();
		next(e)
	}
};

async function runSearchUrl(arrayQuery, apiSearch, idStatusSearch) {
	//Делим задачу на итерации
	const sliceQuery = 5;
	const countQuery =  arrayQuery.length;
	let iterate = Math.ceil(countQuery/sliceQuery);
	let logError = [];
	let statusSearch;
	//считаем колличество новых url
	let countNewUrl = 0;

	while(iterate > 0) {
		let lastQuery = arrayQuery.slice(-sliceQuery);
		await apiSearch(lastQuery)
			.then((url)=>{
				//удаляем последние 5 элементов с исходного массива
				arrayQuery.splice(-sliceQuery)
				iterate--;
				
				//Считаем колличество новых URl
				let lengthNewUrl = typeof url.length === 'number' ? url.length : 0;
				countNewUrl = countNewUrl + lengthNewUrl;
				//Сохранение url
				saveNewUrl(url, idStatusSearch);
			})
			.catch((err)=>{
				iterate = 0;
				logError.push(err)
			});
	}
	
	//Проверка на наличие ошибок и обновление статуса задачи
	statusSearch = logError.length !== 0 ? "failed" : "completed";
	const errorMess = logError.length !== 0 ? logError.pop().message : "";
	return await updateSearchStatus(idStatusSearch, statusSearch, errorMess, countNewUrl);
}

async function updateSearchStatus(idStatus, status, error, countNewUrl){
	const searchStatus = {
		completed: Date.now(),
		status: status,
		urls: countNewUrl,
		error: error
	}
	//частично обновляем статус
	await StatusSearch.updateOne({ _id: idStatus._id }, searchStatus).catch(function(error){
		console.log(error)
		return new Error('Ошибка обновления статуса добавления новых Url')
	});

	return searchStatus;
}

async function saveNewUrl(url = [], id) {
	let newUrl = url.map((elem)=>{
		elem.status_search_id = id;
		return elem
	})
	
	return await UrlNew.insertMany(newUrl).catch(function(error){
	   return new Error('error save new url in db - ' + error.message)
	});
}

function apiSwitchConnector(apiSetting = {}) {
	const api = apiSetting?.api !== undefined ? apiSetting.api : '';
	const config = apiSetting?.config !== undefined ? apiSetting.config : {};
	switch (api) {
		case 'Xmlriver':
			const func = apiXMLRiver(config)
			return {func, error: null}
		default:
			return {func: null, error: 'нет подходящих Api'}
	}
}


// arrayKey - слова для поиска нужных ссылок
// config.search - API ссылка для подключения к одну из поскивиков, берём из кабинета XMLRiver
function apiXMLRiver(config = {}) {
	const search = config?.search !== undefined ? config.search : '';
	const user = config?.user !== undefined ? config.user : '';
	const key = config?.key !== undefined ? config.key : '';
	
	let URL = null;
	switch (search) {
		case 'google':
			URL = `http://xmlriver.com/search/xml?user=${user}&key=${key}`;
			break;
		default:
			break;
	}
	//Если не указан поисковик возвращаем null
	if(URL === null) return null
	
	//Возврат функции с преднастройкой api
	return async function (arrayKey) {
		try {
			const res = await Promise.all(arrayKey.map(async query => {
				const xml = await getXmlPage(URL + `&query=${query}`)
				if(typeof xml !== 'string') throw new Error('ответ от xmlriver отличный от xml')
				
            // Разбираем XMl на объект и вытаскиваем url 
				const jObj = convert.xml2js(xml, {compact: true, spaces: 4});
				const arrayObjUrl = jObj.yandexsearch.response.results.grouping.group;
				return arrayObjUrl.map((objElem)=> {
					return {url: objElem.doc.url._text}
				})
			}));
			return res.flat()
		}catch (error) {
			throw new Error(error.message + ' - ошибка в запросе к xmlriver')
		}
	}
}

const getXmlPage = async (url) => {
	axios.defaults.headers.get['Accept'] = 'application/xml';
	return await axios.get(url)
		.then(res => {
			return res.data
		})
		.catch(err => {
			return err
		})
}

// Функция форматированния строки в массив значений, разделённых ","
class FormattingDataForm {
	constructor(data = "") {
		this.data = data;
		this.res = [];
		this.status = this.formatting();
	}

	formatting() {
		const arrayData = this.data.split(",");
		debugger
		for(let key of arrayData) {
			let newKey = key.replace(/[&\/\\#,()$~%.'":*?<>{}]/g, '').trim();
			if(newKey.length !== 0) this.res.push(newKey);
		}
		return this.res.length !== 0
	}

	getData() {
		return this.res;
	}

	getStatus() {
		return this.status;
	}
}
