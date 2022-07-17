import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path:'/layouts',
    component:() => import('@/views/Layouts'),
  },
  {
    path:'/layouts/usernews',
    component:() => import('@/views/UserNews')
  },
  {
    path:'/layouts/userfriend',
    component:() => import('@/views/UserFriend')
  },
  
  {
    path:'/login',
    component:() => import('@/views/Login')
  },
/*   {
    path:'/userinfo',
    component:() => import('@/views/UserInfo'),
    beforeEnter: (to, from, next) => {
      // console.log('111',store.state.user.isLogin);
      if(store.state.user.isLogin ){
        next()
      }else{
        next('/login')
      }
    }
  }, */
  {
    path:'/itemmusic',
    component:() => import('@/views/ItemMusic')
  },
  {
    path:'/search',
    component:() => import('@/views/Search')
  },
  {
    name:'mvdetail',
    path:'/mvdetail',
    component:() => import('@/views/MvDetail')
  },
  {
    path:'/',
    redirect:'/layouts' //路由重定向
  },
  {
    path:'/:pathMatch(.*)',
    component:() => import('@/views/NoPage')  
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from)=>{
  if(to.path==='/login' || to.path==='/userinfo'){
    store.state.user.isFooter = false
  }else{
    store.state.user.isFooter = true
  }
})

export default router
