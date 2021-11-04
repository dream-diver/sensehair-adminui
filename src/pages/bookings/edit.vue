<template>
    <div>
        <page-title :heading="pageTitle.heading" :subheading="pageTitle.subheading" :icon="pageTitle.icon">
            <template v-slot:actions>
                <button type="button" @click="$router.push({name: 'bookings.index'})" class="btn-shadow d-inline-flex align-items-center btn btn-secondary mr-2">
                    <font-awesome-icon class="mr-2" icon="list" /> All Bookings
                </button>
            </template>
        </page-title>

        <layout-wrapper>
            <v-container fluid>
                <card heading="Edit a Booking" subheading="" >
                <v-form ref="form" v-model="formIsValid" lazy-validation>
                    <v-layout>
                        <v-flex xs12 md4>
                            <v-container fluid>
                                    <v-select
                                        v-model="selectedHairSize"
                                        :items="hairSizes"
                                        label="Hair Size"
                                        ></v-select>
                                    <v-select
                                        v-show="selectedHairSize !== 'Men'"
                                        v-model="selectedHairType"
                                        :items="hairTypes"
                                        label="Hair Type"
                                        ></v-select>
                            </v-container>
                            <v-container class="py-0">
                                <v-menu
                                    v-model="showBookingDateMenu"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    min-width="290px"
                                    >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-model="selectedBookingDate"
                                            label="Select Booking Date"
                                            prepend-icon="event"
                                            readonly
                                            v-on="on"
                                            ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="selectedBookingDate"
                                        @input="bookingDateSelected"
                                        :min="todayDate"
                                        :max="maxBookingDate"
                                        ></v-date-picker>
                                </v-menu>
                            </v-container>
                            <v-container class="py-0">
                                <v-select
                                    v-model="selectedBookingTime"
                                    :items="bookingTimes"
                                    label="Booking Time"
                                    :rules="formValidationRules.selectedBookingTimeRules"
                                    ></v-select>
                            </v-container>
                        </v-flex>
                        <v-flex xs12 md4>
                            <v-container fluid>
                                <v-select
                                    v-model="editBookingFields.payment_status"
                                    :items="paymentStatuses"
                                    label="Payment Status"
                                    ></v-select>
                            </v-container>
                            <v-container class="py-1" v-for="service in services" :key="service.id" >
                                <b-form-checkbox v-model="service.selected" size="lg" >
                                    {{ service.name }} - {{ service.duration }} minutes - €{{service.stylist_price}}(Stylist) - €{{service.art_director_price}}(Art Director)
                                </b-form-checkbox>
                            </v-container>
                            <v-container class="py-1">
                                <b>Total Charge: </b> €{{totalCharge}}
                                <br>
                                <b>Total Duration: </b> {{selectedBookingDuration}} minutes
                            </v-container>
                        </v-flex>
                        <v-flex xs12 md4>
                            <v-container class="py-0">
                                <v-radio-group v-model="selectedServerType" @change="getServers" row>
                                    <v-radio label="Stylist" value="stylist"></v-radio>
                                    <v-radio label="Art Director" value="art_director"></v-radio>
                                </v-radio-group>
                            </v-container>
                            <v-container class="py-0">
                                <v-select
                                    v-model="editBookingFields.server_id"
                                    :items="servers"
                                    item-text="name"
                                    item-value="id"
                                    @change="getBookingTimes"
                                    label="Select Server"
                                    ></v-select>
                            </v-container>
                            <v-container class="py-0">
                                <v-select
                                    v-model="editBookingFields.customer_id"
                                    :items="customers"
                                    item-text="name"
                                    item-value="id"
                                    label="Select Customer"
                                    ></v-select>
                            </v-container>
                        </v-flex>
                    </v-layout>

                    <v-container fluid>
                        <b-button @click="editBookingSubmitted(editBookingFields.id)" class="mr-2 mb-2" :variant="formIsValid? 'success':'danger'" :disabled="formIsValid ? false:true">{{formIsValid ? 'Submit': 'Invalid Inputs'}}</b-button>
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
library.add(faList);

import _ from 'lodash'
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
        editBookingFields: {
            server_id: null,
            customer_id: null,
        },

        services: [],
        customers: [],
        servers: [],
        bookingTimes: [],

        selectedHairSize: null,
        selectedHairType: null,
        selectedServerType: null,
        selectedBookingTime: null,
        selectedBookingDate: null,
        hairSizes: ['Men', 'Women Short Hair', 'Women Medium Hair', 'Women Long Hair'],
        hairTypes: ['Straight', 'Wavy', 'Curly', 'Coily'],
        paymentStatuses: ['Unpaid', 'Paid'],
        showBookingDateMenu: false,

        formIsValid: false,
        formValidationRules: {
            selectedBookingTimeRules: [v => !!v || 'Booking Time is required'],
        },
        pageTitle: {
            heading: "Edit Bookings",
            subheading:
            "To edit bookings please fill up the form below.",
            icon: "pe-7s-plane icon-gradient bg-tempting-azure",
            createNewLink: {name: 'booking.create'},
        },
    }),
    computed: {
        totalCharge(){
            return this.services.reduce((sum, i) => sum + ((i.selected)? (i[this.selectedServerType + "_price"]) : 0), 0).toFixed(2);
        },
        todayDate(){
            return (new Date()).toISOString().split('T')[0]
        },
        maxBookingDate(){
            var date = new Date();
            date.setDate(date.getDate() + 60);
            return date.toISOString().split('T')[0];
        },
        selectedBookingDuration(){
            return this.services.filter(i => i.selected).reduce((sum, i) => sum + i.duration, 0)
        }
    },
    watch: {
        selectedHairSize(){
            this.getServices()
        },
        selectedHairType(){
            this.getServices()
        },
        services: {
            deep: true,
            handler(){
                this.getBookingTimes()
            }
        }
    },
    created(){
        this.init()
    },

    methods: {
        getBookingData(id){
            var link = `api/bookings/${id}`
            return axios.get(link).then(({data}) => {
                this.editBookingFields = data.booking.data
                this.selectedBookingDate = this.editBookingFields.booking_time.split(' ')[0]
                this.selectedBookingTime = this.editBookingFields.booking_time.split(' ')[1]
                this.selectedHairSize = this.editBookingFields.services[0].data.hair_size
                this.selectedHairType = this.editBookingFields.services[0].data.hair_type
                this.selectedServerType = this.editBookingFields.server.data.role
            })
        },
        async init(){
            // get current booking data
            await this.getBookingData(this.$route.params.id)

            this.getServices()
            this.getServers()
            this.getCustomers()
        },
        editBookingSubmitted(id){
            if (this.$refs.form.validate()) {
                var link = `api/bookings/${id}`

                const payload = this.sanitizeEditBookingFields()

                axios.patch(link, payload).then( response => {
                    this.$router.push({name: 'bookings.index'})
                } )
            }
        },
        sanitizeEditBookingFields(){
            return {
                booking_time: this.selectedBookingDate + ' ' + this.selectedBookingTime,
                charge: this.totalCharge,
                duration: this.selectedBookingDuration,
                customer_id: this.editBookingFields.customer_id,
                server_id: this.editBookingFields.server_id,
                payment_status: this.editBookingFields.payment_status,
                services: this.services.filter(i => i.selected).map(i => i.id)
            }
        },
        bookingDateSelected(){
            this.showBookingDateMenu = false
            this.getBookingTimes()
        },
        getServices(){
            const params = {
                hair_size: this.selectedHairSize,
                hair_type: this.selectedHairSize != "Men" ? this.selectedHairType : null,
                limit: 'all',
            }
            var link = "api/services"
            return axios.get(link, {params}).then(({data}) => {
                this.services = data.data.map(i => ({...i.data, selected: false}))
                if(this.editBookingFields.services) {
                    this.editBookingFields.services.forEach(i => {
                        const service = this.services.find(j => j.id == i.data.id)
                        if (service) {
                            service.selected = true;
                        }
                    })
                }
            })
        },
        getBookingTimes(){
            if(!this.selectedBookingDuration){
                this.bookingTimes = []
                return
            }

            const params = {
                duration: this.selectedBookingDuration,
                date: this.selectedBookingDate,
            }
            var link = `api/servers/${this.editBookingFields.server_id}/availableTimes`
            return axios.get(link, {params}).then((response) => {
                this.bookingTimes = response.data
                // this.bookingTimes.unshift(this.selectedBookingTime)
            }).catch( err => {
                this.bookingTimes = [this.selectedBookingTime]
            } )
        },
        getCustomers(){
            const params = {
                role: 'customer',
                limit: 'all',
            }
            var link = "api/users"
            axios.get(link, {params}).then(({data}) => {
                this.customers = data.data.map(i => (i.data))
            })
        },
        getServers(){
            const params = {
                role: this.selectedServerType,
                limit: 'all',
            }
            var link = "api/users"
            return axios.get(link, {params}).then(({data}) => {
                this.servers = data.data.map(i => (i.data))
            })
        },
    }
};
</script>
