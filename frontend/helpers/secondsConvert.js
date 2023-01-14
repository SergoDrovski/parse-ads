const secondsToHms = (s) => {
	const time = {
		h: (s - (s % 3600)) / 3600,
		m: ((s - (s % 60)) / 60) % 60,
		s: s % 60,
	}

	let str = ''

	Object.entries(time).forEach(([key, v], _) => str += v + key + ' ')

	return str.replace('0h', '').replace('0m', '')
}

export default secondsToHms;
