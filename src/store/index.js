import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import auth from './auth'
import pagination from './pagination'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        pagination
    },

    plugins: [createPersistedState({
        paths: [
            'auth',
        ]
    })],
})
