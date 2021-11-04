<template>
    <div>
        <page-title :heading="pageTitle.heading" :subheading="pageTitle.subheading" :icon="pageTitle.icon">
            <template v-slot:actions>
                <button type="button" @click="$router.push({name: 'bookings.create'})" class="btn-shadow d-inline-flex align-items-center btn btn-success mr-2">
                    <font-awesome-icon class="mr-2" icon="plus" /> Create Booking
                </button>
            </template>
        </page-title>

        <layout-wrapper>
            <card :heading="this.pagination.message" subheading="" >
                <template v-slot:action1>
                    <v-layout>
                        <b-form-select v-model="thisPagination.per_page" @change="numOfRowsChanged" :options="pagination.numOfRowsOptions" size="sm" class="mt-0"></b-form-select>
                    </v-layout>
                </template>
                <v-data-table
                    :headers="headers"
                    :items="bookingsData"
                    :disable-initial-sort="true"
                    hide-actions
                    class="elevation-1"
                    :loading="!bookingsDataLoaded"
                    >
                    <template v-slot:items="props">
                        <tr>
                            <td @click="showBooking(props.item)" class="">{{ props.item.booking_time }}</td>
                            <td @click="showBooking(props.item)" class="">£{{ props.item.charge }}</td>
                            <td @click="showBooking(props.item)" class="">{{ props.item.customer ? props.item.customer.data.name : 'NA' }}</td>
                            <td @click="showBooking(props.item)" class="">{{ props.item.payment_status }}</td>
                            <td @click="showBooking(props.item)" class="">{{ props.item.server ? props.item.server.data.name : 'NA' }}</td>
                            <!-- <td @click="showBooking(props.item)" class="">{{ $data._.startCase(props.item.server.data.role.split('_').join(' ')) }}</td> -->
                            <td class="justify-center align-items-center layout px-0">
                                <a @click.prevent="showBooking(props.item)"> <v-icon small class="mr-2" > mdi-eye </v-icon> </a>
                                <a @click.prevent="editBooking(props.item)" > <v-icon small class="mr-2" > edit </v-icon> </a>
                                <a @click.prevent="deleteBookingClicked(props.item)"> <v-icon small> delete </v-icon> </a>
                            </td>
                        </tr>
                    </template>
                    <template v-slot:no-data>
                        <h5 v-if="!bookingsDataLoaded" class="text-primary text-center">Loading...</h5>
                        <h5 v-else class="text-secondary text-center">No Data</h5>
                    </template>
                </v-data-table>
                <div class="text-xs-center mt-2">
                    <v-pagination
                      v-model="thisPagination.current_page"
                      :length="pagination.last_page"
                      :total-visible="7"
                      @input="paginationUpdated"
                    ></v-pagination>
                  </div>

                <v-dialog v-model="deleteBookingDialogueVisible" max-width="290">
                    <v-card>
                        <v-card-title class="headline justify-content-center">Delete Booking</v-card-title>

                        <v-card-text class="justify-content-center">Are You sure you want to delete this Booking?</v-card-text>

                        <v-card-actions>
                            <v-container fluid>
                                <v-layout class="justify-content-center">
                                    <button type="button" @click="deleteBookingConfirmed" class="btn btn-danger mr-2">
                                        Yes, Delete It
                                    </button>
                                    <button type="button" @click="deleteBookingDialogueVisible = false" class="btn btn-success">
                                        Not Sure
                                    </button>
                                </v-layout>
                            </v-container>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </card>
        </layout-wrapper>
    </div>
</template>

<style scoped>
</style>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faPlus);
import _ from 'lodash'

import { mapGetters } from 'vuex'
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
        _,
        pageTitle: {
            heading: "Manage Bookings",
            subheading: "Bellow all the Bookings listed. To take necessary action choose action under actions tab.",
            icon: "pe-7s-plane icon-gradient bg-tempting-azure",
        },
        bookingsData: [],
        bookingsDataLoaded: false,
        deleteBookingDialogueVisible: false,
        deleteBookingCandidate: null,
        thisPagination: {
            current_page: 1,
            per_page: 10,
        },
        /////////////////////////////////////////////////
        headers: [
            { text: 'Booking Time', value: 'booking_time' },
            { text: 'Charge', value: 'charge' },
            { text: 'Name', value: 'customer_name' },
            { text: 'Payment', value: 'payment_status' },
            { text: 'Server', value: 'server_name' },
            // { text: 'Server Role', value: 'server_role' },
        ],
        /////////////////////////////////////////////////
    }),
    computed: {
        ...mapGetters({ 
            pagination: 'pagination/pagination',
        }),
    },
    created(){
        this.getBookingsData()
    },

    methods: {
        getBookingsData () {
            var link = "api/bookings"
            var params = {
                page: this.thisPagination.current_page,
                limit: this.thisPagination.per_page
            }
            this.bookingsDataLoaded = false
            axios.get(link, {params}).then( ({data}) => {
                var sanitizedData = data.data.map(i => {
                    i.data['selfLink'] = i.links.self
                    return i.data
                })
                this.bookingsData = sanitizedData
                this.bookingsDataLoaded = true
                this.$store.dispatch('pagination/setPaginationData', data.meta)

            } ).catch( ({ data }) => {
                this.bookingsDataLoaded = true
            })
        },
        editBooking(booking){
            this.$router.push({name: 'bookings.edit', params: { id: booking.id }})
        },
        showBooking(booking){
            this.$router.push({name: 'bookings.show', params: { id: booking.id }})
        },
        deleteBookingClicked(booking){
            this.deleteBookingDialogueVisible = true
            this.deleteBookingCandidate = booking
        },
        deleteBookingConfirmed(){
            this.deleteBookingDialogueVisible = false
            axios.delete(this.deleteBookingCandidate.selfLink).then( response => {
                this.deleteBookingCandidate = null
                this.getBookingsData()
            } ).catch(error => {
            })
        },
        paginationUpdated(){
            this.getBookingsData()
        },
        numOfRowsChanged(){
            this.getBookingsData()
        },
    }
};
</script>
