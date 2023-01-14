import { ref } from "@vue/reactivity"
import { useToast } from 'vue-toastification'
import useFetch from './fetch.js'

const Toast = useToast()

export default function useIntegration() {
	const isLoading = ref(false)
	const errors = ref(null)

	const saveNewKeys = async (string = '') => {
		if (!string.length) {
			Toast.error('Заполните форму для ключей!', { closeButton: false })
			return { status: false }
		}

		const params = {
			method: 'POST',
			body: JSON.stringify({ keys: string })
		}
		return await useFetch(`/integration/set-key`, params)
	}

	const deleteKeys = async (ids = []) => {
		const params = {
			method: 'DELETE',
			body: JSON.stringify(ids)
		}
		return await useFetch(`/integration/delete-key`, params)
	}

	const getAllKeys = async () => {
		return await useFetch(`/integration/get-key`)
	}

	return { saveNewKeys, getAllKeys, deleteKeys, isLoading, errors }
}