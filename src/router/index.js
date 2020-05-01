import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [{
    path: '*',
    redirect: '/auth/login'
  }, {
    path: '/',
    name: 'home',
    redirect: '/auth/login'
  },
  {
    path: '/auth',
    component: () => import('@/layouts/Auth'),
    children: [{
        path: 'login',
        name: 'login',
        component: () => import('@/views/Auth/Login'),
        meta: {
          requiredAuth: false,
          pageTitle: 'Login'
        },
      },
      {
        path: 'logout',
        name: 'logout',
        component: () => import('@/views/Auth/Logout'),
        meta: {
          requiredAuth: true,
          pageTitle: 'Logout'
        }
      }
    ]
  },
  {
    path: '/Investors',
    component: () => import('@/layouts/Main'),
    children: [{
      path: 'list',
      name: 'list investor',
      component: () => import('@/views/Investors/List'),
      meta: {
        requiredAuth: true,
        pageTitle: 'Investors',
        parent: 'Investors'
      }
    }, {
      path: 'edit/:id',
      name: 'edit investor',
      component: () => import('@/views/Investors/Edit'),
      meta: {
        requiredAuth: true,
        pageTitle: 'Edit Employee',
        parent: 'Investors'
      }
    }]
  },
  {
    path: '/projects',
    component: () => import('@/layouts/Main'),
    children: [{
        path: 'list',
        name: 'list projects',
        component: () => import('@/views/Projects/List'),
        meta: {
          requiredAuth: true,
          pageTitle: 'Projects',
          parent: 'projects'
        }
      },
      {
        path: 'create',
        name: 'create projects',
        component: () => import('@/views/Projects/Create'),
        meta: {
          requiredAuth: true,
          pageTitle: 'Create project',
          parent: 'projects'
        }
      },
      {
        path: 'view/:id',
        name: 'view projects',
        component: () => import('@/views/Projects/View'),
        meta: {
          requiredAuth: true,
          pageTitle: 'View projects',
          parent: 'projects'
        }
      }
    ]
  },  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.pageTitle;

  const token = window.localStorage.getItem('token');

  if (to.meta.requiredAuth) {
    if (token === null)
      next('/auth/login');
    else {
      store.commit('auth/SET_INVESTOR', JSON.parse(window.localStorage.getItem('investor')));
      next();
    }

  } else {
    if (token === null)
      next();
    else {
      next('/Investors/list');
    }
  }
})

export default router