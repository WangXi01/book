// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueParticles from 'vue-particles' //粒子效果
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
import '@/assets/layout.css'
import '@/assets/media.css'
import {getItem,getNum} from '@/libs/items'  //小说分类

Vue.use(Vuex)
Vue.use(VueParticles)
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$getItem = getItem
Vue.prototype.$getNum = getNum
//Vue.prototype.$host = 'http://39.108.168.151:3000'
Vue.prototype.$host = 'http://localhost:8080'

const store = new Vuex.Store({
	  state: {
	    name: ''
	  },
	  mutations: {
	    increment (state,name) {
	      state.name = name
	    }
	  }
	})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data:{
  	bus:new Vue()
  },
  router,
  store,
  template: '<App/>',
  components: { App }
})
