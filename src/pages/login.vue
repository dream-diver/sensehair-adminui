<template>
    <div>
        <transition name="fade" mode="out-in" appear>
        <div class="h-100">
            <b-row class="h-100 no-gutters">
                <b-col lg="12" md="12" class="h-100 d-flex bg-white justify-content-center align-items-center">
                    <b-col lg="9" md="10" sm="12" class="mx-auto app-login-box">
                        <div class="app-logo" >
                        </div>
                            <h4 class="mb-0">
                                <div>Welcome back,</div>
                                <span>Please sign in to your account.</span>
                            </h4>
                            <!-- <h6 class="mt&#45;3"> -->
                            <!--     No account? -->
                            <!--     <a href="javascript:void(0);" class="text&#45;primary">Sign up now</a> -->
                            <!-- </h6> -->
                            <div class="divider"> </div>
                            <div>
                                <Form @submit.prevent="login" class="hello">
                                    <b-row form>
                                        <b-col md="6">
                                            <b-form-group>
                                                <Label for="identity">Email or Username</Label>
                                                <b-form-input type="text"  v-model="loginForm.identity" id="identity" placeholder="Email or Username" />
                                            </b-form-group>
                                        </b-col>
                                        <b-col md="6">
                                            <b-form-group>
                                                <Label for="password">Password</Label>
                                                <b-form-input type="password" v-model="loginForm.password" id="password" placeholder="Password" />
                                            </b-form-group>
                                        </b-col>
                                    </b-row>
                                    <!-- <b&#45;form&#45;checkbox name="check" id="check">Keep me logged in</b&#45;form&#45;checkbox> -->
                                    <div class="divider"></div>
                                    <div class="d-flex align-items-center">
                                        <div class="ml-auto">
                                            <a href="javascript:void(0);" class="btn-lg btn btn-link"> Recover Password </a>
                                            <b-button type="submit" variant="primary" size="lg">Login to Dashboard</b-button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                    </b-col>
                </b-col>
            </b-row>
        </div>
        </transition>
    </div>
</template>

<script>

export default {
    components: {
    },
    data: () => ({
        loginForm: {
            identity: '',
            password: '',
        },

        slide: 0,
        sliding: null,
    }),

    async mounted(){
    },

    methods: {
        login(){
            axios.post('/api/login', this.loginForm).then( response => {
                // console.log('login response');
                // console.log(response);
                const token = response.data.token
                window.localStorage.setItem('auth_token', token)
                this.$store.dispatch('setAuthToken', token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } ).then( async () => {
                // set logged in user data in the store
                await this.$store.dispatch('setLoggedInUserData')
                this.$router.push({name: 'dashboard'})
                // console.log(this.$store.getters.loggedInUser);
            } ).catch( error => {
            } )
        },
        handleClick(newTab) {
            this.currentTab = newTab;
        },
        reInit() {
            this.$nextTick(() => {
            });
        },

        onSlideStart() {
            this.sliding = true;
        },
        onSlideEnd() {
            this.sliding = false;
        }
    }
};
</script>
