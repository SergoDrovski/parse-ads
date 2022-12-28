<template>
	<div :class="['bg-white', 'rounded', 'shadow-md', 'overflow-auto', {'p-4': !allStats}]">
		<div v-if="!allStats && !isLoading">Нет данных</div>
		<div v-else-if="!allStats && isLoading">Загрузка ...</div>
		<div v-else-if="!isLoading && errors">{{ errors }}</div>
		<table v-else class="shadow-sm overflow-hidden w-full">
			<thead>
				<tr class="bg-slate-50 h-[60px]">
					<th class="border-b font-medium p-2 text-gray-600 text-center">
						Статус
					</th>
					<th class="border-b font-medium p-2 text-gray-600 text-center">
						Реклама
					</th>
					<th class="border-b font-medium p-2 text-gray-600">
						URLs
					</th>
					<th class="border-b font-medium p-2 text-gray-600">
						Ошибка
					</th>
					<th class="border-b font-medium p-2 text-gray-600 text-left">
						Создание
					</th>
					<th class="border-b font-medium p-2 text-gray-600 text-left">
						Завершение
					</th>
					<th class="border-b font-medium p-2 text-gray-600">
						Потрачено
					</th>
				</tr>
			</thead>
			<tbody class="bg-white">
				<router-link v-for="item in allStats" :key="item._id"
					:to="
						item.status == 'failed' 
							? { name: 'cabinet:task:id', params: { id: item._id } } 
							: { name: 'cabinet:task:url', params: { id: item._id } }
					"
					class="contents">
					<tr class="align-middle hover:bg-slate-200">
						<td class="border-b border-slate-100 py-4 text-slate-500 text-center">
							<span class="text-green-600" :class="{ '!text-red-600': item.status == 'failed' }"
								:title="item.status">
								<BaseIcon :name="item.status === 'failed' ? 'exclamation-circle' : 'check-circle'"
									class="w-6 h-6 m-auto" />
							</span>
						</td>
						<td class="border-b border-slate-100 py-4 text-slate-500 text-center">
							{{ item.ads_exist ? "Да" : "Нет" }}
						</td>
						<td class="border-b border-slate-100 py-4 text-slate-500 text-center">
							{{ item.urls }}
						</td>
						<td class="border-b border-slate-100 py-4 text-slate-500">
							<div class="truncate" style="max-width: 30vw;">
								{{ item.error }}
							</div>
						</td>
						<td class="border-b border-slate-100 py-4 text-slate-500">
							{{ new Date(item.created).toLocaleString() }}
						</td>
						<td class="border-b border-slate-100 py-4 text-slate-500">
							{{ new Date(item.completed).toLocaleString() }}
						</td>
						<td class="border-b border-slate-100 py-4 text-slate-500 text-center">
							{{
								((new Date(item.completed).getTime() - new Date(item.created).getTime()) / 1000).toFixed(1)
							}} сек.
						</td>
					</tr>
				</router-link>
			</tbody>
		</table>
	</div>
</template>

<script setup>
import { ref } from "@vue/reactivity"
import { onMounted } from "vue"

import useApi from "@/use/api.js"
const { fetchStats, isLoading, errors } = useApi()

const allStats = ref(null)

onMounted(async () => {
	allStats.value = await fetchStats();
})
</script>
