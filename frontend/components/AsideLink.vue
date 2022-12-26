<template>
	<li class="relative px-6 py-3 flex items-center">
		<span v-if="isActive" class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg transition-all"></span>
		<router-link :to="props.to" :class="classes">
			<BaseIcon v-if="props.icon" :name="props.icon" class="w-5 h-5" />
			<span class="ml-2">{{ props.name }}</span>
		</router-link>
	</li>
</template>

<script setup>
import { computed } from '@vue/reactivity'
import { useRoute } from 'vue-router';

const route = useRoute()

const isActive = computed(() => route.path === props.to)

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	to: {
		type: String,
		required: true,
	},
	customClasses: {
		type: String,
		required: false,
		default: '',
	},
	icon: {
		type: String,
		required: false,
	}
})

const classes = computed(() => {
	const active = isActive.value 
		? 'text-purple-600 hover:text-purple-800' 
		: 'text-gray-600 hover:text-gray-900'

	const custom = props.customClasses.split(' ')

	return [
		'inline-flex', 
		'items-center', 
		'w-full', 
		'text-sm', 
		'font-semibold', 
		'transition-colors', 
		'duration-150', 
		'transition-all', 
		custom,
		active,
	]
})
</script>