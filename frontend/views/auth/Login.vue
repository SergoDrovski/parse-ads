<template>
	<div
		class="flex h-full max-w-4xl w-max md:w-auto mx-auto min-h-[500px] overflow-hidden bg-white rounded-lg shadow-xl">
		<div class="flex flex-col overflow-y-auto md:flex-row">
			<div class="h-32 md:h-auto md:w-1/2">
				<img :src="officeImage" class="object-cover w-full h-full" alt="Office">
			</div>
			<div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
				<form class="w-full" @submit.prevent="handlerForm">
					<h1 class="mb-4 text-xl font-semibold text-gray-700">
						Авторизация
					</h1>

					<BaseInput v-model="authData.login" type="password" label="Логин" />
					<BaseInput v-model="authData.password" type="password" label="Пароль" />

					<base-button color="primary" type="submit" class="mt-4">Войти</base-button>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
import officeImage from '@/assets/images/login-office.jpg'

import { reactive } from '@vue/reactivity';
import { useRouter } from 'vue-router';

const router = useRouter()

const authData = reactive({
	login: '',
	password: ''
})

const handlerForm = () => {
	router.push('/')
}
</script>