import { ref } from "@vue/reactivity"
// import { useToast } from 'vue-toastification'
import customFetch from './fetch.js'

// const { DEV } = import.meta.env
// const API_PATH = DEV ? `http://localhost:3000` : window.location.origin

// const Toast = useToast()

export default function useApi() {
	const isLoading = ref(false)
	const errors = ref(null)

	// const useFetch = async (endpoint, params = {}) => {
	// 	const defaultParams = { method: 'GET' }

	// 	try {
	// 		isLoading.value = true
	// 		const res = await fetch(API_PATH + endpoint, { ...defaultParams, params })
	// 		const data = await res.json()
			
	// 		return data
	// 	} catch (error) {
	// 		console.error('useApi error:', error)
	// 		errors.value = error

	// 		Toast.error(error.message, { closeButton: false })

	// 		return errors.value
	// 	} finally {
	// 		isLoading.value = false
	// 	}
	// }

	const fetchStats = async () => {
		const { dbTask: tasks } = await customFetch.useFetch('/cabinet/stats')
		return tasks
	}

	const fetchTaskById = async (id) => {
		return await customFetch.useFetch(`/cabinet/task/${id}`)
	}

	const fetchTaskUrlById = async (id) => {
		return await customFetch.useFetch(`/cabinet/task/${id}/url`)
	}

	const checkRunningTask = async () => {
		return await customFetch.useFetch('/cabinet/check-task')
	}

	const taskStart = async () => {
		return await customFetch.useFetch('/cabinet/start/task')
	}

	const taskStop = async () => {
		return await customFetch.useFetch('/cabinet/stop/task')
	}

	return { 
		fetchStats, 
		fetchTaskById, 
		fetchTaskUrlById, 
		checkRunningTask,
		taskStart,
		taskStop,

		isLoading, errors 
	}
}