import { ref } from "vue"
import { useToast } from "vue-toastification"

const { DEV } = import.meta.env
const API_PATH = DEV ? `http://localhost:3000` : window.location.origin

const errors = ref(null)
const Toast = useToast()

const useFetch = async (endpoint = '', params = {}) => {
	const defaultParams = {
		method: "GET",
		headers: { 
			"Accept": "application/json", 
			"Content-Type": "application/json"
		},
	}

	// const test = { ...defaultParams, params }
	// console.log('test', test)

	try {
		const res = await fetch(API_PATH + endpoint, { ...defaultParams, ...params })
		const data = await res.json()
		
		return data
	} catch (error) {
		console.error('useFetch error:', error)
		errors.value = error

		Toast.error(error.message, { timeout: 10000, closeButton: false })

		return errors.value
	}
}

export default useFetch