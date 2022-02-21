import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
<<<<<<< HEAD
import store from './store'
=======
>>>>>>> origin/muqeet-image
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(App)
  .use(router)
<<<<<<< HEAD
  .use(store)
=======
>>>>>>> origin/muqeet-image
  .use(vuetify)
  .mount('#app')
