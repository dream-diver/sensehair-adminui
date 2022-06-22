<template>
    <div>
        <page-title :heading="pageTitle.heading" :subheading="pageTitle.subheading" :icon="pageTitle.icon">

        </page-title>

        <layout-wrapper>
            <card subheading="">
                <v-data-table :headers="headers" :items="applications" :disable-initial-sort="true" hide-actions
                    class="elevation-1" :loading="!dataLoaded">
                    <template v-slot:items="props">
                        <tr>
                            <td @click="showApplication(props.item)" class="">{{ props.item.firstName + ' ' +
                                    props.item.lastName
                            }}</td>
                            <td @click="showApplication(props.item)" class="">{{ props.item.email }}</td>
                            <td @click="showApplication(props.item)" class="">{{ props.item.phone }}</td>
                            <td @click="showApplication(props.item)" class="">{{ new
                                    Date(props.item.created_at).toDateString()
                            }}</td>
                            <td class="justify-start align-items-center layout px-0">
                                <a @click.prevent="showApplication(props.item)">
                                    <v-icon small class="mr-2"> mdi-eye </v-icon>
                                </a>
                                <a @click.prevent="deleteApplicationClicked(props.item)">
                                    <v-icon small> delete </v-icon>
                                </a>
                            </td>
                        </tr>
                    </template>
                    <template v-slot:no-data>
                        <h5 v-if="!dataLoaded" class="text-primary text-center">Loading...</h5>
                        <h5 v-else class="text-secondary text-center">No Data</h5>
                    </template>
                </v-data-table>
                <!-- <div class="text-xs-center mt-2">
                    <v-pagination v-model="thisPagination.current_page" :length="pagination.last_page"
                        :total-visible="7" @input="paginationUpdated"></v-pagination>
                </div> -->

                <v-dialog v-model="deleteApplicationDialogueVisible" max-width="290">
                    <v-card>
                        <v-card-title class="headline justify-content-center">Delete Application</v-card-title>

                        <v-card-text class="justify-content-center">Are You sure you want to delete this Application?
                        </v-card-text>

                        <v-card-actions>
                            <v-container fluid>
                                <v-layout class="justify-content-center">
                                    <button type="button" @click="deleteApplicationConfirmed"
                                        class="btn btn-danger mr-2">
                                        Yes, Delete It
                                    </button>
                                    <button type="button" @click="deleteApplicationDialogueVisible = false"
                                        class="btn btn-success">
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
<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faPlus);
import Card from "@/Layout/Components/Card";

import { mapGetters } from 'vuex'
import PageTitle from "@/Layout/Components/PageTitle.vue";
import LayoutWrapper from "@/Layout/Components/LayoutWrapper";
import { all } from "q";
export default {
    components: {
        PageTitle,
        "layout-wrapper": LayoutWrapper,
        FontAwesomeIcon,
        Card,
    },
    data: () => ({
        dataLoaded: false,
        deleteApplicationDialogueVisible: false,
        deleteApplicationCandidate: null,
        applications: [],
        pageTitle: {
            heading: "Job Applications",
            subheading: "Bellow all the job applications submitted from the website.",
            icon: "pe-7s-users icon-gradient bg-tempting-azure",
        },
        thisPagination: {
            current_page: 1,
            per_page: 10,
        },


        headers: [
            { text: 'Name', value: 'firstName' },
            { text: 'Email', value: 'email' },
            { text: 'Phone', value: 'phone' },
            { text: 'Submitted', value: 'created_at' },
            { text: 'Actions', value: 'actions' },
        ],
    }),
    computed: {
        ...mapGetters('auth', [
            'loggedInUser'
        ]),
    },
    created() {
        this.protection();
        this.getApplications()
    },
    methods: {
        getApplications() {
            var link = "api/career/applications"
            var params = {
                limit: all,
            }
            this.dataLoaded = false
            axios.get(link, { params }).then(({ data }) => {
                var sanitizedData = data;
                this.applications = sanitizedData
                this.dataLoaded = true
                this.$store.dispatch('pagination/setPaginationData', data.meta)

            }).catch(({ data }) => {
                this.dataLoaded = true
            })
        },
        showApplication(application) {
            this.$router.push({ name: 'job-applications.show', params: { id: application.id } })
        },
        deleteApplicationClicked(user) {
            this.deleteApplicationDialogueVisible = true
            this.deleteApplicationCandidate = user
        },
        deleteApplicationConfirmed() {
            this.deleteApplicationDialogueVisible = false
            axios.post(`api/career/applications/${this.deleteApplicationCandidate.id}/delete`).then(response => {
                this.deleteApplicationCandidate = null
                this.getApplications()
            }).catch(error => {
            })
        },
        protection() {
            const loggedInRole = this.loggedInUser.data.role;
            if (loggedInRole !== 'admin') {
                // console.log("Not permitted")
                this.$router.push('/');
            }
        }
    },
};
</script>