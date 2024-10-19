import Vue from 'vue'          
import VueRouter, { RouteConfig } from 'vue-router' 
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';

Vue.use(VueRouter) 

const routes = [
  {
    path: '/user',
    isHideMenu: true,
    component: () => import('../layouts/UserLayout.vue'),
    children: [
      {
        path: '/user',
        redirect: '/User/login',
      },
      {
        path: '/user/login',
        name: 'login',
        component: () => import('../views/User/Login.vue'),
      },
      {
        path: '/user/register',
        name: 'register',
        component: () => import('../views/User/Register.vue'),
      },
    ]
  },
  {
    path: '/',
    component: () => import('../layouts/BasicLayout.vue'),
    children: [
      {
        path: '/',
        redirect: '/dashboard/analysis'
      },
      { 
        path: '/dashboard',
        name: 'dashboard',
        mate: { icon: 'dashboard', title: '仪表盘' },
        component: { render: (h: any) => h('router-view') }, 
        children: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            mate: { title: '分析页' },
            component: () => import('../views/Dashboard/Analysis.vue') 
          },
        ]
      },
      {
        path: '/form',  
        name: 'form',
        mate: { icon: 'form', title: '表单' },
        component: { render: (h: any) => h('router-view') },
        children: [
          {
            path: '/form/basic-form',
            name: 'basicform',
            mate: { title: '基础表单' },
            component: () => import('../views/Forms/BasicForm.vue')
          },
          {
            path: '/form/step-form',  
            name: 'stepform',
            hideChildrenMenu: true,
            mate: { title: '分布表单' },
            component: () => import('../views/Forms/StepForm/index.vue'),
            children: [ 
              {
                path: '/form/step-form',
                mate: {title: '1'},
                redirect: '/form/Step-form/Info',
              },
              {
                path: '/form/step-form/info',
                name:'info',
                mate: {title: '2'},
                component: () => import('../views/Forms/StepForm/Step1.vue'),
              },
              {
                path: '/form/step-form/confirm',
                name:'confirm',
                mate: {title: '3'},
                component: () => import('../views/Forms/StepForm/Step2.vue'),
              },
              {
                path: '/form/step-form/result',
                name:'result',
                mate: {title: '4'},
                component: () => import('../views/Forms/StepForm/Step3.vue'),
              }
            ],
          }
        ]
      }
    ]
  },
  {
    path: '*',
    name: '404',
    isHideMenu: true,
    component: () => import('../views/notFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 进入路由之前
router.beforeEach((to, from, next) => {
  debugger
  if (to.path !== from.path) {
    NProgress.start();
    next()
  } else {
    next(false);
  }
}) 

// 进入路由之后
router.afterEach((to, from) => {
  debugger
  NProgress.done()
})

export default router 
