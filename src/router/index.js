import Vue from 'vue'
import Router from 'vue-router'
import store from './../store/index'

Vue.use(Router);

const router =  new Router({
    scrollBehavior() {
        return window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    routes: [
        // Login Page
        {
            path: '/login',
            name: 'login',
            meta: { 
                layout: 'userpages',
                requireVisitor: true,
            },
            component: () => import('../pages/login.vue'),
        },

        // Dashboards
        {
            path: '/',
            name: 'dashboard',
            meta: {
                requiresAuth: true
            },
            // component: () => import('../DemoPages/Dashboards/analytics.vue'),
            redirect: {
                name: 'bookings.index'
            }
        },

        // Bookings pages
        {
            path: '/bookings',
            name: 'bookings.index',
            meta: { 
                requiresAuth: true,
            },
            component: () => import('../pages/bookings/index.vue'),
        },
        // {
        //     path: '/bookings/create',
        //     name: 'bookings.create',
        //     meta: { 
        //         requiresAuth: true,
        //     },
        //     component: () => import('../pages/bookings/create.vue'),
        // },
        // {
        //     path: '/bookings/:id',
        //     name: 'bookings.show',
        //     meta: { 
        //         requiresAuth: true,
        //     },
        //     component: () => import('../pages/bookings/show.vue'),
        // },
        // {
        //     path: '/bookings/edit/:id',
        //     name: 'bookings.edit',
        //     meta: { 
        //         requiresAuth: true,
        //     },
        //     component: () => import('../pages/bookings/edit.vue'),
        // },
        //
        // // Testing routes
        // {
        //     path: '/loading',
        //     name: 'loading',
        //     component: () => import('../pages/loadingScreen.vue'),
        // },
    ]
})

// add default layout meta for all auth routes
const authRoutes = router.options.routes.filter(item => item.meta)
    .filter(item =>  item.meta.requiresAuth === true )
authRoutes.forEach(item => item.meta.layout = 'default')

function isLoggedIn(){
    // const token = window.localStorage.getItem('auth_token')
    const token = store.getters.authToken
    if (token) {
        store.dispatch('fetchLoggedInUserData')
        return true
    } else {
        return false
    }
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (! isLoggedIn()) {
            next({
                name: 'login',
            })
        }else{
            next()
        }
    }
    else if (to.matched.some(record => record.meta.requireVisitor)) {
        // this route requires visitor, check if logged in
        // if not, redirect to login page.
        if (isLoggedIn()) {
            next({
                name: 'packages.index',
            })
        }else{
            next()
        }
    }else {
        next() // make sure to always call next()!
    }
})

export default router
