import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import { ethers } from 'ethers'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

import App from './App.vue'
import router from './router'
declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider;
  }
}
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
})
app.mount('#app')
