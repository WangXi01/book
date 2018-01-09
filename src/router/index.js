import Vue from 'vue'
import Router from 'vue-router'
import BookList from '@/views/BookList'
import BookContent from '@/views/BookContent'
import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
  routes: [
  	{
      path: '/',
      redirect:'/home'
    },
  	{
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        title: '小说主页,走过路过不要错过啦'
      }
    },
    {
      path: '/book/:id',
      name: 'BookContent',
      component: BookContent,
      meta: {
        title: '小说列表页'
      }
    },
    {
      path: '/list',
      name: 'list',
      component: BookList,
      meta: {
        title: '小说列表'
      }
    }
  ]
})
