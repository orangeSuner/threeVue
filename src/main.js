import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

console.log(router.getRoutes())

createApp(App).use(router).mount('#app')
