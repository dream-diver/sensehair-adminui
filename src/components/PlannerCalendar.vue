<template>
    <v-layout wrap>
        <v-flex sm4 xs12 class="text-sm-left text-xs-center">
            <v-btn @click="previousClicked">
                <v-icon dark left> keyboard_arrow_left </v-icon> Prev
            </v-btn>
        </v-flex>

        <v-flex sm4 xs12 class="text-xs-center">
            <v-select v-model="server_id" :items="servers" item-text="name" item-value="id" @change="getBookings"
                label="Select Server"></v-select>
        </v-flex>

        <v-flex sm4 xs12 class="text-sm-right text-xs-center">
            <v-btn @click="nextClicked">
                Next <v-icon right dark> keyboard_arrow_right </v-icon>
            </v-btn>
        </v-flex>

        <v-flex xs12 class="mt-3">
            <v-calendar ref="calendar" v-model="startDay" :type="type" color="primary">
                <template v-slot:day="{ date }">
                    <template v-for="booking in bookingsMap[date]">
                        <v-menu :key="booking.title" v-model="booking.open" full-width offset-x>
                            <template v-slot:activator="{ on }">
                                <div v-ripple class="my-booking" v-on="on" v-html="
                                    booking.time + ' - ' + booking.title
                                "></div>
                            </template>

                            <v-card color="grey lighten-4" min-width="350px" flat>
                                <v-toolbar color="primary" dark>
                                    <v-toolbar-title @click="titleClicked(booking)" v-html="booking.title">
                                    </v-toolbar-title>
                                </v-toolbar>
                                <v-card-title primary-title>
                                    <div>
                                        <h5>{{ booking.details }}</h5>
                                        <p><b>Services: </b></p>
                                        <p v-for="service in booking.services" :key="service.data.id" class="mb-0">
                                            {{ service.data.name }} -
                                            {{ service.data.duration }} min
                                        </p>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn @click="cancelBooking(booking.id)" flat color="secondary">
                                        Cancel
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-menu>
                    </template>
                </template>
            </v-calendar>
        </v-flex>
    </v-layout>
</template>

<style lang="stylus" scoped>
.my-booking {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    width: 100%;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
}
</style>

<script>
import { mapGetters } from "vuex";
export default {

    data: () => ({
        type: "month",
        startDay: new Date().toISOString().split("T")[0],
        monthNames: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
        bookings: [],
        server_id: null,
        servers: [],
    }),
    computed: {
        // convert the list of bookings into a map of lists keyed by date
        bookingsMap() {
            const map = {};
            this.bookings.forEach((e) =>
                (map[e.date] = map[e.date] || []).push(e)
            );
            return map;
        },
        currentMonth() {
            return new Date(this.startDay).getMonth() + 1;
        },
        currentYear() {
            return new Date(this.startDay).getFullYear();
        },
        ...mapGetters("auth", ["loggedInUser"]),
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            const st = JSON.parse(localStorage.getItem('vuex'));
            if (st.auth.loggedInUser.data.role === 'admin') {
                this.servers.push({ name: "All", id: null })
                this.getBookings();
                this.getServers();
            }
            else {
                this.getOwnBookings(st.auth.loggedInUser.data.id);
            }
        },

        cancelBooking(booking_id) {
            var link = "api/bookings/cancel";
            var params = {
                booking_id,
            };

            axios.post(link, { params }).then(({ data }) => {
                console.log(this.bookings);
                this.bookings = this.bookings.filter(el => el.id != booking_id);
            });
        },
        getBookings() {
            var link = "api/bookings";
            var params = {
                year: this.currentYear,
                month: this.currentMonth,
                orderBy: "booking_time",
                limit: "all",
            };

            if (this.server_id) {
                params.server_id = this.server_id;
            }

            axios.get(link, { params }).then(({ data }) => {
                this.bookings = data.data.map((i) => ({
                    id: i.data.id,
                    title: i.data.customer
                        ? i.data.customer.data.name
                        : i.data.name,
                    details:
                        "For " +
                        i.data.server.data.name +
                        " at " +
                        i.data.booking_time.split(" ")[1],
                    services: i.data.services,
                    date: i.data.booking_time.split(" ")[0],
                    time: i.data.booking_time.split(" ")[1],
                    // open: false,
                }));
            });
        },

        getOwnBookings(id) {
            var link = "api/bookings";
            var params = {
                year: this.currentYear,
                month: this.currentMonth,
                orderBy: "booking_time",
                limit: "all",
                server_id: id,
            };
            axios.get(link, { params }).then(({ data }) => {
                this.bookings = data.data.map((i) => ({
                    id: i.data.id,
                    title: i.data.customer
                        ? i.data.customer.data.name
                        : i.data.name,
                    details:
                        "For " +
                        i.data.server.data.name +
                        " at " +
                        i.data.booking_time.split(" ")[1],
                    services: i.data.services,
                    date: i.data.booking_time.split(" ")[0],
                    time: i.data.booking_time.split(" ")[1],
                    // open: false,
                }));
            });
        },
        previousClicked() {
            this.$refs.calendar.prev();
            this.getBookings();
        },
        nextClicked() {
            this.$refs.calendar.next();
            this.getBookings();
        },
        open(booking) {
            alert(booking.title);
        },
        titleClicked(booking) {
            this.$router.push({
                name: "bookings.show",
                params: { id: booking.id },
            });
        },
        async getServers() {

            const params = {
                role: "stylist",
                limit: "all",
            };
            var link = "api/users";
            await axios.get(link, { params }).then(({ data }) => {
                const servers = data.data.map((i) => i.data);
                this.servers.push(...servers);
            });

            params.role = "art_director";
            await axios.get(link, { params }).then(({ data }) => {
                const servers = data.data.map((i) => i.data);
                this.servers.push(...servers);
            });
        },
    },
};
</script>
