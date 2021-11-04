<template>
    <div>
        <page-title :heading="pageTitle.heading" :subheading="pageTitle.subheading" :icon="pageTitle.icon">
            <template v-slot:actions>
                <button type="button" @click="$router.push({name: 'promocodes.index'})" class="btn-shadow d-inline-flex align-items-center btn btn-secondary mr-2">
                    <font-awesome-icon class="mr-2" icon="list" /> All Promocodes
                </button>
            </template>
        </page-title>

        <layout-wrapper>
            <v-container fluid>
                <card heading="Edit a Promocode" subheading="" >
                <v-form ref="form" v-model="formIsValid" lazy-validation>
                    <v-layout>
                        <v-flex xs12 md4>
                        </v-flex>
                        <v-flex xs12 md4>
                            <v-container fluid>
                                <v-text-field v-model="editPromocodeFields.code" :rules="formValidationRules.codeRules" label="Code" required></v-text-field>
                                <v-text-field v-model="editPromocodeFields.discount" :rules="formValidationRules.discountRules" label="Discount" required></v-text-field>
                            </v-container>
                        </v-flex>
                        <v-flex xs12 md4>
                        </v-flex>
                    </v-layout>

                    <v-container fluid>
                        <b-button @click="editPromocodeSubmitted(editPromocodeFields.id)" class="mr-2 mb-2" :variant="formIsValid? 'success':'danger'" :disabled="formIsValid ? false:true">{{formIsValid ? 'Submit': 'Invalid Inputs'}}</b-button>
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
        editPromocodeFields: {
        },
        formIsValid: false,
        formValidationRules: {
            codeRules: [v => !!v || 'Code is required'],
            discountRules: [v => !!v || 'Discount is required'],
        },
        pageTitle: {
            heading: "Edit Promocodes",
            subheading:
            "To edit promocodes please fill up the form below.",
            icon: "pe-7s-plane icon-gradient bg-tempting-azure",
            createNewLink: {name: 'promocode.create'},
        },
        email: "",
    }),
    computed: {
    },
    created(){
        this.init()
    },

    methods: {
        getPromocodeData(id){
            var link = `api/promocodes/${id}`
            return axios.get(link).then(({data}) => {
                this.editPromocodeFields = data.promocode.data
            })
        },
        async init(){
            // get current promocode data
            await this.getPromocodeData(this.$route.params.id)
        },
        editPromocodeSubmitted(id){
            if (this.$refs.form.validate()) {
                var link = `api/promocodes/${id}`

                const payload = this.sanitizeEditPromocodeFields()

                axios.patch(link, payload).then( response => {
                    this.$router.push({name: 'promocodes.index'})
                } )
            }
        },
        sanitizeEditPromocodeFields(){
            return {
                code: this.editPromocodeFields.code,
                discount: this.editPromocodeFields.discount,
            }
        },
    }
};
</script>
