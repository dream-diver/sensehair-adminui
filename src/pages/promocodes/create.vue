<template>
    <div>
        <page-title :heading="pageTitle.heading" :subheading="pageTitle.subheading" :icon="pageTitle.icon">
            <template v-slot:actions>
                <button type="button" @click="$router.push({ name: 'promocodes.index' })"
                    class="btn-shadow d-inline-flex align-items-center btn btn-secondary mr-2">
                    <font-awesome-icon class="mr-2" icon="list" /> All Promocodes
                </button>
            </template>
        </page-title>

        <layout-wrapper>
            <v-container fluid>
                <card heading="Add a new Promocode" subheading="">
                    <v-form ref="form" v-model="formIsValid" lazy-validation>
                        <v-layout>
                            <v-flex xs12 md4>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-container fluid>
                                    <v-text-field v-model="addPromocodeFields.code"
                                        :rules="formValidationRules.codeRules" label="Code" required></v-text-field>
                                    <v-text-field v-model="addPromocodeFields.discount"
                                        :rules="formValidationRules.discountRules" label="Discount(%)" required>
                                    </v-text-field>

                                    <v-layout>

                                        <v-flex sm6 xs12>
                                            <div class="mb-2">Start Date</div>
                                            <v-date-picker flat label="Start Date" v-model="addPromocodeFields.start_date"
                                                required></v-date-picker>
                                        </v-flex>

                                        <v-flex sm6 xs12>
                                            <div class="mb-2">End Date</div>
                                            <v-date-picker flat label="End Date" v-model="addPromocodeFields.end_date"
                                                required></v-date-picker>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-flex>
                            <v-flex xs12 md4>

                            </v-flex>
                        </v-layout>

                        <v-container fluid>
                            <b-button @click="addPromocodeSubmitted" class="mr-2 mb-2"
                                :variant="formIsValid ? 'success' : 'danger'" :disabled="formIsValid ? false : true">
                                {{ formIsValid ? 'Add Promocode' : 'Invalid Inputs' }}</b-button>
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
        FontAwesomeIcon
    },

    data: () => ({
        addPromocodeFields: {
            start_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            end_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        },
        formIsValid: false,
        formValidationRules: {
            codeRules: [v => !!v || 'Code is required'],
            discountRules: [v => !!v || 'Discount is required'],
        },
        pageTitle: {
            heading: "Add Promocodes",
            subheading: "To add new promocodes please fill up the form below.",
            icon: "pe-7s-plane icon-gradient bg-tempting-azure",
        },
        duration: "",
    }),
    computed: {
    },
    created() {
        this.init()
    },
    mounted() {
    },

    methods: {
        init() {
        },
        addPromocodeSubmitted(e) {
            if (this.$refs.form.validate()) {
                var link = "api/promocodes"

                const payload = this.sanitizeAddPromocodeFields()

                axios.post(link, payload).then(response => {
                    this.$refs.form.reset()
                    this.addPromocodeFields = {}
                    this.$router.push({ name: 'promocodes.index' })
                })
            }
        },
        sanitizeAddPromocodeFields() {
            return {
                code: this.addPromocodeFields.code,
                discount: this.addPromocodeFields.discount,
                start_date: this.addPromocodeFields.start_date,
                end_date: this.addPromocodeFields.end_date,
            }
        },
    }
};
</script>
