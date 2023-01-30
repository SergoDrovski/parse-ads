<template>
	<header class="z-10 py-4 bg-white shadow-md ">
		<div class="container flex items-center justify-between h-full px-6 mx-auto text-purple-600">
			<!-- Mobile hamburger -->
			<button 
				@click.prevent="toggleNav" 
				class="p-1 -ml-1 mr-5 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
			>
				<svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd"
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
						clip-rule="evenodd"></path>
				</svg>
			</button>

			<!-- Search input -->
			<div class="flex justify-center flex-1 lg:mr-32">
				здесь могут быть какие то ссылки
			</div>

			<ul class="flex items-center flex-shrink-0 space-x-6">

				<!-- Profile menu -->
				<li class="relative">
					<div class="align-middle rounded-full">
						<img 
							class="object-cover w-8 h-8 rounded-full"
							src="https://www.apkdlmod.com/wp-content/uploads/2020/12/kittcat-story-cat-avatar-maker.jpg">
					</div>
				</li>
			</ul>
		</div>
	</header>
</template>

<script setup>
import { inject } from 'vue';

const { toggleNav } = inject('mobile')
</script>