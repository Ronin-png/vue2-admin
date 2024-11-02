import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { 
  Button, 
  Calendar, 
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Drawer,
  Radio,
} from 'ant-design-vue';
import authorization from './components/authorization.vue'

Vue.config.productionTip = false

Vue.use(Button);
Vue.use(Calendar);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Breadcrumb);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.component('authorization', authorization)

console.log('app', App)

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

console.log('vm', vm)
