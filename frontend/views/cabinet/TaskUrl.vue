<template>
	<div :class="['overflow-auto', { 'p-4': errors || !taskUrls?.length }]">
		<div v-if="errors" class="text-2xl">{{ errors }}</div>
		<div v-else-if="taskUrls?.length" class="shadow-sm overflow-auto w-full">
			<div class="mb-4 p-4 bg-white rounded shadow-sm">
				<pre v-if="task.error" class="bg-red-100 rounded overflow-auto p-2">{{ task.error }}</pre>
				<div class="flex flex-wrap gap-6 text-[#444]">
					<div>
						Создание <strong>{{ new Date(task.created).toLocaleString() }}</strong>
					</div>
					<div>
						Завершение <strong>{{ new Date(task.completed).toLocaleString() }}</strong>
					</div>
					<div>Статус <strong>{{ task.status }}</strong></div>
					<div>URLs <strong>{{ task.urls }}</strong></div>
					<div>ads_exist <strong>{{ task.ads_exist }}</strong></div>
					<div>ads_not_exist <strong>{{ task.ads_not_exist }}</strong></div>
					<div>ID <strong class="text-sm">{{ task._id }}</strong></div>
				</div>				
			</div>
			<div class="bg-white shadow-sm rounded overflow-hidden">
				<table class="w-full">
					<thead>
						<tr class="bg-slate-50 h-[60px]">
							<th class="border-b font-medium p-2 text-gray-600 text-center">
								<span class="px-2">#</span>
							</th>
							<th class="border-b font-medium p-2 text-gray-600 text-center">
								URL
							</th>
							<th class="border-b font-medium p-2 text-gray-600">
								ads_name
							</th>
							<th class="border-b font-medium p-2 text-gray-600">
								ads_exist
							</th>
							<th class="border-b font-medium p-2 text-gray-600 text-center">
								pattern_find
							</th>
							<!-- <th class="border-b font-medium p-2 text-gray-600 text-left">
								is_valid_link
							</th> -->
							<th class="border-b font-medium p-2 text-gray-600">
								page_status
							</th>
							<th class="border-b font-medium p-2 text-gray-600">
								created
							</th>
							<th class="border-b font-medium p-2 text-gray-600">
								<span class="px-2">completed</span>
							</th>
						</tr>
					</thead>
					<tbody class="bg-white">
						<tr
							v-for="(task, idx) in taskUrls"
							:key="task._id"
							class="align-middle hover:bg-slate-200"
						>
							<td class="border-b border-slate-100 py-4 text-slate-500 text-center">
								<!-- <span class="max-w-[100px] block overflow-auto">
									{{ task._id }}
								</span> -->
								{{ idx +1 }}
							</td>
							<td class="max-w-[300px] border-b border-slate-100 py-4 text-slate-500">
								<span class="block overflow-auto">
									<a :href="task.url" target="_blank" class="text-blue-500">{{ task.url }}</a>
								</span>
							</td>
							<td class="border-b border-slate-100 py-4 text-slate-500 text-center">
								<span v-if="!!task.ads_name" class="px-2 pb-[1.5px] rounded-md bg-purple-500 text-white text-sm">
									{{ task.ads_name }}
								</span>
								<span v-else>none</span>
							</td>
							<td class="border-b border-slate-100 py-4 text-slate-500">
								<span class="mx-auto block max-w-max">
									<BaseIcon v-if="task.ads_exist" name="check" class="w-6 h-6 text-green-500" />
									<BaseIcon v-else name="x-mark" class="w-6 h-6 text-red-500" />
								</span>
							</td>
							<td class="border-b border-slate-100 py-4 text-slate-500 text-center">
								{{ task.pattern_find ?? 'none' }}
							</td>
							<!-- <td class="border-b border-slate-100 py-4 text-slate-500">
								{{ `${task.is_valid_link}` }}
							</td> -->
							<td class="border-b border-slate-100 py-4 text-slate-500 text-center">
								<span 
									class="text-green-600"
									:class="{ '!text-red-600':task.page_status != 200 }"
								>{{ task.page_status }}</span>
							</td>
							<td class="border-b border-slate-100 py-4 text-slate-500 text-center">
								<span class="block px-2 text-sm text-center">
									{{ new Date(task.created).toLocaleString() }}
								</span>
							</td>
							<td class="border-b border-slate-100 py-4 text-slate-500 text-center">
								<span class="block px-2 text-sm text-center">
									{{ new Date(task.completed).toLocaleString() }}
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div v-else>Здесь пусто</div>
	</div>
</template>

<script>
import { ref, computed } from '@vue/reactivity';
import { useRoute } from 'vue-router'
import useApi from "@/use/api.js";
// import { onErrorCaptured } from 'vue';

export default {
	async setup() {
		const { fetchTaskById, fetchTaskUrlById, errors } = useApi();

		const route = useRoute()
		const id = computed(() => route.params.id)
		const task = ref(null)
		const taskUrls = ref([])

		// onErrorCaptured(() => {
		// 	return errors
		// })

		task.value = await fetchTaskById(id.value)
		taskUrls.value = await fetchTaskUrlById(id.value)

		return { errors, task, taskUrls }
	}
}
</script>