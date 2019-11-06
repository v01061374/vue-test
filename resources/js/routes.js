import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/js/components/Home.vue';
import About from '@/js/components/About.vue';
import Chart from '@/js/components/Chart.vue';
import Modal from '@/js/components/Modal.vue';


Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component : Home
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/chart',
            name: 'chart',
            component: Chart
        }
        ,
        {
            path: '/modal',
            name: 'modal',
            component: Modal
        }
    ]
});
export default router;