// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import './hooks' // This must be imported before any component

import App from './App'
import router from './router'

Vue.config.productionTip = false

// tslint:disable-next-line:no-unused-expression
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App }
})
