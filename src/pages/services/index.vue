<template>
    <div>
        <page-title :heading="pageTitle.heading" :subheading="pageTitle.subheading" :icon="pageTitle.icon">
            <template v-slot:actions>
                <button type="button" @click="$router.push({name: 'services.create'})" class="btn-shadow d-inline-flex align-items-center btn btn-success mr-2">
                    <font-awesome-icon class="mr-2" icon="plus" /> Create Service
                </button>
            </template>
        </page-title>

        <layout-wrapper>
            <card :heading="this.pagination.message" subheading="" >
                <template v-slot:action2>
                    <v-layout>
                        <b-form-select v-model="thisPagination.per_page" @change="numOfRowsChanged" :options="pagination.numOfRowsOptions" size="sm" class="mt-0"></b-form-select>
                    </v-layout>
                </template>
                <v-data-table
                    :headers="headers"
                    :items="servicesData"
                    :disable-initial-sort="true"
                    hide-actions
                    class="elevation-1"
                    :loading="!servicesDataLoaded"
                    >
                    <template v-slot:items="props">
                        <tr>
                            <td @click="showService(props.item)" class="">{{ props.item.name }}</td>
                            <td @click="showService(props.item)" class="">{{ props.item.duration }} minutes</td>
                            <td @click="showService(props.item)" class="">€{{ props.item.price }}</td>
                            <td class="justify-center align-items-center layout px-0">
                                <a @click.prevent="showService(props.item)"> <v-icon small class="mr-2" > mdi-eye </v-icon> </a>
                                <a @click.prevent="editService(props.item)" > <v-icon small class="mr-2" > edit </v-icon> </a>
                                <a @click.prevent="deleteServiceClicked(props.item)"> <v-icon small> delete </v-icon> </a>
                            </td>
                        </tr>
                    </template>
                    <template v-slot:no-data>
                        <h5 v-if="!servicesDataLoaded" class="text-primary text-center">Loading...</h5>
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

                <v-dialog v-model="deleteServiceDialogueVisible" max-width="290">
                    <v-card>
                        <v-card-title class="headline justify-content-center">Delete Service</v-card-title>

                        <v-card-text class="justify-content-center">Are You sure you want to delete this Service?</v-card-text>

                        <v-card-actions>
                            <v-container fluid>
                                <v-layout class="justify-content-center">
                                    <button type="button" @click="deleteServiceConfirmed" class="btn btn-danger mr-2">
                                        Yes, Delete It
                                    </button>
                                    <button type="button" @click="deleteServiceDialogueVisible = false" class="btn btn-success">
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
        pageTitle: {
            heading: "Manage Services",
            subheading: "Bellow all the Services listed. To take necessary action choose action under actions tab.",
            icon: "pe-7s-plane icon-gradient bg-tempting-azure",
        },
        servicesData: [],
        servicesDataLoaded: false,
        deleteServiceDialogueVisible: false,
        deleteServiceCandidate: null,
        thisPagination: {
            current_page: 1,
            per_page: 10,
        },
        /////////////////////////////////////////////////
        headers: [
            { text: 'Name', value: 'name' },
            { text: 'Duration', value: 'duration' },
            { text: 'Price', value: 'price' },
            { text: 'Actions', value: 'actions' },
        ],
        /////////////////////////////////////////////////
    }),
    computed: {
        ...mapGetters({ 
            pagination: 'pagination/pagination',
        }),
    },
    created(){
        this.getServicesData()
    },

    methods: {
        getServicesData () {
            var link = "api/services"
            var params = {
                page: this.thisPagination.current_page,
                limit: this.thisPagination.per_page
            }
            this.servicesDataLoaded = false
            axios.get(link, {params}).then( ({data}) => {
                var sanitizedData = data.data.map(i => {
                    i.data['selfLink'] = i.links.self
                    return i.data
                })
                this.servicesData = sanitizedData
                this.servicesDataLoaded = true
                this.$store.dispatch('pagination/setPaginationData', data.meta)

            } ).catch( ({ data }) => {
                this.servicesDataLoaded = true
            })
        },
        editService(service){
            this.$router.push({name: 'services.edit', params: { id: service.id }})
        },
        showService(service){
            this.$router.push({name: 'services.show', params: { id: service.id }})
        },
        deleteServiceClicked(service){
            this.deleteServiceDialogueVisible = true
            this.deleteServiceCandidate = service
        },
        deleteServiceConfirmed(){
            this.deleteServiceDialogueVisible = false
            axios.delete(this.deleteServiceCandidate.selfLink).then( response => {
                this.deleteServiceCandidate = null
                this.getServicesData()
            } ).catch(error => {
            })
        },
        paginationUpdated(){
            this.getServicesData()
        },
        numOfRowsChanged(){
            this.getServicesData()
        },
    }
};
</script>
