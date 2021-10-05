<template>
    <div>
        <page-title :heading="pageTitle.heading" :subheading="pageTitle.subheading" :icon="pageTitle.icon">
            <template v-slot:actions>
                <button type="button" @click="$router.push({name: 'users.create'})" class="btn-shadow d-inline-flex align-items-center btn btn-success mr-2">
                    <font-awesome-icon class="mr-2" icon="plus" /> Create User
                </button>
            </template>
        </page-title>

        <layout-wrapper>
            <card :heading="this.pagination.message" subheading="" >
                <template v-slot:actions>
                    <b-form-select v-model="thisPagination.per_page" @change="numOfRowsChanged" :options="pagination.numOfRowsOptions" size="sm" class="mt-0"></b-form-select>
                </template>
                <v-data-table
                    :headers="headers"
                    :items="usersData"
                    hide-actions
                    class="elevation-1"
                    :loading="!usersDataLoaded"
                    >
                    <template v-slot:items="props">
                        <tr>
                            <td @click="showUser(props.item)" class="">{{ props.item.name }}</td>
                            <td @click="showUser(props.item)" class="">{{ props.item.email }}</td>
                            <td @click="showUser(props.item)" class="">{{ props.item.phone }}</td>
                            <td class="justify-center align-items-center layout px-0">
                                <a @click.prevent="showUser(props.item)"> <v-icon small class="mr-2" > mdi-eye </v-icon> </a>
                                <a @click.prevent="editUser(props.item)" > <v-icon small class="mr-2" > edit </v-icon> </a>
                                <a @click.prevent="deleteUserClicked(props.item)"> <v-icon small> delete </v-icon> </a>
                            </td>
                        </tr>
                    </template>
                    <template v-slot:no-data>
                        <h5 v-if="!usersDataLoaded" class="text-primary text-center">Loading...</h5>
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

                <v-dialog v-model="deleteUserDialogueVisible" max-width="290">
                    <v-card>
                        <v-card-title class="headline">Delete User</v-card-title>

                        <v-card-text>Are You sure you want to delete this User?</v-card-text>

                        <v-card-actions>
                            <v-container fluid>
                                <v-btn color="error" @click="deleteUserConfirmed">Yes, Delete It.</v-btn>
                                <v-btn color="success" @click="deleteUserDialogueVisible = false">Not Sure</v-btn>
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
            heading: "Manage Users",
            subheading: "Bellow all the Users listed. To take necessary action choose action under actions tab.",
            icon: "pe-7s-plane icon-gradient bg-tempting-azure",
        },
        usersData: [],
        usersDataLoaded: false,
        deleteUserDialogueVisible: false,
        deleteUserCandidate: null,
        thisPagination: {
            current_page: 1,
            per_page: 10,
        },
        /////////////////////////////////////////////////
        headers: [
            { text: 'Name', value: 'name' },
            { text: 'Email', value: 'email' },
            { text: 'Phone/SMS Alert', value: 'phone' },
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
        this.getUsersData()
    },

    methods: {
        getUsersData () {
            var link = "api/users"
            var params = {
                role: 'customer',
                page: this.thisPagination.current_page,
                limit: this.thisPagination.per_page
            }
            this.usersDataLoaded = false
            axios.get(link, {params}).then( ({data}) => {
                var sanitizedData = data.data.map(i => {
                    i.data['selfLink'] = i.links.self
                    return i.data
                })
                this.usersData = sanitizedData
                this.usersDataLoaded = true
                this.$store.dispatch('pagination/setPaginationData', data.meta)

            } ).catch( ({ data }) => {
                this.usersDataLoaded = true
            })
        },
        editUser(user){
            this.$router.push({name: 'users.edit', params: { id: user.id }})
        },
        showUser(user){
            this.$router.push({name: 'users.show', params: { id: user.id }})
        },
        deleteUserClicked(user){
            this.deleteUserDialogueVisible = true
            this.deleteUserCandidate = user
        },
        deleteUserConfirmed(){
            this.deleteUserDialogueVisible = false
            axios.delete(this.deleteUserCandidate.selfLink).then( response => {
                this.deleteUserCandidate = null
                this.getUsersData()
            } ).catch(error => {
            })
        },
        paginationUpdated(){
            this.getUsersData()
        },
        numOfRowsChanged(){
            this.getUsersData()
        },
    }
};
</script>
