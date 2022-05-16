<template>
    <div>
        <page-title :heading="pageTitle.heading" :subheading="pageTitle.subheading" :icon="pageTitle.icon">
            <template v-slot:actions>
                <button type="button" @click="$router.push({name: 'promocodes.create'})" class="btn-shadow d-inline-flex align-items-center btn btn-success mr-2">
                    <font-awesome-icon class="mr-2" icon="plus" /> Create Promocode
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
                    :items="promocodesData"
                    :disable-initial-sort="true"
                    hide-actions
                    class="elevation-1"
                    :loading="!promocodesDataLoaded"
                    >
                    <template v-slot:items="props">
                        <tr>
                            <td @click="showPromocode(props.item)" class="">{{ props.item.code }}</td>
                            <td @click="showPromocode(props.item)" class="">{{ props.item.discount }}%</td>
                            <td class="justify-center align-items-center layout px-0">
                                <a @click.prevent="showPromocode(props.item)"> <v-icon small class="mr-2" > mdi-eye </v-icon> </a>
                                <a @click.prevent="editPromocode(props.item)" > <v-icon small class="mr-2" > edit </v-icon> </a>
                                <a @click.prevent="deletePromocodeClicked(props.item)"> <v-icon small> delete </v-icon> </a>
                            </td>
                        </tr>
                    </template>
                    <template v-slot:no-data>
                        <h5 v-if="!promocodesDataLoaded" class="text-primary text-center">Loading...</h5>
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

                <v-dialog v-model="deletePromocodeDialogueVisible" max-width="290">
                    <v-card>
                        <v-card-title class="headline justify-content-center">Delete Promocode</v-card-title>

                        <v-card-text class="justify-content-center">Are You sure you want to delete this Promocode?</v-card-text>

                        <v-card-actions>
                            <v-container fluid>
                                <v-layout class="justify-content-center">
                                    <button type="button" @click="deletePromocodeConfirmed" class="btn btn-danger mr-2">
                                        Yes, Delete It
                                    </button>
                                    <button type="button" @click="deletePromocodeDialogueVisible = false" class="btn btn-success">
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
            heading: "Manage Promocodes",
            subheading: "Bellow all the Promocodes listed. To take necessary action choose action under actions tab.",
            icon: "pe-7s-note icon-gradient bg-tempting-azure",
        },
        promocodesData: [],
        promocodesDataLoaded: false,
        deletePromocodeDialogueVisible: false,
        deletePromocodeCandidate: null,
        thisPagination: {
            current_page: 1,
            per_page: 10,
        },
        /////////////////////////////////////////////////
        headers: [
            { text: 'Code', value: 'code' },
            { text: 'Discount', value: 'discount' },
        ],
        /////////////////////////////////////////////////
    }),
    computed: {
        ...mapGetters({ 
            pagination: 'pagination/pagination',
        }),
    },
    created(){
        this.getPromocodesData()
    },

    methods: {
        getPromocodesData () {
            var link = "api/promocodes"
            var params = {
                page: this.thisPagination.current_page,
                limit: this.thisPagination.per_page
            }
            this.promocodesDataLoaded = false
            axios.get(link, {params}).then( ({data}) => {
                var sanitizedData = data.data.map(i => {
                    i.data['selfLink'] = i.links.self
                    return i.data
                })
                this.promocodesData = sanitizedData
                this.promocodesDataLoaded = true
                this.$store.dispatch('pagination/setPaginationData', data.meta)

            } ).catch( ({ data }) => {
                this.promocodesDataLoaded = true
            })
        },
        editPromocode(promocode){
            this.$router.push({name: 'promocodes.edit', params: { id: promocode.id }})
        },
        showPromocode(promocode){
            this.$router.push({name: 'promocodes.show', params: { id: promocode.id }})
        },
        deletePromocodeClicked(promocode){
            this.deletePromocodeDialogueVisible = true
            this.deletePromocodeCandidate = promocode
        },
        deletePromocodeConfirmed(){
            this.deletePromocodeDialogueVisible = false
            axios.delete(this.deletePromocodeCandidate.selfLink).then( response => {
                this.deletePromocodeCandidate = null
                this.getPromocodesData()
            } ).catch(error => {
            })
        },
        paginationUpdated(){
            this.getPromocodesData()
        },
        numOfRowsChanged(){
            this.getPromocodesData()
        },
    }
};
</script>
