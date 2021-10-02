import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_BACKEND_API_URL;

axios.interceptors.request.use(function (config) {
    const token = store.getters["auth/authToken"]
    if(token) {
        config.headers.Authorization =  'Bearer ' + token;
    }
    return config;
});

export default axios
