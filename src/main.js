// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios
//Vue.prototype.$host = 'http://39.108.168.151'
Vue.prototype.$host = 'http://localhost:8080'

//router.beforeEach((to, from, next) => {
//	var toRouter = to.path;
//	var nowRouter = window.location.href;
//	console.log(window.location.href)
//	return false;
//	if(nowRouter.indexOf('/#')=='-1'){
//		
//		toRouter = 'http://localhost:8080/#'+ toRouter;
//		next(toRouter)
//	}else{
//		
//		next()
//	}
//})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
