import Vue from 'vue'
import Router from 'vue-router'
import BookList from '@/views/BookList'
import BookContent from '@/views/BookContent'

Vue.use(Router)

export default new Router({
  routes: [
  	{
      path: '/',
      redirect: '/list'
    },
    {
      path: '/book/:aa/:id.html',
      name: 'BookContent',
      component: BookContent,
      meta: {
        title: '小说主页'
      }
    },
    {
      path: '/list',
      name: 'BookList',
      component: BookList,
      meta: {
        title: '小说列表'
      }
    }
  ]
})
