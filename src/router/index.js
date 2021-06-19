import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: 'allFiles',
    component: () => import('../views/home/index.vue'),
    children: [
      {
        path: 'uploadLog',
        component: () => import('../views/uploadLog/index.vue')
      },
      {
        path: 'allFiles',
        component:()=>import('../views/files/AllFiles.vue')
      },
      {
        path: 'documents',
        component:()=>import('../views/files/Documents.vue')
      },
      {
        path: 'images',
        component:()=>import('../views/files/Images.vue')
      },
      {
        path: 'music',
        component:()=>import('../views/files/Music.vue')
      },
      {
        path: 'videos',
        component:()=>import('../views/files/Videos.vue')
      },
      {
        path: 'other',
        component:()=>import('../views/files/Other.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
