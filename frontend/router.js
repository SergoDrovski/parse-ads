import { createRouter, createWebHashHistory } from "vue-router"

const routes = [{
		path: '/',
		name: 'cabinet',
		// component: () => import('./views/cabinet/Cabinet.vue'),
		redirect: to => '/cabinet/stats',
		meta: {
			auth: true,
			layout: 'main',
		},
		children: [
			{ 
				path: '/cabinet/stats', 
				component: () => import('./views/cabinet/Stats.vue'), 
				title: 'Статистика'
			},
			{ 
				path: '/cabinet/task/:id', 
				component: () => import('./views/cabinet/Task.vue'), 
				title: 'Просмотр задачи'
			},
			{ 
				path: '/cabinet/task/:id/url', 
				component: () => import('./views/cabinet/TaskUrl.vue'), 
				title: 'Ссылки в задаче'
			},
			{ 
				path: '/cabinet/start/task', 
				component: () => import('./views/cabinet/TaskStart.vue'), 
				title: 'Запустить новую задачу'
			},
			{ 
				path: '/cabinet/stop/task', 
				component: () => import('./views/cabinet/TaskStop.vue'), 
				title: 'Остановить задачу'
			},
		]
	},
	{
		path: '/auth',
		name: 'auth',
		redirect: to => '/auth/login',
		meta: {
			layout: 'auth',
		},
		children: [
			{ 
				path: '/auth/login', 
				component: () => import('./views/auth/Login.vue'), 
				title: 'Войти' 
			},
		]
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		redirect: to => '/'
	},
]


const router = createRouter({
	history: createWebHashHistory(),
	routes
})

// логика перед переходом по маршруту
router.beforeEach((to, from, next) => {
	console.log('to', to);
	console.log('from', from);

	next()
})

export default router