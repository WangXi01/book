import Vue from 'vue'
import Router from 'vue-router'
import BookList from '@/views/BookList'
import BookContent from '@/views/BookContent'
import Home from '@/views/Home'
import BookItem from '@/views/BookItem'

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
        title: '山外小楼夜听雨'
      }
    },
    {
      path: '/book/:id',
      name: 'BookContent',
      component: BookContent,
      meta: {
        title: '小说内容'
      }
    },
    {
      path: '/list',
      name: 'list',
      component: BookList,
      meta: {
        title: '小说列表'
      }
    },
    {
      path: '/list/:id',
      name: 'item',
      component: BookItem,
      meta: {
        title: '小说分类'
      }
    }
  ]
})
