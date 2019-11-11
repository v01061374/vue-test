import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/js/components/Home.vue';
import About from '@/js/components/About.vue';
import Chart from '@/js/components/Chart.vue';
import Modal from '@/js/components/Modal.vue';

import Dashboard from '@/js/views/Dashboard.vue';
import Forecast from '@/js/views/DashboardForecast.vue';
import Revenue from '@/js/views/DashboardForecastRevenue.vue';



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
        ,
        {
            path: '/dashboard',
            name: 'dashboard.index',
            component: Dashboard,
            children: [
                {
                    path: '/dashboard/forecast',
                    component: Forecast,
                    name: 'dashboard.forecast',
                    redirect: { name: 'dashboard.forecast.revenue' },
                    children: [
                        {
                            path: '/dashboard/revenue',
                            component: Revenue,
                            name: 'dashboard.forecast.revenue',
                        }
                    ]


                }
            ]
        }
    ]
});
export default router;