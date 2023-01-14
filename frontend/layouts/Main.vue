<template>
	<div class="flex h-screen bg-gray-100">
		<TheAside />
		
		<div class="flex flex-col flex-1">
			<TheHeader />
			
			<main class="h-full pb-6 overflow-y-auto">
				<div class="container p-6 mx-auto grid max-w-full">
					<router-view v-slot="{ Component }">
						<template v-if="Component">
							<Transition name="fade" mode="out-in">
								<keep-alive :max="5">
									<Suspense :timeout="0">
										<template #default>
											<component :is="Component" :key="$route.path"></component>
										</template>

										<template #fallback>
											<breeding-rhombus-spinner
												:animation-duration="2000"
												:size="65"
												:key="Component"
											/>
										</template>
									</Suspense>
								</keep-alive>
							</Transition>
						</template>
					</router-view>
				</div>
			</main>
		</div>
	</div>
</template>

<script setup>
import TheHeader from '@/components/TheHeader.vue'
import TheAside from '@/components/TheAside.vue'

import { BreedingRhombusSpinner } from 'epic-spinners'
</script>