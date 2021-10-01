<template>
    <div id="app">
        <component :is="layout">
        <transition name="fade" mode="out-in">
        <router-view></router-view>
        </transition>
        </component>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
const default_layout = "loading";

export default {
    computed: {
        layout() {
            return (this.$route.meta.layout || default_layout) + "-layout";
        },
        // ...mapGetters('auth' ,[
        //     'authToken'
        // ]),
    },
    mounted(){
        // setInterval(()=> {
        //     this.$store.commit("auth/setAuthToken", this.authToken + 1)
        //     console.log(this.authToken);
        // }, 1000)
    }
};
</script>

<style lang="scss">
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
@import "~@fullcalendar/timegrid/main.css";
@import "assets/base.scss";
</style>
