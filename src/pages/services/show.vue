<template>
    <div>
        <page-title :heading="pageTitle.heading" :subheading="pageTitle.subheading" :icon="pageTitle.icon">
            <template v-slot:actions>
                <button type="button" @click="$router.push({name: 'services.index'})" class="btn-shadow d-inline-flex align-items-center btn btn-secondary mr-2">
                    <font-awesome-icon class="mr-2" icon="list" /> All Services
                </button>
                <button type="button" @click="$router.push({name: 'services.edit'})" class="btn-shadow d-inline-flex align-items-center btn btn-success mr-2">
                    <font-awesome-icon class="mr-2" icon="edit" /> Edit Service
                </button>
            </template>
        </page-title>

        <layout-wrapper>
            <v-container fluid>
                <card heading="Add a new Service Account" subheading="" >
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
                                <v-text-field v-model="showServiceFields.name" label="Name" readonly="readonly"></v-text-field>
                                <v-text-field v-model="showServiceFields.duration" label="Duration" readonly="readonly"></v-text-field>
                            </v-container>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-container fluid>
                                <v-text-field v-model="showServiceFields.price" label="Price" readonly="readonly"></v-text-field>
                            </v-container>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12 md8 class="mx-auto">
                            <v-subheader size="lg">
                                Stylists
                            </v-subheader>
                            <v-container class="py-1">
                                <div v-for="stylist in showServiceFields.stylists" :key="stylist.data.id">
                                    <v-layout>
                                        <v-flex md3>
                                            {{ stylist.data.name }}
                                        </v-flex>
                                        <v-flex md2>
                                            €{{ stylist.data.pivot.stylist_charge.toFixed(2) }}
                                        </v-flex>
                                    </v-layout>
                                </div>
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
        showServiceFields: {

        },
        pageTitle: {
            heading: "View Service",
            subheading: "Below is the information listed for the selected service",
            icon: "pe-7s-plane icon-gradient bg-tempting-azure",
        },
        email: "",
    }),
    computed: {
    },
    created(){
        this.getServiceData(this.$route.params.id)
    },

    methods: {
        getServiceData(id){
            var link = `api/services/${id}`
            axios.get(link).then(({data}) => {
                this.showServiceFields = data.service.data
                console.log(this.showServiceFields);
            })
        },
    }
};
</script>
