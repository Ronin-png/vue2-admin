import Vue from 'vue'          
import VueRouter, { RouteConfig } from 'vue-router' 
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import findLast from 'lodash/findLast';
import { check, getCurrentAuthority, isLogin } from '../utils/auth'
import { notification } from 'ant-design-vue'

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
        meta: { icon: 'dashboard', title: '仪表盘' },
        component: { render: (h: any) => h('router-view') }, 
        children: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            meta: { title: '分析页' },
            component: () => import('../views/Dashboard/Analysis.vue') 
          },
        ]
      },
      {
        path: '/form',  
        name: 'form',
        meta: { icon: 'form', title: '表单', requireAuth: ['admin'] },
        component: { render: (h: any) => h('router-view') },
        children: [
          {
            path: '/form/basic-form',
            name: 'basicform',
            meta: { title: '基础表单' },
            component: () => import('../views/Forms/BasicForm.vue')
          },
          {
            path: '/form/step-form',  
            name: 'stepform',
            hideChildrenMenu: true,
            meta: { title: '分布表单' },
            component: () => import('../views/Forms/StepForm/index.vue'),
            children: [ 
              {
                path: '/form/step-form',
                meta: {title: '1'},
                redirect: '/form/Step-form/Info',
              },
              {
                path: '/form/step-form/info',
                name:'info',
                meta: {title: '2'},
                component: () => import('../views/Forms/StepForm/Step1.vue'),
              },
              {
                path: '/form/step-form/confirm',
                name:'confirm',
                meta: {title: '3'},
                component: () => import('../views/Forms/StepForm/Step2.vue'),
              },
              {
                path: '/form/step-form/result',
                name:'result',
                meta: {title: '4'},
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
  },
  {
    path: '/403',
    name: '403',
    isHideMenu: true,
    component: () => import('../views/403.vue')
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
    console.log('to.matched', to.matched)
    const lastAuth: any = findLast(to.matched, (record: Record<string, any>) => record.meta.requireAuth)
    if (lastAuth && !check(lastAuth.meta.requireAuth)) {
      if (!isLogin()) {
        debugger
        next({ name: 'login' })
        return
      }
      NProgress.start();
      notification.error({
        message: '无权限',
        description: '无权限访问此页面',
      });
      next({ name: '403' })
      return
    }
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
