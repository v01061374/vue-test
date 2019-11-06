require('./bootstrap');
import Vue from 'vue';
import Routes from '@/js/routes.js';
import HighchartsVue from 'highcharts-vue';

import App from '@/js/views/App';
Vue.use(HighchartsVue);

Vue.component('modal', {
    template: require('@/js/components/Modal.vue'),
});
 const app = new Vue({
     el: '#app',

     router: Routes,
     render: h=> h(App),

 });
