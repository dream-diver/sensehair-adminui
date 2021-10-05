<template>
    <div>
        <page-title :heading="pageTitle.heading" :subheading="pageTitle.subheading" :icon="pageTitle.icon">
            <template v-slot:actions>
                <button type="button" @click="$router.push({name: 'users.index'})" class="btn-shadow d-inline-flex align-items-center btn btn-secondary mr-2">
                    <font-awesome-icon class="mr-2" icon="list" /> All Users
                </button>
                <button type="button" @click="$router.push({name: 'users.edit'})" class="btn-shadow d-inline-flex align-items-center btn btn-success mr-2">
                    <font-awesome-icon class="mr-2" icon="edit" /> Edit User
                </button>
            </template>
        </page-title>

        <layout-wrapper>
            <v-container fluid>
                <card heading="Add a new User Account" subheading="" >
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
                                <v-text-field v-model="showUserFields.name" label="Name" readonly="readonly"></v-text-field>
                                <v-text-field v-model="showUserFields.email" label="Email" readonly="readonly"></v-text-field>
                            </v-container>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-container fluid>
                                <v-text-field v-model="showUserFields.phone" label="Phone" readonly="readonly"></v-text-field>
                                <v-text-field v-model="showUserFields.role" label="Role" readonly="readonly"></v-text-field>
                            </v-container>
                        </v-flex>
                    </v-layout>
                </card>
            </v-container>

        </layout-wrapper>
    </div>
</template>

<style scoped>
</style>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faEdit, faList);

import PageTitle from "@/Layout/Components/PageTitle.vue";
import LayoutWrapper from "@/Layout/Components/LayoutWrapper";
import Card from "@/Layout/Components/Card";

export default {
    components: {
        PageTitle,
        "layout-wrapper": LayoutWrapper,
        Card,
        FontAwesomeIcon,
    },

    data: () => ({
        showUserFields: {

        },
        pageTitle: {
            heading: "View User",
            subheading: "Below is the information listed for the selected user",
            icon: "pe-7s-plane icon-gradient bg-tempting-azure",
        },
        email: "",
    }),
    computed: {
    },
    created(){
        this.getUserData(this.$route.params.id)
    },

    methods: {
        getUserData(id){
            var link = `api/users/${id}`
            axios.get(link).then(({data}) => {
                this.showUserFields = data.user.data
                console.log(this.showUserFields);
            })
        },
    }
};
</script>
