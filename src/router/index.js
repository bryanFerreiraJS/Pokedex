import Vue from 'vue';
import VueRouter from 'vue-router';
import Landing from '@/views/Landing.vue'
import Home from '@/views/Home.vue';
import FavoriteHome from '@/views/FavoriteHome.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/favorite',
    name: 'FavoriteHome',
    component: FavoriteHome,
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
