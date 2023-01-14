<template>
	<div class="bg-white rounded p-4 shadow-md">
		<h2 class="font-bold text-xl">Добавить новые ключи</h2>
		<form @submit.prevent="handlerNewKeys" class="mt-4">
			<label for="keys">Введите новые ключи, разделяя каждый ключ запятой</label>
			<textarea
				v-model="keys"
				name="keys"
				id="keys"
				cols="30"
				rows="10"
				class="border border-slate-200 rounded p-2 w-full focus:border-slate-400 focus:outline-none transition-colors"
			></textarea>
			<base-button
				type="submit"
				:disabled="isLoading"
				:class="[
					'flex',
					'items-center',
					'gap-2',
					'px-2',
					'py-1',
					{
						'!bg-slate-200 !border-slate-200 !text-black': isLoading,
					},
				]"
			>
				<BaseIcon
					v-show="isLoading"
					name="arrow-path"
					class="w-4 h-4 animate-spin"
				/>
				<BaseIcon v-show="!isLoading" name="cloud-arrow-up" />
				<span>{{ isLoading ? "Подождите ..." : "Отправить" }}</span>
			</base-button>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification'
import useIntegration from '@/use/api_integration.js'

const emit = defineEmits(['updateAllKeys'])

const Toast = useToast()
const { saveNewKeys, isLoading } = useIntegration()
const keys = ref('')

const handlerNewKeys = async () => {
	const resKeys = await saveNewKeys(keys.value)
	console.log('resKeys:', resKeys)

	if (resKeys.status) {
		emit('updateAllKeys')
		keys.value = ''
		Toast.success('Ключи добавлены в базу')
	}
}
</script>
