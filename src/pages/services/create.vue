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
                        <v-flex xs12 md4>
                            <v-container fluid>
                                <v-text-field v-model="addServiceFields.name" :rules="formValidationRules.nameRules" label="Name(Dutch)" required></v-text-field>
                                <v-text-field v-model="addServiceFields.name_en" :rules="formValidationRules.nameRules" label="Name(English)" required></v-text-field>
                                <v-text-field type="number" v-model="addServiceFields.duration" :rules="formValidationRules.durationRules" label="Duration" required></v-text-field>
                            </v-container>
                        </v-flex>
                        <v-flex xs12 md4>
                            <v-container fluid>
                                <v-text-field type="number" v-model="addServiceFields.stylist_price" :rules="formValidationRules.priceRules" label="Stylist Price" required></v-text-field>
                                <v-text-field type="number" v-model="addServiceFields.art_director_price" :rules="formValidationRules.priceRules" label="Art Director Price" required></v-text-field>
                            </v-container>
                        </v-flex>
                        <v-flex xs12 md4>
                            <v-container fluid>
                                    <v-select
                                        v-model="addServiceFields.hair_size"
                                        :rules="formValidationRules.hairSizeRules"
                                        :items="hairSizes"
                                        label="Hair Size"
                                        ></v-select>
                                    <v-select
                                        v-show="addServiceFields.hair_size !== 'Men'"
                                        v-model="addServiceFields.hair_type"
                                        :items="hairTypes"
                                        label="Hair Type"
                                        ></v-select>
                            </v-container>
                        </v-flex>
                    </v-layout>

                    <v-container fluid>
                        <b-button @click="addServiceSubmitted" class="mr-2 mb-2" :variant="formIsValid? 'success':'danger'" :disabled="formIsValid ? false:true">{{formIsValid ? 'Add Service': 'Invalid Inputs'}}</b-button>
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
library.add( faList);

import _ from 'lodash'
import PageTitle from "@/Layout/Components/PageTitle.vue";
import LayoutWrapper from "@/Layout/Components/LayoutWrapper";
import Card from "@/Layout/Components/Card";

export default {
    components: {
        PageTitle,
        "layout-wrapper": LayoutWrapper,
        Card,
        FontAwesomeIcon
    },

    data: () => ({
        addServiceFields: {
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
            ],
            hairSizeRules: [
                v => !!v || "Hair Size is required",
            ],
        },
        pageTitle: {
            heading: "Add Services",
            subheading: "To add new services please fill up the form below.",
            icon: "pe-7s-plane icon-gradient bg-tempting-azure",
        },
        duration: "",
    }),
    computed: {
    },
    created(){
        this.init()
    },
    mounted(){
    },

    methods: {
        init(){
        },
        addServiceSubmitted(e){
            if (this.$refs.form.validate()) {
                var link = "api/services"

                const payload = this.sanitizeAddServiceFields()

                axios.post(link, payload).then( response => {
                    this.$refs.form.reset()
                    this.addServiceFields = {}
                    this.$router.push({name: 'services.index'})
                } )
            }
        },
        sanitizeAddServiceFields(){
            return {
                name: this.addServiceFields.name,
                name_en: this.addServiceFields.name_en,
                duration: parseFloat(this.addServiceFields.duration).toFixed(2),
                stylist_price: parseFloat(this.addServiceFields.stylist_price).toFixed(2),
                art_director_price: parseFloat(this.addServiceFields.art_director_price).toFixed(2),
                hair_size: this.addServiceFields.hair_size,
                hair_type: (this.addServiceFields.hair_size == 'Men')? null : this.addServiceFields.hair_type,
            }
        },
    }
};
</script>
