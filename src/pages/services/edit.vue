<template>
    <div>
        <page-title :heading="pageTitle.heading" :subheading="pageTitle.subheading" :icon="pageTitle.icon">
            <template v-slot:actions>
                <button type="button" @click="$router.push({name: 'services.index'})" class="btn-shadow d-inline-flex align-items-center btn btn-secondary mr-2">
                    <font-awesome-icon class="mr-2" icon="list" /> All Services
                </button>
            </template>
        </page-title>

        <layout-wrapper>
            <v-container fluid>
                <card heading="Add a new Service" subheading="" >
                <v-form ref="form" v-model="formIsValid" lazy-validation>
                    <v-layout>
                        <v-flex xs12 md6>
                            <v-container fluid>
                                <v-text-field v-model="editServiceFields.name" :rules="formValidationRules.nameRules" label="Name" required></v-text-field>
                                <v-text-field type="number" v-model="editServiceFields.duration" :rules="formValidationRules.durationRules" label="Duration" required></v-text-field>
                            </v-container>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-container fluid>
                                <v-text-field type="number" v-model="editServiceFields.price" :rules="formValidationRules.priceRules" label="Price" required></v-text-field>
                            </v-container>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex md6 class="mx-auto">
                            <v-container class="py-1" v-for="stylist in stylists" :key="stylist.id" >
                                <v-layout>
                                    <v-flex md5>
                                        <b-form-checkbox v-model="stylist.selected" size="lg" >
                                            {{ stylist.name }}
                                        </b-form-checkbox>
                                    </v-flex>
                                    <v-flex md2>
                                        <b-form-input :disabled="!stylist.selected" type="number" v-model="stylist.stylist_charge" placeholder="Charge"></b-form-input>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-flex>
                    </v-layout>

                    <v-container fluid>
                        <b-button @click="editServiceSubmitted(editServiceFields.id)" class="mr-2 mb-2" :variant="formIsValid? 'success':'danger'" :disabled="formIsValid ? false:true">{{formIsValid ? 'Submit': 'Invalid Inputs'}}</b-button>
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
        editServiceFields: {
        },
        stylists: [],
        formIsValid: false,
        formValidationRules: {
            nameRules: [v => !!v || 'Name is required'],
            priceRules: [
                v => !!v || 'Price is required',
                v => /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/.test(v) || "Price must be valid"
            ],
            durationRules: [
                v => !!v || "Duration is required",
                v => /^\d+/.test(v) || "Duration must be valid"
            ]
        },
        pageTitle: {
            heading: "Edit Services",
            subheading:
            "To edit services please fill up the form below.",
            icon: "pe-7s-plane icon-gradient bg-tempting-azure",
            createNewLink: {name: 'service.create'},
        },
        email: "",
    }),
    computed: {
    },
    created(){
        this.init()
    },

    methods: {
        getServiceData(id){
            var link = `api/services/${id}`
            return axios.get(link).then(({data}) => {
                this.editServiceFields = data.service.data
            })
        },
        async init(){
            // get current service data
            await this.getServiceData(this.$route.params.id)

            // get all stylists
            var link = "api/users"
            var params = {
                role: 'stylist',
                limit: 'all',
            }
            axios.get(link, {params}).then( ({data}) => {
                var sanitizedData = data.data.map(i => {
                    const existingStylist = this.editServiceFields.stylists.find(item => {
                        return item.data.id == i.data.id
                    })
                    console.log(existingStylist);
                    return {
                        id: i.data.id,
                        name: i.data.name,
                        selected: (existingStylist) ? true : false,
                        stylist_charge: (existingStylist) ? existingStylist.data.pivot.stylist_charge : null,
                    }
                })
                this.stylists = _.cloneDeep(sanitizedData);
                // console.log('yo' ,this.stylists);
            } ).catch( error => {
            })
        },
        editServiceSubmitted(id){
            this.$refs.form.validate()

            if (this.formIsValid) {
                var link = `api/services/${id}`

                const payload = this.sanitizeEditServiceFields()

                axios.patch(link, payload).then( response => {
                    this.$router.push({name: 'services.index'})
                } )
            }
        },
        sanitizeEditServiceFields(){
            return {
                name: this.editServiceFields.name,
                price: parseFloat(this.editServiceFields.price).toFixed(2),
                duration: parseFloat(this.editServiceFields.duration).toFixed(2),

                stylists: this.stylists.filter(i => i.selected).map(i => ({id: i.id, stylist_charge: i.stylist_charge}))
            }
        },
    }
};
</script>
