<template>
	<svg 
		xmlns="http://www.w3.org/2000/svg" 
		viewBox="0 0 24 24" 
		fill="none"
		stroke-width="1.5" 
		stroke="currentColor" 
		:class="$attrs.class || 'w-6 h-6'"
		v-html="icons[props.name]"
	></svg>
</template>

<script setup>
import icons from '@/icons.js'

const props = defineProps({
	name: {
		type: String,
		required: true,
		default: 'heart'
	}
})
</script>