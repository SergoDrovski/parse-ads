<template>
	<div class="grid grid-cols-1 gap-6 xl:grid-cols-2">

		<!-- add keys -->
		<IntegrationAddKeys @update-all-keys="updateList" />

		<!-- list keys -->
		<IntegrationListKeys 
			:keys="allKeys" 
			@handler-edit="handlerEdit" 
			@handler-delete="handlerDelete" 
		/>
	</div>
</template>

<script setup>
import IntegrationAddKeys from '@/components/IntegrationAddKeys.vue'
import IntegrationListKeys from '@/components/IntegrationListKeys.vue'

import { ref } from 'vue'
import useIntegration from '@/use/api_integration.js'
import { useToast } from 'vue-toastification'

const Toast = useToast()
const { getAllKeys, deleteKeys } = useIntegration()
const allKeys = ref([])

allKeys.value = await getAllKeys()
const updateList = async () => {
	allKeys.value = await getAllKeys()
}

const handlerDelete = async (ids = []) => {
	const letsgo = confirm('Вы уверены?')
	if (letsgo) {
		const { deletedCount } = await deleteKeys(ids)
		allKeys.value = await getAllKeys()
		Toast.success(`Ключи успешно удалены (${deletedCount})`)
	}

	// kek
	else {
		confirm('Отменить отмену?')
	}
}

const handlerEdit = (id) => console.log('handlerEditKey', id)
</script>