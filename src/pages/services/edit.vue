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
                <card heading="Edit a Service" subheading="" >
                <v-form ref="form" v-model="formIsValid" lazy-validation>
                    <v-layout>
                        <v-flex xs12 md4>
                            <v-container fluid>
                                <v-text-field v-model="editServiceFields.name" :rules="formValidationRules.nameRules" label="Name(Dutch)" required></v-text-field>
                                <v-text-field v-model="editServiceFields.name_en" :rules="formValidationRules.nameRules" label="Name(English)" required></v-text-field>
                                <v-text-field type="number" v-model="editServiceFields.duration" :rules="formValidationRules.durationRules" label="Duration" required></v-text-field>
                            </v-container>
                        </v-flex>
                        <v-flex xs12 md4>
                            <v-container fluid>
                                <v-text-field type="number" v-model="editServiceFields.stylist_price" :rules="formValidationRules.priceRules" label="Stylist Price" required></v-text-field>
                                <v-text-field type="number" v-model="editServiceFields.art_director_price" :rules="formValidationRules.priceRules" label="Art Director Price" required></v-text-field>
                            </v-container>
                        </v-flex>
                        <v-flex xs12 md4>
                            <v-container fluid>
                                    <v-select
                                        v-model="editServiceFields.hair_size"
                                        :rules="formValidationRules.hairSizeRules"
                                        :items="hairSizes"
                                        label="Hair Size"
                                        ></v-select>
                                    <v-select
                                        v-model="editServiceFields.hair_type"
                                        v-show="editServiceFields.hair_size !== 'Men'"
                                        :rules="formValidationRules.hairTypeRules"
                                        :items="hairTypes"
                                        label="Hair Type"
                                        ></v-select>
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
        hairSizes: ['Men', 'Women Short Hair', 'Women Medium Hair', 'Women Long Hair'],
        hairTypes: ['Straight', 'Wavy', 'Curly', 'Coily'],
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
        },
        editServiceSubmitted(id){
            if (this.$refs.form.validate()) {
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
                name_en: this.editServiceFields.name_en,
                duration: parseFloat(this.editServiceFields.duration).toFixed(2),
                stylist_price: parseFloat(this.editServiceFields.stylist_price).toFixed(2),
                art_director_price: parseFloat(this.editServiceFields.art_director_price).toFixed(2),
                hair_size: this.editServiceFields.hair_size,
                hair_type: (this.editServiceFields.hair_size == 'Men')? null : this.editServiceFields.hair_type,
            }
        },
    }
};
</script>
