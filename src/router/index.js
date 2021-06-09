import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: 'allFiles',
    component: () => import('../views/Home/index.vue'),
    children: [
      {
        path: 'uploadLog',
        component: () => import('../views/UploadLog/index.vue')
      },
      {
        path: 'allFiles',
        component:()=>import('../views/Files/AllFiles.vue')
      },
      {
        path: 'documents',
        component:()=>import('../views/Files/Documents.vue')
      },
      {
        path: 'images',
        component:()=>import('../views/Files/Images.vue')
      },
      {
        path: 'music',
        component:()=>import('../views/Files/Music.vue')
      },
      {
        path: 'videos',
        component:()=>import('../views/Files/Videos.vue')
      },
      {
        path: 'other',
        component:()=>import('../views/Files/Other.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
