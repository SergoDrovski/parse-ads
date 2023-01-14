<template>
	<div class="max-h-[80vh] bg-white rounded p-4 shadow-md">
		<div class="h-10 flex items-center justify-between gap-4">
			<h2 class="font-bold text-xl">Все ключи</h2>
			<base-button 
				v-if="selectedKeys.length"
				@handlerClick="$emit('handlerDelete', selectedKeys)" 
				class="!py-1 !px-2 rounded" 
				color="danger" 
				title="Удалить"
			>
				Удалить выбранные
			</base-button>
		</div>
		<div v-if="computedKeys.length" class="max-h-[90%] mt-2 overflow-auto">
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
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';

defineEmits(['handlerEdit', 'handlerDelete'])

const props = defineProps({
	keys: {
		type: Array,
		required: true,
		default: []
	}
})

const selectedKeys = ref([])
const computedKeys = computed(() => props.keys.reverse())
</script>