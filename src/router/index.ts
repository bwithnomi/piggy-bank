import { decryptCipher } from './../composables/crypto';
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import useHash from '@/composables/hash';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/',
      name: 'signin',
      meta: { isGuest: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Signin.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      meta: { isGuest: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Signup.vue')
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      meta: { isGuest: true },
      component: () => import('../views/ForgotPassword.vue')
    },
    {
      path: '/home',
      name: 'home',
      meta: {requiresAuth: true},
      component: () => import('../views/HomeView.vue')
    }
  ]
})


router.beforeEach((to, from, next) => {
  const password = localStorage.getItem(useHash('password'));
  let signin = localStorage.getItem(useHash('signin'));
  signin = decryptCipher(signin || "")
  console.log(password, signin, !!signin);
  
  if (to.meta.requiresAuth && (password === null || !JSON.parse(signin || ""))) {
    next({ name:"JSON.parse(signin" });
  }  else if (to.meta.isGuest && (password && JSON.parse(signin || ""))) {
    next({ name: "home" });
  } else {
    next();
  }
})

export default router
