import Vuex from "vuex";

require('./bootstrap');
import Vue from 'vue';

import Routes from '@/js/routes.js';
import HighchartsVue from 'highcharts-vue';
import Highcharts from 'highcharts';
import draggable from 'highcharts/modules/draggable-points'
import vPlayBack from 'v-playback';
import Vuelidate from 'vuelidate'

import store from './store'
import Axios from 'axios'

import TreeTable from 'primevue/treetable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';

// import 'primevue/resources/themes/nova-light/theme.css';

import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
// import '@/css/app.css'


import App from '@/js/views/App';

draggable(Highcharts);
Vue.use(HighchartsVue);
Vue.use(vPlayBack);
Vue.use(Vuelidate);



Vue.component('tree-table', TreeTable);
Vue.component('column', Column);
Vue.component('drop-down', Dropdown);

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

 const app = new Vue({
     el: '#app',
     router: Routes,
     store,
     render: h=> h(App),
 });
