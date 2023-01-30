<template>
	<aside 
		:class="[
			'z-20 hidden w-64 overflow-y-auto bg-white md:block flex-shrink-0 shadow-md', 
			{ '!block fixed h-full top-16 border-t border-gray-200':isActiveNav }
		]"
	>
		<div class="py-4 text-gray-500 pb-16">
			
			<!-- LOGO -->
			<router-link to="/" class="ml-6 text-lg font-bold text-gray-800">
				parse-ads
			</router-link>
			<!-- //LOGO -->

			<!-- MAIN NAVIGATION -->
			<ul class="mt-6 mb-8">
				<AsideLink to="/cabinet/stats" name="Статистика" icon="chart-bar" />
				<AsideLink :to="{ name: 'cabinet:integration' }" name="Интеграция" icon="cube" />
				
				<!-- exit link -->
				<div class="fixed flex items-center grow bottom-0 h-12 w-64 bg-white border-t border-t-gray-300">
					<AsideLink 
						to="/auth/login" 
						name="Выйти" 
						icon="arrow-left" 
						custom-classes="text-red-600 hover:text-red-800" 
						class="w-full" 
					/>
				</div>
			</ul>
			<!-- //MAIN NAVIGATION -->

			<!-- START & STOP BUTTONS -->
			<div class="flex flex-col justify-center gap-4 px-4">
				<base-button @handler-click="start" :color="isRunningTask ? 'secondary' : 'success'" :disabled="isRunningTask">
					<BaseIcon name="rocket-launch" />
					<span class="ml-2">Запустить задачу</span>
				</base-button>
				<base-button @handler-click="stop" :color="isRunningTask ? 'info' : 'secondary'" :disabled="!isRunningTask">
					<BaseIcon name="stop" fill="currentColor" />
					<span class="ml-2">Остановить задачу</span>
				</base-button>
			</div>
			<!-- //START & STOP BUTTONS -->

		</div>
	</aside>
</template>

<script setup>
import AsideLink from '@/components/AsideLink.vue'
import { inject, onMounted, ref} from 'vue';
import useApi from '@/use/api.js'

const { checkRunningTask, taskStart, taskStop, fetchStats } = useApi()
const isRunningTask = ref(false)
const iCheck = ref(null)

const start = async () => {
	console.log('start task')
	const res = await taskStart()
	console.log('start response', res)

	await taskChecker()
	setTimeout(fetchStats, 3000)
}

const stop = async () => {
	console.log('stop task')
	const res = await taskStop()
	console.log('stop response', res)
}

const taskChecker = async () => {
	const { inProcess } = await checkRunningTask()
	isRunningTask.value = inProcess

	if (inProcess && !iCheck.value) {
		iCheck.value = setInterval(taskChecker, 5000)
	} else if (!inProcess && iCheck) {
		clearInterval(iCheck.value)
	}
}

const { isActiveNav, toggleNav } = inject('mobile')

onMounted(taskChecker)
</script>