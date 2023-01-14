<template>
	<div class="bg-white rounded p-4 shadow-md overflow-auto">
		<div v-if="errors">{{ errors }}</div>
		<div v-else>
			<span>Source</span>
			<pre class="p-2 rounded bg-orange-100 overflow-auto">{{ task }}</pre>

			<span class="block mt-6">Error</span>
			<p v-if="task?.error" class="mt-2 p-2 bg-red-200 rounded">{{ task.error?.replaceAll('\n', ' ') }}</p>
		</div>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref } from '@vue/reactivity'
import useApi from '@/use/api.js';

const route = useRoute()

const { fetchTaskById, errors } = useApi()
const task = ref(null)

task.value = await fetchTaskById(route.params.id)
</script>