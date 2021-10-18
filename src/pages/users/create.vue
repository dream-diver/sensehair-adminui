<template>
    <div>
        <page-title :heading="pageTitle.heading" :subheading="pageTitle.subheading" :icon="pageTitle.icon">
            <template v-slot:actions>
                <button type="button" @click="$router.push({name: 'users.index'})" class="btn-shadow d-inline-flex align-items-center btn btn-secondary mr-2">
                    <font-awesome-icon class="mr-2" icon="list" /> All Users
                </button>
            </template>
        </page-title>

        <layout-wrapper>
            <v-container fluid>
                <card heading="Add a new User Account" subheading="" >
                <!-- <template v&#45;slot:selectNumOfRows> -->
                <!--     <p>sssssss</p> -->
                <!-- </template> -->
                <v-form ref="form" v-model="formIsValid" lazy-validation>
                    <v-layout>
                        <v-flex xs12 md6>
                            <v-container pb-0 fluid>
                                <h5><b>Basic Info</b></h5>
                            </v-container>
                        </v-flex>
                    </v-layout>
                        <v-layout>
                            <v-flex xs12 md6>
                                <v-container fluid>
                                    <v-text-field v-model="addUserFields.name" :rules="formValidationRules.nameRules" label="Name" required></v-text-field>
                                    <v-text-field v-model="addUserFields.email" :rules="formValidationRules.emailRules" label="Email" required></v-text-field>
                                    <v-select
                                        v-model="addUserFields.role"
                                        :items="roleList"
                                        label="Role"
                                        ></v-select>
                                </v-container>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-container fluid>
                                    <v-text-field v-model="addUserFields.phone" :rules="formValidationRules.phoneRules" label="Phone" required></v-text-field>
                                    <v-text-field type="password" v-model="addUserFields.password" :rules="formValidationRules.passwordRules" label="Password"></v-text-field>
                                </v-container>
                            </v-flex>
                        </v-layout>
                    <v-container fluid>
                        <b-button @click="addUserSubmitted" class="mr-2 mb-2" :variant="formIsValid? 'success':'danger'" :disabled="formIsValid ? false:true">{{formIsValid ? 'Add User': 'Invalid Inputs'}}</b-button>
                    </v-container>
                </v-form>
                </card>
            </v-container>

        </layout-wrapper>
    </div>
</template>

<style scoped>
</style>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add( faList);

import PageTitle from "@/Layout/Components/PageTitle.vue";
import LayoutWrapper from "@/Layout/Components/LayoutWrapper";
import Card from "@/Layout/Components/Card";

export default {
    components: {
        PageTitle,
        "layout-wrapper": LayoutWrapper,
        Card,
        FontAwesomeIcon
    },

    data: () => ({
        addUserFields: {
            role: 'customer'
        },
        roleList: ['customer', 'stylist'],
        formIsValid: false,
        formValidationRules: {
            nameRules: [v => !!v || 'Name is required'],
            phoneRules: [v => !!v || 'Phone is required'],
            // passwordRules: [v => !!v || 'Password is required'],
            passwordRules: [true || 'Password is required'],
            emailRules: [
                v => !!v || "E-mail is required",
                v => /.+@.+\..+/.test(v) || "E-mail must be valid"
            ]
        },
        pageTitle: {
            heading: "Add Users",
            subheading: "To add new users please fill up the form below.",
            icon: "pe-7s-plane icon-gradient bg-tempting-azure",
        },
        email: "",
    }),
    computed: {
    },
    mounted(){
    },

    methods: {
        addUserSubmitted(e){
            this.$refs.form.validate()

            if (this.formIsValid) {
                var link = "api/users"
                axios.post(link, this.addUserFields).then( response => {
                    this.$refs.form.reset()
                    this.addUserFields = {}
                    this.$router.push({name: 'users.index'})
                } )
            }
        }
    }
};
</script>
