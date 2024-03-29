// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api/api.js'
import store from './store/index'
/*import Element from 'element-ui'
import './styles/element-variables.scss'
Vue.use(Element);*/

import { LocaleProvider } from 'ant-design-vue';
Vue.use(LocaleProvider);
import { Input } from 'ant-design-vue';
Vue.use(Input);
import { Select } from 'ant-design-vue';
Vue.use(Select);
import { DatePicker } from 'ant-design-vue';
Vue.use(DatePicker);
import { Radio } from 'ant-design-vue';
Vue.use(Radio);
import { Pagination } from 'ant-design-vue';
Vue.use(Pagination);
import { InputNumber } from 'ant-design-vue';
Vue.use(InputNumber);
import { ConfigProvider } from 'ant-design-vue';
Vue.use(ConfigProvider);
import { Tree } from 'ant-design-vue';
Vue.use(Tree);

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');



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
