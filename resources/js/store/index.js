import Vue from 'vue';
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger';

import UserModule from './modules/UserModule';
Vue.use(Vuex);


export default new Vuex.Store({
  modules :{
    user: UserModule,
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: process.env.NODE_ENV !== 'production' ? [ createLogger() ] : [],
})
