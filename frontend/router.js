import { createRouter, createWebHashHistory } from "vue-router"

import CabinetStats from '@/views/cabinet/Stats.vue'
import CabinetTask from '@/views/cabinet/Task.vue'
import CabinetTaskUrl from '@/views/cabinet/TaskUrl.vue'
import CabinetTaskStart from '@/views/cabinet/TaskStart.vue'
import CabinetTaskStop from '@/views/cabinet/TaskStop.vue'

const routes = [{
		path: '/',
		name: 'cabinet',
		// component: () => import('./views/cabinet/Cabinet.vue'),
		redirect: to => '/cabinet/stats',
		meta: {
			auth: true,
			layout: 'main',
			title: 'Статистика',
		},
		children: [
			{ 
				path: '/cabinet/stats',
				name: 'cabinet:stats',
				component: CabinetStats,
				title: 'Статистика'
			},
			{ 
				path: '/cabinet/task/:id',
				name: 'cabinet:task:id',
				component: CabinetTask,
				title: 'Просмотр задачи'
			},
			{ 
				path: '/cabinet/task/:id/url', 
				name: 'cabinet:task:url',
				component: CabinetTaskUrl,
				title: 'Ссылки в задаче'
			},
			{ 
				path: '/cabinet/start/task', 
				component: CabinetTaskStart,
				title: 'Запустить новую задачу'
			},
			{ 
				path: '/cabinet/stop/task', 
				component: CabinetTaskStop,
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
	// console.log('to', to);
	// console.log('from', from);

	if (to.meta.title) {
		document.title = to.meta.title
	}

	next()
})

export default router