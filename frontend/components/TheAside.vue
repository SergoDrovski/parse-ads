<template>
	<aside class="z-20 hidden w-64 overflow-y-auto bg-white md:block flex-shrink-0 shadow-md">
		<div class="py-4 text-gray-500">
			<router-link to="/" class="ml-6 text-lg font-bold text-gray-800">
				parse-ads
			</router-link>
			<ul class="mt-6 pb-12">
				<AsideLink to="/cabinet/stats" name="Статистика" icon="chart-bar" />
				<AsideLink to="/cabinet/task/1" name="Задача 1" icon="document" />
				<AsideLink to="/cabinet/task/1/url" name="Задача 1 [URL]" icon="document-text" />
				<AsideLink to="/cabinet/integrations" name="Интеграции" icon="cube" />
				<AsideLink to="/cabinet/start/task" name="Запуск новой задачи" icon="cog-6-tooth" />
				
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
		</div>
	</aside>
</template>

<script setup>
import AsideLink from '@/components/AsideLink.vue'
</script>