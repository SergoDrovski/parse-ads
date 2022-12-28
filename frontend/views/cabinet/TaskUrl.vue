<template>
	<div class="bg-white rounded shadow-md p-4">
		<h1 v-if="!task && isLoading" class="text-2xl">Loading ...</h1>
		<div v-if="!task || errors" class="text-2xl">{{ errors }}</div>
		<div v-else class="m-4">
			<ul class="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
				<li 
					v-for="(item, key) in task" 
					:key="key" 
					class="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg flex gap-4 justify-between"
				>
					<span>{{ key }}</span>

					<span v-if="key == 'url'">
						<a :href="item" target="_blank" class="text-blue-500">{{ item }}</a>
					</span>
					<span v-else-if="key == 'created' || key == 'completed'">
						{{ new Date(item).toLocaleString() }}
					</span>
					<span v-else>{{ `${item}` }}</span>
				</li>
			</ul>
		</div>

		<!-- temp -->
		<div>
			task: <br>
			<pre>{{ task }}</pre>
			<hr class="my-4">
			taskSource: <br>
			<pre>{{ taskSource }}</pre>
		</div>
	</div>
</template>

<script setup>
import { ref, computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router'
import useApi from "@/use/api.js";

const { fetchTaskUrlById, isLoading, errors } = useApi();

const route = useRoute()
const id = computed(() => route.params.id)
const task = ref(null)
const taskSource = ref(null)

onMounted(async () => {
	const data = await fetchTaskUrlById(id.value)
	task.value = data?.at(-1)
	taskSource.value = data
})
</script>