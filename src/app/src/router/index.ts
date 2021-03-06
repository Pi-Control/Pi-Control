import Vue from 'vue';
import VueRouter from 'vue-router';

import Dashboard from '@/views/Dashboard.vue';
import General from '@/views/General.vue';
import Network from '@/views/Network.vue';
import Process from '@/views/Processes.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/general',
    name: 'general',
    component: General,
  },
  {
    path: '/net',
    name: 'network',
    component: Network,
  },
  {
    path: '/proc',
    name: 'processes',
    component: Process,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
