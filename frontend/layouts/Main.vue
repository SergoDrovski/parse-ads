<template>
	<div class="flex h-screen bg-gray-100">
		<TheAside />
		
		<div class="flex flex-col flex-1">
			<TheHeader />
			
			<main class="h-full pb-16 overflow-y-auto">
				<div class="container px-6 mx-auto grid">
					<router-view v-slot="{ Component }">
						<Transition name="fade" mode="out-in">
							<component :is="Component" :key="$route.path"></component>
						</Transition>
					</router-view>
				</div>
			</main>
		</div>
	</div>
</template>

<script setup>
import TheHeader from '@/components/TheHeader.vue'
import TheAside from '@/components/TheAside.vue'
</script>