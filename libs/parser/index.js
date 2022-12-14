const { usePuppeteer } = require("./usePuppeteer.js");

const LINKS = [
	{
		_id: "6383404c5a23e34002f487b4",
		url: 'https://vk.com',
		created: '2022-11-27T10:47:40.164Z',
		__v: 0
	},
	{
		_id: "6383404c5a23e3421002f487b4",
		url: 'https://adsads32dsddfaez.com',
		created: '2022-11-27T10:47:40.164Z',
		__v: 0
	},
	{
		_id: "6383404c5a23e34002f487b4",
		url: 'https://progorod33.ru/news/70985',
		created: '2022-11-27T10:47:40.164Z',
		__v: 0
	},
	{
		_id: "6383404c5a23e34002f487b4",
		url: 'https://adyrna.kz/post/140456',
		created: '2022-11-27T10:47:40.164Z',
		__v: 0
	},
]

async function main() {
	const usePupp = await usePuppeteer()

	const result_check = await usePupp.checker(LINKS)
	console.log('result_check:', result_check)
}
main().catch((err) => {
	console.log('index catch', err)
})