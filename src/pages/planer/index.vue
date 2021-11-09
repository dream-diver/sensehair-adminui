<template>
    <div>
        <page-title :heading="pageTitle.heading" :subheading="pageTitle.subheading" :icon="pageTitle.icon">
        </page-title>

        <layout-wrapper>
            <card heading="Planer" subheading="" >
            <planer-calendar>
            </planer-calendar>
            </card>
        </layout-wrapper>
    </div>
</template>

<style scoped>
</style>

<script>
import { mapGetters } from 'vuex'
import PageTitle from "@/Layout/Components/PageTitle.vue";
import LayoutWrapper from "@/Layout/Components/LayoutWrapper";
import Card from "@/Layout/Components/Card";
import PlanerCalendar from '@/components/PlanerCalendar'

export default {
    components: {
        PageTitle,
        "layout-wrapper": LayoutWrapper,
        Card,
        PlanerCalendar,
    },

    data: () => ({
        pageTitle: {
            heading: "Planer",
            subheading: "Bellow is all the bookings are listed in a calendar view",
            icon: "pe-7s-plane icon-gradient bg-tempting-azure",
        },
    }),
    computed: {
        ...mapGetters({ 
        }),
    },
    created(){
    },

    methods: {
    }
};
</script>
