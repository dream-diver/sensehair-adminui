<template>
    <div>
        <page-title :heading="pageTitle.heading" :subheading="pageTitle.subheading" :icon="pageTitle.icon">
            <template v-slot:actions>
                <button type="button" @click="$router.push({name: 'bookings.index'})" class="btn-shadow d-inline-flex align-items-center btn btn-secondary mr-2">
                    <font-awesome-icon class="mr-2" icon="list" /> All Bookings
                </button>
                <button type="button" @click="$router.push({name: 'bookings.edit'})" class="btn-shadow d-inline-flex align-items-center btn btn-success mr-2">
                    <font-awesome-icon class="mr-2" icon="edit" /> Edit Booking
                </button>
            </template>
        </page-title>

        <layout-wrapper>
            <v-container fluid>
                <card heading="Booking Details" subheading="" >
                    <v-layout>
                        <v-flex xs12 md6>
                            <v-container fluid>
                                <v-text-field v-model="showBookingFields.booking_time" label="Booking Time" readonly="readonly"></v-text-field>
                                <v-text-field v-model="showBookingFields.charge" label="Charge(€)" readonly="readonly"></v-text-field>
                                <v-text-field v-model="showBookingFields.duration" label="Duration(minutes)" readonly="readonly"></v-text-field>
                                <v-text-field v-if="showBookingFields.promocode" v-model="showBookingFields.promocode.data.code" label="Used Promocode" readonly="readonly"></v-text-field>
                            </v-container>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-container fluid>
                                <v-text-field v-if="showBookingFields.customer" v-model="showBookingFields.customer.data.name" label="Customer" readonly="readonly"></v-text-field>
                                <v-text-field v-if="showBookingFields.name" v-model="showBookingFields.name" label="Guest Name" readonly="readonly"></v-text-field>
                                <v-text-field v-if="showBookingFields.phone" v-model="showBookingFields.phone" label="Guest Phone" readonly="readonly"></v-text-field>
                                <v-text-field v-if="showBookingFields.email" v-model="showBookingFields.email" label="Guest Email" readonly="readonly"></v-text-field>
                                <v-text-field v-model="showBookingFields.server.data.name" label="Server" readonly="readonly"></v-text-field>
                                <v-text-field v-model="showBookingFields.payment_status" label="Payment" readonly="readonly"></v-text-field>
                            </v-container>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex xs12 md4>
                        </v-flex>
                        <v-flex xs12 md4>
                            <v-container fluid>
                                <h5>Services</h5>
                                <b-list-group class="mt-2">
                                    <b-list-group-item v-for="service in showBookingFields.services" :key="service.data.id">{{service.data.name}} - €{{service.data[showBookingFields.server.data.role + '_price']}}</b-list-group-item>
                                </b-list-group>
                            </v-container>
                        </v-flex>
                        <v-flex xs12 md4>
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
        showBookingFields: {
            customer: { data: {} },
            server: { data: {} },
        },
        pageTitle: {
            heading: "View Booking",
            subheading: "Below is the information listed for the selected booking",
            icon: "pe-7s-plane icon-gradient bg-tempting-azure",
        },
    }),
    computed: {
    },
    created(){
        this.getBookingData(this.$route.params.id)
    },

    methods: {
        getBookingData(id){
            var link = `api/bookings/${id}`
            axios.get(link).then(({data}) => {
                this.showBookingFields = data.booking.data
            })
        },
    }
};
</script>
