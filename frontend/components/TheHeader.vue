<template>
	<header class="fixed inset-x-0 top-0 h-14 px-6 bg-slate-600">
		<nav class="h-full">
			<ul class="flex gap-4 h-full items-center">
				<li><router-link to="/cabinet" class="text-white hover:text-slate-200">Кабинет</router-link></li>
				<li><router-link to="/auth" class="text-white hover:text-slate-200">Войти</router-link></li>
				<li class="last:grow text-right"><router-link to="/auth/exit" class="text-white hover:text-slate-200">Выйти</router-link></li>
			</ul>
		</nav>
	</header>
</template>
