<template>
    <div>
        <page-title :heading="pageTitle.heading" :subheading="pageTitle.subheading" :icon="pageTitle.icon">
            <template v-slot:actions>
                <button type="button" @click="$router.push({ name: 'job-applications.index' })"
                    class="btn-shadow d-inline-flex align-items-center btn btn-secondary mr-2">
                    <font-awesome-icon class="mr-2" icon="list" /> All Applications
                </button>
            </template>
        </page-title>

        <layout-wrapper>
            <v-container fluid>
                <card heading="Application Details" subheading="">
                    <v-layout>
                        <v-flex xs12 md6>
                            <v-container fluid>
                                <div>
                                    <h4>Personal Information</h4>
                                    <hr />
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td>Name:</td>
                                                <td>{{ `${this.showUserFields.firstName}
                                                                                                    ${this.showUserFields.lastName}`
                                                }}</td>
                                            </tr>
                                            <tr>
                                                <td>Email:</td>
                                                <td>{{ `${this.showUserFields.email}` }}</td>
                                            </tr>
                                            <tr>
                                                <td>Phone:</td>
                                                <td>{{ `${this.showUserFields.phone}` }}</td>
                                            </tr>
                                            <tr>
                                                <td>Date of Birth:</td>
                                                <td>{{ `${new Date(this.showUserFields.dob).toDateString()}` }}</td>
                                            </tr>
                                            <tr>
                                                <td>Address:</td>
                                                <td>{{ `${this.showUserFields.address}, ${this.showUserFields.city}
                                                                                                    ${this.showUserFields.zip}`
                                                }}</td>
                                            </tr>

                                        </tbody>
                                    </table>

                                    <h4>Education</h4>
                                    <hr />
                                    <table class="table">
                                        <tbody>
                                            <tr v-if="JSON.parse(this.showUserFields.education1).school">
                                                <table class="table">
                                                    <tr>
                                                        <td>Institute:</td>
                                                        <td class="text-capitalize">{{
                                                                `${JSON.parse(this.showUserFields.education1).school}`
                                                        }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>From:</td>
                                                        <td class="text-capitalize">{{
                                                                `${JSON.parse(this.showUserFields.education1).from}`
                                                        }}</td>
                                                    </tr>
                                                    <tr>

                                                        <td>To:</td>
                                                        <td class="text-capitalize">{{
                                                                `${JSON.parse(this.showUserFields.education1).to}`
                                                        }}</td>
                                                    </tr>
                                                </table>
                                            </tr>
                                            <tr v-if="JSON.parse(this.showUserFields.education2).school">
                                                <table class="table">
                                                    <tr>
                                                        <td>Institute:</td>
                                                        <td class="text-capitalize">{{
                                                                `${JSON.parse(this.showUserFields.education2).school}`
                                                        }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>From:</td>
                                                        <td class="text-capitalize">{{
                                                                `${JSON.parse(this.showUserFields.education2).from}`
                                                        }}</td>
                                                    </tr>
                                                    <tr>

                                                        <td>To:</td>
                                                        <td class="text-capitalize">{{
                                                                `${JSON.parse(this.showUserFields.education2).to}`
                                                        }}</td>
                                                    </tr>
                                                </table>
                                            </tr>
                                            <tr v-if="JSON.parse(this.showUserFields.education3).school">
                                                <table class="table">
                                                    <tr>
                                                        <td>Institute:</td>
                                                        <td class="text-capitalize">{{
                                                                `${JSON.parse(this.showUserFields.education3).school}`
                                                        }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>From:</td>
                                                        <td class="text-capitalize">{{
                                                                `${JSON.parse(this.showUserFields.education3).from}`
                                                        }}</td>
                                                    </tr>
                                                    <tr>

                                                        <td>To:</td>
                                                        <td class="text-capitalize">{{
                                                                `${JSON.parse(this.showUserFields.education3).to}`
                                                        }}</td>
                                                    </tr>
                                                </table>
                                            </tr>

                                        </tbody>
                                    </table>

                                    <h4>Experience</h4>
                                    <hr />
                                    <table class="table">
                                        <tbody>
                                            <tr v-if="JSON.parse(this.showUserFields.exp1).company">
                                                <table class="table">
                                                    <tr>
                                                        <td>Institute:</td>
                                                        <td class="text-capitalize">{{
                                                                `${JSON.parse(this.showUserFields.exp1).company}`
                                                        }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>From:</td>
                                                        <td class="text-capitalize">{{
                                                                `${JSON.parse(this.showUserFields.exp1).from}`
                                                        }}</td>
                                                    </tr>
                                                    <tr>

                                                        <td>To:</td>
                                                        <td class="text-capitalize">{{
                                                                `${JSON.parse(this.showUserFields.exp1).to}`
                                                        }}</td>
                                                    </tr>
                                                </table>
                                            </tr>
                                            <tr v-if="JSON.parse(this.showUserFields.exp2).company">
                                                <table class="table">
                                                    <tr>
                                                        <td>Institute:</td>
                                                        <td class="text-capitalize">{{
                                                                `${JSON.parse(this.showUserFields.exp2).company}`
                                                        }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>From:</td>
                                                        <td class="text-capitalize">{{
                                                                `${JSON.parse(this.showUserFields.exp2).from}`
                                                        }}</td>
                                                    </tr>
                                                    <tr>

                                                        <td>To:</td>
                                                        <td class="text-capitalize">{{
                                                                `${JSON.parse(this.showUserFields.exp2).to}`
                                                        }}</td>
                                                    </tr>
                                                </table>
                                            </tr>
                                            <tr v-if="JSON.parse(this.showUserFields.exp3).company">
                                                <table class="table">
                                                    <tr>
                                                        <td>Institute:</td>
                                                        <td class="text-capitalize">{{
                                                                `${JSON.parse(this.showUserFields.exp3).company}`
                                                        }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>From:</td>
                                                        <td class="text-capitalize">{{
                                                                `${JSON.parse(this.showUserFields.exp3).from}`
                                                        }}</td>
                                                    </tr>
                                                    <tr>

                                                        <td>To:</td>
                                                        <td class="text-capitalize">{{
                                                                `${JSON.parse(this.showUserFields.exp3).to}`
                                                        }}</td>
                                                    </tr>
                                                </table>
                                            </tr>

                                        </tbody>
                                    </table>

                                </div>
                            </v-container>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-container fluid>
                                <div>
                                    <h4>Job Description</h4>
                                    <hr />
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <td>Apply Position:</td>
                                                <td class="text-capitalize">{{ `${this.showUserFields.type}` }}</td>
                                            </tr>
                                            <tr>
                                                <td>Job-type:</td>
                                                <td>{{ `${this.showUserFields.employment == "full_time" ? "Full Time" :
                                                        "Part Time"}`
                                                }}</td>
                                            </tr>
                                            <tr>
                                                <td>Days available:</td>
                                                <td class="text-capitalize">{{ `${this.showUserFields.weekDays}` }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <h4>Career Motivation</h4>
                                    <hr />
                                    <p>
                                        {{ this.showUserFields.motivation }}
                                    </p>
                                    <h4>Attached Files</h4>
                                    <hr />
                                    <div> {{this.showUserFields.resume && this.showUserFields.resume}} </div>
                                    <a class="btn btn-success" target="_blank" :href="this.backUrl+'/resumes/'+this.showUserFields.resume">Download</a>
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
        showUserFields: {

        },
        pageTitle: {
            heading: "View User",
            subheading: "Below is the information listed for the selected user",
            icon: "pe-7s-users icon-gradient bg-tempting-azure",
        },
        email: "",
        backUrl:process.env.VUE_APP_BACKEND_API_URL,
    }),
    computed: {
    },
    created() {
        this.getUserData(this.$route.params.id)
    },

    methods: {
        getUserData(id) {
            var link = `api/career/applications/${id}`
            axios.get(link).then(({ data }) => {
                this.showUserFields = data
            })
        },
    }
};
</script>
