<template>
	<div>
		<TheHeader />

		<div class="container mx-auto">
			<section class="">
				<RouterView />
			</section>
		</div>
	</div>
</template>

<script setup>
import TheHeader from '../components/TheHeader.vue';
</script>