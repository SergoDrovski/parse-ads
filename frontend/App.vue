<template>
	<component v-if="currentLayout" :is="currentLayout + '-layout'"></component>
</template>

<script>
import MainLayout from './layouts/Main.vue'
import AuthLayout from './layouts/Auth.vue'

import { useRoute } from 'vue-router'
import { computed } from '@vue/reactivity'

export default {
	setup() {
		const route = useRoute()
		const currentLayout = computed(() => route.meta.layout ?? 'main')

		return { currentLayout }
	},
	components: { AuthLayout, MainLayout }
}
</script>
