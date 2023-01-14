<template>
	<aside class="z-20 hidden w-64 overflow-y-auto bg-white md:block flex-shrink-0 shadow-md">
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
				<base-button @handler-click="start" color="success">
					<BaseIcon name="rocket-launch" />
					<span class="ml-2">Запустить задачу</span>
				</base-button>
				<base-button @handler-click="stop" color="secondary">
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

const start = () => console.log('start task')
const stop = () => console.log('stop task')
</script>