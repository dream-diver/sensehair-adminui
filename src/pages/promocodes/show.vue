<template>
    <div>
        <page-title :heading="pageTitle.heading" :subheading="pageTitle.subheading" :icon="pageTitle.icon">
            <template v-slot:actions>
                <button type="button" @click="$router.push({name: 'promocodes.index'})" class="btn-shadow d-inline-flex align-items-center btn btn-secondary mr-2">
                    <font-awesome-icon class="mr-2" icon="list" /> All Promocodes
                </button>
                <button type="button" @click="$router.push({name: 'promocodes.edit'})" class="btn-shadow d-inline-flex align-items-center btn btn-success mr-2">
                    <font-awesome-icon class="mr-2" icon="edit" /> Edit Promocode
                </button>
            </template>
        </page-title>

        <layout-wrapper>
            <v-container fluid>
                <card heading="Promocode Details" subheading="" >
                    <v-layout>
                        <v-flex xs12 md4>
                        </v-flex>
                        <v-flex xs12 md4>
                            <v-container fluid>
                                <v-text-field v-model="showPromocodeFields.code" label="Code" readonly="readonly"></v-text-field>
                                <v-text-field v-model="showPromocodeFields.discount" label="Discount(%)" readonly="readonly"></v-text-field>
                            </v-container>
                        </v-flex>
                        <v-flex xs12 md4>
                        </v-flex>
                    </v-layout>
                </card>
            </v-container>

        </layout-wrapper>
    </div>
</template>

<style scoped>
</style>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faEdit, faList);

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
        showPromocodeFields: {

        },
        pageTitle: {
            heading: "View Promocode",
            subheading: "Below is the information listed for the selected promocode",
            icon: "pe-7s-note icon-gradient bg-tempting-azure",
        },
    }),
    computed: {
    },
    created(){
        this.getPromocodeData(this.$route.params.id)
    },

    methods: {
        getPromocodeData(id){
            var link = `api/promocodes/${id}`
            axios.get(link).then(({data}) => {
                this.showPromocodeFields = data.promocode.data
            })
        },
    }
};
</script>
