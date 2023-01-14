import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'

import Toast, { POSITION as TOAST_POSITION } from "vue-toastification";

import './index.css'
import './assets/styles/main.scss'

import components from '@/components/Base'

const app = createApp(App)
app.use(router)

// подключаем базовые UI компоненты
components.forEach(component => {
	app.component(component.__name, component)
})

app.use(Toast, {
	position: TOAST_POSITION.BOTTOM_RIGHT,
	timeout: 5000
})

app.mount('#app')
