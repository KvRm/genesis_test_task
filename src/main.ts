import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router'
import { createPinia } from 'pinia'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons'
library.add(faChevronDown, faCheck)

const pinia = createPinia()

createApp(App)
  .use(router)
  .use(pinia)
  .component('FontAwesomeIcon', FontAwesomeIcon)
  .mount('#app')
