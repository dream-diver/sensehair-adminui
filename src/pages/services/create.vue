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
                <!-- <template v&#45;slot:selectNumOfRows> -->
                <!--     <p>sssssss</p> -->
                <!-- </template> -->
                <v-form ref="form" v-model="formIsValid" lazy-validation>
                    <v-layout>
                        <v-flex xs12 md6>
                            <v-container fluid>
                                <v-text-field v-model="addServiceFields.name" :rules="formValidationRules.nameRules" label="Name" required></v-text-field>
                                <v-text-field v-model="addServiceFields.duration" :rules="formValidationRules.durationRules" label="Duration" required></v-text-field>
                            </v-container>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-container fluid>
                                <v-text-field v-model="addServiceFields.price" :rules="formValidationRules.priceRules" label="Price" required></v-text-field>
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
            heading: "Add Services",
            subheading: "To add new services please fill up the form below.",
            icon: "pe-7s-plane icon-gradient bg-tempting-azure",
        },
        duration: "",
    }),
    computed: {
    },
    mounted(){
    },

    methods: {
        addServiceSubmitted(e){
            this.$refs.form.validate()

            if (this.formIsValid) {
                var link = "api/services"
                axios.post(link, this.addServiceFields).then( response => {
                    this.$refs.form.reset()
                    this.addServiceFields = {}
                    this.$router.push({name: 'services.index'})
                } )
            }
        }
    }
};
</script>
