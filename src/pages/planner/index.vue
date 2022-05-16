<template>
    <div>
        <page-title
            :heading="pageTitle.heading"
            :subheading="pageTitle.subheading"
            :icon="pageTitle.icon"
        >
        </page-title>

        <layout-wrapper>
            <card heading="Planner" subheading="" class="mb-5">
                <planner-calendar> </planner-calendar>
            </card>
        </layout-wrapper>
    </div>
</template>

<style scoped>
</style>

<script>
import { mapGetters } from "vuex";
import PageTitle from "@/Layout/Components/PageTitle.vue";
import LayoutWrapper from "@/Layout/Components/LayoutWrapper";
import Card from "@/Layout/Components/Card";
import PlannerCalendar from "@/components/PlannerCalendar";

export default {
    components: {
        PageTitle,
        "layout-wrapper": LayoutWrapper,
        Card,
        PlannerCalendar,
    },

    data: () => ({
        pageTitle: {
            heading: "Planner",
            subheading:
                "Bellow is all the bookings are listed in a calendar view",
            icon: "pe-7s-plane",
        },
    }),
    computed: {
        ...mapGetters({}),
    },
    created() {},

    methods: {},
};
</script>
