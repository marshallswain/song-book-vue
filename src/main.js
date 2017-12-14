import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueCookie from 'vue-cookie'
import VueRouter from 'vue-router'
import { routes } from './routes';
import VueGoodTable from 'vue-good-table'
import Vuex from 'vuex'
import store from './store'

Vue.use(Vuex)
Vue.use(VueCookie)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueGoodTable)

Vue.http.options.root = process.env.API_KEY

const router = new VueRouter({
  // mode: 'history',
  routes
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
