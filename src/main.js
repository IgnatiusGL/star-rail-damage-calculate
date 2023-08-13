import { createApp } from 'vue'
import App from './App.vue'
import { routes } from './router'
import * as VueRouter from 'vue-router'

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})

const app = createApp(App)
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})
app.use(router).mount('#app')
