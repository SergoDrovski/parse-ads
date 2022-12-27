import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'

import './index.css'
import './assets/styles/main.scss'

import components from '@/components/Base'

const app = createApp(App)
app.use(router)

// подключаем базовые UI компоненты
components.forEach(component => {
	app.component(component.__name, component)
})

app.mount('#app')
