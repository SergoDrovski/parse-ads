<template>
	<label class="block mt-4 text-sm">
		<span class="text-gray-700">{{ props.label }}</span>
		<input 
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)" 
			:class="classes" 
			:id="$attrs.id"
			:name="$attrs.name"
			:type="props.type"
			:placeholder="$attrs.placeholder"
			>
	</label>
</template>

<script setup>
import { computed } from '@vue/reactivity';

const props = defineProps(['label', 'type', 'inputClasses', 'modelValue'])

const classes = computed(() => {
	const inp = props.inputClasses ? props.inputClasses.split(' ') : ''

	return [
		'block',
		'w-full',
		'mt-1',
		'text-sm',
		'rounded',
		'border',
		'border-gray-400',
		'min-h-[40px]',
		'px-2 pt-0',
		'focus:border-gray-600',
		'focus:outline-none',
		inp
	]
})
</script>