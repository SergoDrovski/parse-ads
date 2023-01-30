import { useToast } from 'vue-toastification'
import customFetch from './fetch.js'

const Toast = useToast()

export default function useIntegration() {
	const saveNewKeys = async (string = '') => {
		if (!string.length) {
			Toast.error('Заполните форму для ключей!', { closeButton: false })
			return { status: false }
		}

		const params = {
			method: 'POST',
			body: JSON.stringify({ keys: string })
		}
		return await customFetch.useFetch(`/integration/set-key`, params)
	}

	const deleteKeys = async (ids = []) => {
		const params = {
			method: 'DELETE',
			body: JSON.stringify(ids)
		}
		return await customFetch.useFetch(`/integration/delete-key`, params)
	}

	const getAllKeys = async () => {
		return await customFetch.useFetch(`/integration/get-key`)
	}

	return { saveNewKeys, getAllKeys, deleteKeys, errors: customFetch.errors, isLoading: customFetch.isLoading  }
}