const {usePuppeteer} = require("./usePuppeteer");

exports.parse = async function parse(array){
    const usePupp = await usePuppeteer()
    return await usePupp.checker(array)
}