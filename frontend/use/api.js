import { ref } from "@vue/reactivity"
import { useToast } from 'vue-toastification'

const { DEV } = import.meta.env
const API_PATH = DEV ? `http://localhost:3000` : window.location.origin

const Toast = useToast()

export default function useApi() {
	const isLoading = ref(false)
	const errors = ref(null)

	const useFetch = async (endpoint, params = {}) => {
		const defaultParams = { method: 'GET' }

		try {
			isLoading.value = true
			const res = await fetch(API_PATH + endpoint, { ...defaultParams, params })
			const data = await res.json()
			
			return data
		} catch (error) {
			console.error('useApi error:', error)
			errors.value = error

			Toast.error(error.message, { closeButton: false })

			return errors.value
		} finally {
			isLoading.value = false
		}
	}

	const fetchStats = async () => {
		const response = await useFetch('/cabinet/stats')
		// console.log(response);
		return response ? response.dbTask : response
	}

	const fetchTaskById = async (id) => {
		return await useFetch(`/cabinet/task/${id}`)
	}

	const fetchTaskUrlById = async (id) => {
		return await useFetch(`/cabinet/task/${id}/url`)
	}

	return { fetchStats, fetchTaskById, fetchTaskUrlById, isLoading, errors }
}