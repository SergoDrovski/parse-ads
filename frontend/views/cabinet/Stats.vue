<template>
	<div :class="['bg-white', 'rounded', 'shadow-md', 'overflow-auto', {'p-4': !allStats}]">
		<div v-if="errors">{{ errors }}</div>
		<table v-else class="shadow-sm overflow-hidden w-full">
			<thead>
				<tr class="bg-slate-50 h-[60px]">
					<th class="border-b font-medium p-2 text-gray-600 text-center">
						Статус
					</th>
					<th class="border-b font-medium py-2 text-gray-600 text-center">
						Реклама
					</th>
					<th class="border-b font-medium py-2 text-gray-600">
						URLs
					</th>
					<th class="border-b font-medium py-2 text-gray-600">
						Ошибка
					</th>
					<th class="border-b font-medium py-2 text-gray-600 text-left">
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
				<router-link 
					v-for="item in allStats" 
					:key="item._id"
					:to="{ name: 'cabinet:task:url', params: { id: item._id } }"
					class="contents"
				>
					<tr class="align-middle hover:bg-slate-200">
						<td class="border-b border-slate-100 py-4 text-slate-500 text-center">
							<span 
								:class="['text-gray-400', { '!text-orange-400': item.status == 'failed' }]"
								:title="item.status"
							>
								<BaseIcon 
									v-if="item.status != 'check'"
									:name="item.status === 'failed' ? 'exclamation-circle' : 'check-circle'"
									class="w-6 h-6 mx-auto"
								/>
								<BaseIcon v-else name="bolt" class="w-6 h-6 text-pink-600" />
							</span>
						</td>
						<td class="border-b border-slate-100 py-4 text-slate-500 text-center">
							<BaseIcon 
								:name="!!item.ads_exist ? 'face-smile' : 'x-mark'" 
								:class="['w-6', 'h-6', 'text-red-600', 'mx-auto', { '!text-green-600': !!item.ads_exist }]" 
							/>
						</td>
						<td class="border-b border-slate-100 py-4 text-slate-500 text-center">
							{{ item.urls }}
						</td>
						<td class="border-b border-slate-100 py-4 text-slate-500 text-center">
							<div v-if="item.error" class="truncate" style="max-width: 30vw;">
								{{ item.error }}
							</div>
							<div v-else>-</div>
						</td>
						<td class="border-b border-slate-100 py-4 text-slate-500">
							{{ new Date(item.created).toLocaleString() }}
						</td>
						<td class="border-b border-slate-100 py-4 text-slate-500">
							{{ new Date(item.completed).toLocaleString() }}
						</td>
						<td class="border-b border-slate-100 py-4 text-slate-500 text-center">
							<!-- {{
								((new Date(item.completed).getTime() - new Date(item.created).getTime()) / 1000).toFixed(0)
							}} сек. -->
							{{ secondsToHms(((new Date(item.completed).getTime() - new Date(item.created).getTime()) / 1000).toFixed(0)) }}
						</td>
					</tr>
				</router-link>
			</tbody>
		</table>
	</div>
</template>

<script setup>
import { ref } from "@vue/reactivity"
import useApi from "@/use/api.js"
import secondsToHms from "@/helpers/secondsConvert";
import { onErrorCaptured } from "vue";

const { fetchStats, errors } = useApi()
const allStats = ref(null)

onErrorCaptured((err) => {
	console.log('onErrorCaptured:', err)
	return true
})

allStats.value = (await fetchStats())?.reverse()
</script>
