const { connectDb, disconnectDb } = require('../libs/mongoos.js');
const UrlNew = require('../models/urlNew.js').model;
const KeySearch = require('../models/keySearch.js').model;
const axios = require("axios");

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

    await KeySearch.insertMany(arrayModel).then(function(data){
        disconnectDb();
        response.status(200);
        response.json({status: true, formattingData: data});
    }).catch(function(error){
        disconnectDb();
        console.log(error)
        next(new Error('error save new Key in db'))
    });
};

exports.getApiUrl = async function(request, response, next){
    let error = await connectDb();
    if(error instanceof Error) next(error)

    const key = await KeySearch.find({});
    const arrayKey = key.map((el)=>{
        return el.key;
    })

    const arrayUrl = await ApiXMLRiver(arrayKey);

    // const arrayModel = arrayUrl.map((el)=>{
    //     return { url: el }
    // })

    await UrlNew.insertMany(arrayUrl).then(function(){
        disconnectDb();
        response.status(200);
        response.json({mess: true});
    }).catch(function(error){
        disconnectDb();
        console.log(error)
        next(new Error('error save new url in db'))
    });
};

async function ApiXMLRiver(arrayKey) {
    let url = '';
    return await axios.get(url)
		.then(res => {
			return { valid: true, status: res.status }
		})
		.catch(err => {
			return { valid: false, status: err.status }
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
