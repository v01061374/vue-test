require('./bootstrap');
import Vue from 'vue';

import Routes from '@/js/routes.js';
import HighchartsVue from 'highcharts-vue';
import vPlayBack from 'v-playback';



import App from '@/js/views/App';


Vue.use(HighchartsVue);
Vue.use(vPlayBack);

 const app = new Vue({
     el: '#app',
     router: Routes,
     render: h=> h(App),
 });
