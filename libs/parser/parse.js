const {usePuppeteer} = require("./usePuppeteer");

exports.parse = async function parse(array){
    const usePupp = await usePuppeteer()
    return await usePupp.checker(array)
}

// {
//     _id: elem._id,
//         url: elem.url,
//     created: elem.created,
//     include: index % 2 === 0
// }