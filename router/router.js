import Vue from 'vue';
import Router from 'vue-router';
import scrollBehavior from '../.nuxt/router.scrollBehavior';

import '~/layouts/default.vue';

Vue.use(Router);

function interopDefault(promise) {
  return promise.then(m => m.default || m);
}

const Main = () => interopDefault(import('~/views/Main'));
const Profile = () => interopDefault(import('~/views/Profile'));

export function createRouter(ssrContext) {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    fallback: false,
    routes: [
      {
        path: '/',
        component: Main,
        name: 'index',
      },
      {
        path: '/profile',
        component: Profile,
        name: 'profile',
      },
    ]
  });
};
