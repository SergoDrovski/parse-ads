<template>
	<div class="max-h-[80vh] bg-white rounded p-4 shadow-md">
		<div class="h-10 flex items-center justify-between gap-4">
			<h2 class="font-bold text-xl">Все ключи</h2>
			<base-button 
				v-if="selectedKeys.length"
				@handlerClick="$emit('handlerDelete', selectedKeys)" 
				class="!py-1 !px-2 !rounded" 
				color="danger" 
				title="Удалить"
			>
				Удалить выбранные
			</base-button>
		</div>
		<div class="relative">
			<input
				v-model="searchQuery"
				@keyup.esc="searchQuery = ''"
				type="text" 
				placeholder="Поиск"
				class="block w-full px-4 py-2 pr-10 mb-2 rounded border border-slte-300 focus:outline-none focus:border-slate-400 transition-colors"
			/>
			<base-button 
				v-if="searchQuery.length"
				@handler-click="searchQuery = ''"
				class="p2 block w-max bg-none border-none absolute top-[10px] right-2" 
				style="line-height: normal;"
				reset-classes
			>
				<BaseIcon name="x-mark" />
			</base-button>
		</div>

		<div v-if="computedKeys.length" class="max-h-[85%] mt-2 overflow-auto">
			<div 
				v-for="item in computedKeys" 
				:key="item._id" 
				class="p-2 flex items-center gap-4 border-b hover:bg-slate-200 last:border-b-0"
			>
				<input 
					v-model="selectedKeys"
					:value="item._id"
					type="checkbox" 
					class="block w-4 h-4 border border-gray-400"
				/>
				<div class="flex items-center justify-between gap-4 w-full">
					<div>
						<div class="text-sm text-gray-900 font-semibold">Создан {{ new Date(item.created).toLocaleString() }}</div>
						<div class="text-gray-600">{{ item.key }}</div>
					</div>
					<div class="flex gap-4">
						<base-button @handlerClick="$emit('handlerEdit', item._id)" class="!p-1 !rounded" color="secondary" title="Изменить">
							<BaseIcon name="pencil" class="w-4 h-4" />
						</base-button>
					</div>
				</div>
			</div>
		</div>
		<div v-else>Нет ключей</div>
	</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

defineEmits(['handlerEdit', 'handlerDelete'])

const props = defineProps({
	keys: {
		type: Array,
		required: true,
		default: []
	}
})

const searchQuery = ref('')

// сортировку исправить
const selectedKeys = ref([])
const computedKeys = computed(() => {
	const sorted = props.keys
		.sort((a, b) => a.created - b.created)

	return !searchQuery.value.length
		? sorted 
		: sorted.filter(item => item.key.indexOf(searchQuery.value) !== -1)
})

watch(computedKeys, () => {
	selectedKeys.value = []
})
</script>