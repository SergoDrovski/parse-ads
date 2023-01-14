<template>
	<button
		:class="[classes, $attrs.class ? $attrs.class : '']"
		:type="$attrs.type || 'button'"
		@click="emit('handlerClick', $event)"
	>
		<slot/>
	</button>
</template>

<script setup>
import { computed } from '@vue/reactivity'

const emit = defineEmits(['handlerClick'])

const props = defineProps({
	color: {
		type: String,
		required: false,
		default: 'primary',
		validator: v => ['primary', 'danger', 'success', 'info', 'secondary'].includes(v)
	}
})

const classes = computed(() => {
	const MAP = {
		secondary: [
			'text-gray-600', 
			'border-gray-300', 
			'hover:border-gray-500', 
			'focus:border-gray-500', 
			'text-gray-500', 
			'focus:shadow-outline-gray'
		],
		primary: [
			'text-white', 
			'bg-purple-600',
			'active:bg-purple-600',
			'hover:bg-purple-700',
			'border-purple-600',
		],
		danger: [
			'text-white', 
			'bg-red-600',
			'active:bg-red-600',
			'hover:bg-red-700',
			'border-red-600',
		],
		success: [
			'text-white', 
			'bg-green-600',
			'active:bg-green-600',
			'hover:bg-green-700',
			'border-green-600',
		],
		info: [
			'text-white', 
			'bg-blue-600',
			'active:bg-blue-600',
			'hover:bg-blue-700',
			'border-blue-600',
		],
	}

	return [
		"align-bottom",
		"inline-flex",
		"items-center",
		"justify-center",
		"cursor-pointer",
		"leading-5",
		"transition-colors",
		"duration-150",
		"font-medium",
		"px-4",
		"py-2",
		"rounded-lg",
		"text-sm",
		"border",
		"focus:outline-none",
		...MAP[props.color],
	]
})
</script>