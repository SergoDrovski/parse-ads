import { ref } from "vue"
import { useToast } from "vue-toastification"

const { DEV } = import.meta.env
const API_PATH = DEV ? `http://localhost:3000` : window.location.origin

const Toast = useToast()

const error = ref(null)
const isLoading = ref(false)

const useFetch = async (endpoint = '', params = {}) => {
	const defaultParams = {
		method: "GET",
		headers: { 
			"Accept": "application/json", 
			"Content-Type": "application/json"
		},
	}

	try {
		isLoading.value = true

		const res = await fetch(API_PATH + endpoint, { ...defaultParams, ...params })
		const response = await res.json()
		
		if (response.error) {
			error.value = response.error
		}

		console.log('response:', response);

		return response.data
	} catch (error) {
		console.error('useFetch error:', error)
		error.value = error

		Toast.error(error.value, { timeout: 10000, closeButton: false, closeOnClick: false })

		return error.value
	} finally {
		isLoading.value = false

		if (error.value) {
			Toast.warning(error.value.message, { timeout: 5000, closeButton: false })
			error.value = null
		}
	}
}

export default { useFetch, errors: error, isLoading }