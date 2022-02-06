import Vue from "vue";
import Router from "vue-router";
import store from "./../store/index";

Vue.use(Router);

const router = new Router({
    scrollBehavior() {
        return window.scrollTo({ top: 0, behavior: "smooth" });
    },
    routes: [
        // Login Page
        {
            path: "/login",
            name: "login",
            meta: {
                layout: "userpages",
                requireVisitor: true,
            },
            component: () => import("../pages/login.vue"),
        },

        // User's Settings Page
        {
            path: "/settings",
            name: "profile.settings",
            meta: {
                requiresAuth: true,
            },
            component: () => import("../pages/profile/settings.vue"),
        },

        // Dashboards
        {
            path: "/",
            name: "dashboard",
            meta: {
                requiresAuth: true,
            },
            // component: () => import('../DemoPages/Dashboards/analytics.vue'),
            redirect: {
                name: "planer",
            },
        },

        {
            path: "/planer",
            name: "planer",
            meta: {
                requiresAuth: true,
            },
            component: () => import("../pages/planer/index.vue"),
        },

        // Bookings pages
        {
            path: "/bookings",
            name: "bookings.index",
            meta: {
                requiresAuth: true,
            },
            component: () => import("../pages/bookings/index.vue"),
        },
        {
            path: "/bookings/create",
            name: "bookings.create",
            meta: {
                requiresAuth: true,
            },
            component: () => import("../pages/bookings/create.vue"),
        },
        {
            path: "/bookings/:id",
            name: "bookings.show",
            meta: {
                requiresAuth: true,
            },
            component: () => import("../pages/bookings/show.vue"),
        },
        {
            path: "/bookings/edit/:id",
            name: "bookings.edit",
            meta: {
                requiresAuth: true,
            },
            component: () => import("../pages/bookings/edit.vue"),
        },

        // Users pages
        {
            path: "/users",
            name: "users.index",
            meta: {
                requiresAuth: true,
            },
            component: () => import("../pages/users/index.vue"),
        },
        {
            path: "/users/create",
            name: "users.create",
            meta: {
                requiresAuth: true,
            },
            component: () => import("../pages/users/create.vue"),
        },
        {
            path: "/users/:id",
            name: "users.show",
            meta: {
                requiresAuth: true,
            },
            component: () => import("../pages/users/show.vue"),
        },
        {
            path: "/users/:id/edit",
            name: "users.edit",
            meta: {
                requiresAuth: true,
            },
            component: () => import("../pages/users/edit.vue"),
        },

        // Services pages
        {
            path: "/services",
            name: "services.index",
            meta: {
                requiresAuth: true,
            },
            component: () => import("../pages/services/index.vue"),
        },
        {
            path: "/services/create",
            name: "services.create",
            meta: {
                requiresAuth: true,
            },
            component: () => import("../pages/services/create.vue"),
        },
        {
            path: "/services/:id",
            name: "services.show",
            meta: {
                requiresAuth: true,
            },
            component: () => import("../pages/services/show.vue"),
        },
        {
            path: "/services/:id/edit",
            name: "services.edit",
            meta: {
                requiresAuth: true,
            },
            component: () => import("../pages/services/edit.vue"),
        },

        // Promocodes pages
        {
            path: "/promocodes",
            name: "promocodes.index",
            meta: {
                requiresAuth: true,
            },
            component: () => import("../pages/promocodes/index.vue"),
        },
        {
            path: "/promocodes/create",
            name: "promocodes.create",
            meta: {
                requiresAuth: true,
            },
            component: () => import("../pages/promocodes/create.vue"),
        },
        {
            path: "/promocodes/:id",
            name: "promocodes.show",
            meta: {
                requiresAuth: true,
            },
            component: () => import("../pages/promocodes/show.vue"),
        },
        {
            path: "/promocodes/:id/edit",
            name: "promocodes.edit",
            meta: {
                requiresAuth: true,
            },
            component: () => import("../pages/promocodes/edit.vue"),
        },

        // // Testing routes
        // {
        //     path: '/loading',
        //     name: 'loading',
        //     component: () => import('../pages/loadingScreen.vue'),
        // },
    ],
});

// add default layout meta for all auth routes
const authRoutes = router.options.routes
    .filter((item) => item.meta)
    .filter((item) => item.meta.requiresAuth === true);
authRoutes.forEach((item) => (item.meta.layout = "default"));

function isLoggedIn() {
    // const token = window.localStorage.getItem('auth_token')
    const token = store.getters["auth/authToken"];
    if (token) {
        store.dispatch("auth/fetchLoggedInUserData");
        return true;
    } else {
        return false;
    }
}

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!isLoggedIn()) {
            next({
                name: "login",
            });
        } else {
            next();
        }
    } else if (to.matched.some((record) => record.meta.requireVisitor)) {
        // this route requires visitor, check if logged in
        // if not, redirect to bookings page.
        if (isLoggedIn()) {
            next({
                name: "bookings.index",
            });
        } else {
            next();
        }
    } else {
        next(); // make sure to always call next()!
    }
});

export default router;
