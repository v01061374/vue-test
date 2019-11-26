require('./bootstrap');
import Vue from 'vue';

import Routes from '@/js/routes.js';
import HighchartsVue from 'highcharts-vue';
import vPlayBack from 'v-playback';


import TreeTable from 'primevue/treetable';
import Column from 'primevue/column';
// import 'primevue/resources/themes/nova-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import '@/css/app.css'


import App from '@/js/views/App';


Vue.use(HighchartsVue);
Vue.use(vPlayBack);
Vue.component('tree-table', TreeTable);
Vue.component('column', Column);

 const app = new Vue({
     el: '#app',
     router: Routes,
     render: h=> h(App),
 });
