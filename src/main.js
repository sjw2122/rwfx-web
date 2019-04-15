// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api/api.js'
import store from './store/index'
import Element from 'element-ui';
import './styles/element-variables.scss';
Vue.use(Element);


Vue.prototype.$api = api
Vue.config.productionTip = false

/* eslint-disable no-new */
/*Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})*/
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
