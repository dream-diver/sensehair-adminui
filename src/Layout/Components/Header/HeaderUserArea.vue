<template>
    <div class="d-flex">
        <div class="header-btn-lg pr-0">
            <div class="widget-content p-0">
                <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                        <b-dropdown
                            toggle-class="p-0 mr-2"
                            menu-class="dropdown-menu-lg"
                            variant="link"
                            no-caret
                            right
                        >
                            <span slot="button-content">
                                <div
                                    class="icon-wrapper icon-wrapper-alt rounded-circle"
                                >
                                    <img
                                        width="42"
                                        class="rounded-circle"
                                        src="@/assets/images/avatars/user-blue.png"
                                        alt
                                    />
                                </div>
                            </span>
                            <div class="dropdown-menu-header">
                                <div class="dropdown-menu-header-inner bg-info">
                                    <div
                                        class="menu-header-image opacity-2 dd-header-bg-6"
                                    ></div>
                                    <div class="menu-header-content text-left">
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper">
                                                <div
                                                    class="widget-content-left mr-3"
                                                >
                                                    <img
                                                        width="42"
                                                        class="rounded-circle"
                                                        src="@/assets/images/avatars/user-blue.png"
                                                        alt
                                                    />
                                                </div>
                                                <div
                                                    class="widget-content-left"
                                                    @click="goToSettings"
                                                >
                                                    <div class="widget-heading">
                                                        {{
                                                            loggedInUser.data
                                                                ? loggedInUser
                                                                      .data.name
                                                                : ""
                                                        }}
                                                    </div>
                                                    <div
                                                        class="widget-subheading opacity-8"
                                                    >
                                                        {{
                                                            loggedInUser.data
                                                                ? loggedInUser
                                                                      .data.role
                                                                : ""
                                                        }}
                                                    </div>
                                                </div>
                                                <div
                                                    class="widget-content-right mr-2"
                                                >
                                                    <button
                                                        @click="logout"
                                                        class="btn-pill btn-shadow btn-shine btn btn-focus"
                                                    >
                                                        Logout
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </b-dropdown>
                    </div>
                    <div class="widget-content-left ml-3 header-user-info">
                        <div class="widget-heading">
                            {{
                                loggedInUser.data ? loggedInUser.data.name : ""
                            }}
                        </div>
                        <div class="widget-subheading">
                            {{
                                loggedInUser.data ? loggedInUser.data.role : ""
                            }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import VueCircle from "vue2-circle-progress";
import Trend from "vuetrend";
import { mapGetters } from "vuex";

export default {
    components: {
        VuePerfectScrollbar,
        VueCircle,
        trend: Trend,
    },
    data: () => ({
        fill1: { gradient: ["#00b09b", "#96c93d"] },
        fill2: { gradient: ["#ff0844", "#ffb199"] },
        fill3: { gradient: ["#f6d365", "#fda085"] },
        showDrawerSection: false,
    }),
    computed: {
        ...mapGetters("auth", ["loggedInUser"]),
    },
    mounted() {},
    methods: {
        logout() {
            axios.post("api/logout").then((response) => {
                this.$store.dispatch("auth/removeAuthToken");
                this.$store.dispatch("auth/removeLoggedInUser");
                this.$router.push({ name: "login" });
            });
        },
        goToSettings() {
            this.$router.push({ name: "profile.settings" });
        },
    },
};
</script>
