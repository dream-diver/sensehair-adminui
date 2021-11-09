<template>
    <v-layout wrap>
        <v-flex sm4 xs12 class="text-sm-left text-xs-center" >
            <v-btn @click="$refs.calendar.prev()"> <v-icon dark left > keyboard_arrow_left </v-icon> Prev
            </v-btn>
        </v-flex>
        <v-flex sm4 xs12 class="text-xs-center" > </v-flex>
        <v-flex sm4 xs12 class="text-sm-right text-xs-center" >
            <v-btn @click="$refs.calendar.next()"> Next <v-icon right dark > keyboard_arrow_right </v-icon> </v-btn>
        </v-flex>

        <v-flex xs12 class="mt-3" >
            <v-sheet height="500">
                <v-calendar ref="calendar" v-model="startDay" :type="type" color="primary" >

                    <template v-slot:day="{ date }">
                        <template v-for="booking in bookingsMap[date]">
                            <v-menu :key="booking.title" v-model="booking.open" full-width offset-x >
                                <template v-slot:activator="{ on }">
                                    <div v-ripple class="my-booking" v-on="on" v-html="booking.time + ' - ' + booking.title" ></div>
                                </template>
                                <v-card color="grey lighten-4" min-width="350px" flat >
                                    <v-toolbar color="primary" dark >
                                        <v-toolbar-title @click="titleClicked(booking)" v-html="booking.title"></v-toolbar-title>
                                    </v-toolbar>
                                    <v-card-title primary-title>
                                        <span v-html="booking.details"></span>
                                    </v-card-title>
                                    <v-card-actions>
                                        <v-btn flat color="secondary" > Cancel </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-menu>
                        </template>
                    </template>

                </v-calendar>
            </v-sheet>
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
export default {
    data: () => ({
        type: 'month',
        startDay: (new Date()).toISOString().split('T')[0],
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        bookings: [
            // {
            //     title: 'Vacation',
            //     details: 'Going to the beach!',
            //     date: '2021-11-01',
            //     time: '10:00',
            //     open: false
            // },
            // {
            //     title: 'Meeting',
            //     details: 'Spending time on how we do not have enough time',
            //     date: '2021-11-07',
            //     time: '10:00',
            //     open: false
            // },
            // {
            //     title: '30th Birthday',
            //     details: 'Celebrate responsibly',
            //     date: '2021-11-03',
            //     time: '10:00',
            //     open: false
            // },
            // {
            //     title: 'New Year',
            //     details: 'Eat chocolate until you pass out',
            //     date: '2021-11-01',
            //     time: '10:00',
            //     open: false
            // },
            // {
            //     title: 'Conference',
            //     details: 'Mute myself the whole time and wonder why I am on this call',
            //     date: '2021-11-21',
            //     time: '10:00',
            //     open: false
            // },
        ],
    }),
    computed: {
        // convert the list of bookings into a map of lists keyed by date
        bookingsMap () {
            const map = {}
            this.bookings.forEach(e => (map[e.date] = map[e.date] || []).push(e))
            return map
        },
        currentMonth(){
            return (new Date(this.startDay)).getMonth() + 1
        },
        currentYear(){
            return (new Date(this.startDay)).getFullYear()
        },
    },
    mounted(){
        var link = "api/bookings"
        var params = {
            year: this.currentYear,
            month: this.currentMonth,
            orderBy: 'booking_time',
            limit: 'all',
        }
        axios.get(link, { params })
            .then(({data}) => {
                this.bookings = data.data.map(i => ({
                    id: i.data.id,
                    title: i.data.customer.data.name,
                    details: 'For ' + i.data.server.data.name + ' at ' + i.data.booking_time.split(' ')[1],
                    date: i.data.booking_time.split(' ')[0],
                    time: i.data.booking_time.split(' ')[1],
                    // open: false,
                }))
                console.log(data.data.map(i => i.data.booking_time));
            })
    },
    methods: {
        open (booking) {
            alert(booking.title)
        },
        titleClicked(booking){
            this.$router.push({name: 'bookings.show', params: { id: booking.id }})
        }
    }
}
</script>
