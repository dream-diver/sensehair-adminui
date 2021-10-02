import Vue from 'vue'
import './plugins/vuetify'
import axios from './plugins/axios'
import router from './router'
import store from './store'

import BootstrapVue from "bootstrap-vue"

import App from './App'

import Default from './Layout/Wrappers/baseLayout.vue';
import Loading from './pages/loadingScreen.vue';
import Pages from './Layout/Wrappers/pagesLayout.vue';
import Apps from './Layout/Wrappers/appLayout.vue';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
window.axios = axios

Vue.component('default-layout', Default);
Vue.component('loading-layout', Loading);
Vue.component('userpages-layout', Pages);
Vue.component('apps-layout', Apps);

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});
