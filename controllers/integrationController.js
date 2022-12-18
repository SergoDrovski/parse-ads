const { connectDb, disconnectDb } = require('../libs/mongoos.js');
const UrlNew = require('../models/urlNew.js').model;
const fs = require('fs')
const path = require('path');


exports.getApiUrl = async function(request, response, next){
    let error = await connectDb();
    if(error instanceof Error) next(error)

    const arrayUrl = await ApiYandexTest();

    const arrayModel = arrayUrl.map((el)=>{
        return { url: el }
    })

    await UrlNew.insertMany(arrayModel).then(function(){
        disconnectDb();
        response.status(200);
        response.json({mess: true});
    }).catch(function(error){
        disconnectDb();
        console.log(error)
        next(new Error('error save new url in db'))
    });
};

async function ApiYandexTest() {
    const urlTextFile = fs.readFileSync(path.join(__dirname,'url.txt' )).toString().split("\n");
    return urlTextFile;
}


// function genStr(len) {
//     let chrs = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789';
//     let str = '';
//     for (let i = 0; i < len; i++) {
//         let pos = Math.floor(Math.random() * chrs.length);
//         str += chrs.substring(pos,pos+1);
//     }
//     return str;
// }

// async function ApiYandexTest() {
//     const generateArray =  new Array(100)
//     for (let i=0; i < generateArray.length; i++) {
//         let domen = genStr(6);
//         let hash = genStr(12);
//         generateArray[i] = `https://www.${domen}.com/${hash}/`;
//     }
//
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(generateArray)
//         }, 3000)
//     })
// }
