<template>
    <div>
        <page-title :heading="pageTitle.heading" :subheading="pageTitle.subheading" :icon="pageTitle.icon" :createNewLink="pageTitle.createNewLink"></page-title>

        <layout-wrapper>
            <v-container fluid>
                <card heading="Add a new User Account" subheading="" >
                    <!-- <template v&#45;slot:selectNumOfRows> -->
                    <!--     <p>sssssss</p> -->
                    <!-- </template> -->
                    <v-layout>
                        <v-flex xs12 md6>
                            <v-container pb-0 fluid>
                                <h5><b>Basic Info</b></h5>
                            </v-container>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12 md6>
                            <v-container fluid>
                                <v-text-field v-model="showUserFields.name" :rules="formValidationRules.usernameRules" label="Name" readonly="readonly"></v-text-field>
                                <v-text-field v-model="showUserFields.email" :rules="formValidationRules.usernameRules" label="Email" readonly="readonly"></v-text-field>
                            </v-container>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-container fluid>
                                <v-text-field v-model="showUserFields.phone" :rules="formValidationRules.usernameRules" label="Phone" readonly="readonly"></v-text-field>
                                <v-text-field v-model="showUserFields.role" :rules="formValidationRules.usernameRules" label="Role" readonly="readonly"></v-text-field>
                            </v-container>
                        </v-flex>
                    </v-layout>
                </card>
            </v-container>

        </layout-wrapper>
    </div>
</template>

<style scoped>
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.snow.css";
@import "~quill/dist/quill.bubble.css";
</style>

<script>
import PageTitle from "@/Layout/Components/PageTitle.vue";
import LayoutWrapper from "@/Layout/Components/LayoutWrapper";
import Card from "@/Layout/Components/Card";

export default {
    components: {
        PageTitle,
        "layout-wrapper": LayoutWrapper,
        Card,
    },

    data: () => ({
        showUserFields: {

        },
        formIsValid: false,
        formValidationRules: {
            nameRules: [v => !!v || 'Username is required'],
            usernameRules: [v => !!v || 'Username is required'],
            // passwordRules: [v => !!v || 'Password is required'],
            emailRules: [
              v => !!v || "E-mail is required",
              v => /.+@.+/.test(v) || "E-mail must be valid"
            ]
            // nameRules: [
            //   v => !!v || "Name is required",
            //   v => v.length <= 10 || "Name must be less than 10 characters"
            // ],
            // emailRules: [
            //   v => !!v || "E-mail is required",
            //   v => /.+@.+/.test(v) || "E-mail must be valid"
            // ]
        },
        pageTitle: {
            heading: "View Moving Companies",
            subheading:
            "Below are all the information listed for a user including campaings",
            icon: "pe-7s-plane icon-gradient bg-tempting-azure",
            createNewLink: {name: 'user.create'},
        },
        email: "",
        editorOption: {
            // some quill options
        },
    }),
    computed: {
    },
    created(){
        this.getUserData(this.$route.params.id)
    },

    methods: {
        getUserData(id){
            var link = `api/users/${id}`
            axios.get(link).then(({data}) => {
                console.log(data);
                this.showUserFields = data.user.data
            })
        },
    }
};
</script>
