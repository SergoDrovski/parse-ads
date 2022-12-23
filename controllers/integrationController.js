const { connectDb, disconnectDb } = require('../libs/mongoos.js');
const UrlNew = require('../models/urlNew.js').model;
const KeySearch = require('../models/keySearch.js').model;
const axios = require("axios");
const fs = require('fs');
const path = require('path');

exports.setKeySearch = async function(request, response, next){
    let error = await connectDb();
    if(error instanceof Error) next(error)

    const arrayKey = await getKeyInReq(request);

    const arrayModel = arrayKey.map((el)=>{
        return { key: el }
    })

    await KeySearch.insertMany(arrayModel).then(function(){
        disconnectDb();
        response.status(200);
        response.json({mess: true});
    }).catch(function(error){
        disconnectDb();
        console.log(error)
        next(new Error('error save new Key in db'))
    });
};
async function getKeyInReq(request) {
    return [
        'без рецепта',
        'вкусные +и простые рецепты',
        'вкусные рецепты',
        'вкусные рецепты +с фото',
        'говядина рецепты',
        'домашние рецепты',
        'домашние рецепты +с фото',
        'классический рецепт',
        'печень рецепт',
        'пошаговый рецепт'
    ];
}

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
// async function ApiYandexTest() {
//     return fs.readFileSync(path.join(__dirname,'url.txt' )).toString().split("\n");
// }
