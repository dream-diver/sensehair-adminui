<template>
    <div>
        <page-title
            :heading="pageTitle.heading"
            :subheading="pageTitle.subheading"
            :icon="pageTitle.icon"
        >
            <template v-slot:actions>
                <button
                    type="button"
                    @click="$router.push({ name: 'users.index' })"
                    class="btn-shadow d-inline-flex align-items-center btn btn-secondary mr-2"
                >
                    <font-awesome-icon class="mr-2" icon="list" /> All Users
                </button>
            </template>
        </page-title>

        <layout-wrapper>
            <v-container fluid>
                <card heading="Add a new User Account" subheading="">
                    <!-- <template v&#45;slot:selectNumOfRows> -->
                    <!--     <p>sssssss</p> -->
                    <!-- </template> -->
                    <v-form ref="form" v-model="formIsValid" lazy-validation>
                        <v-layout>
                            <v-flex xs12 md6>
                                <v-container pb-0 fluid>
                                    <h5><b>Login Information</b></h5>
                                </v-container>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex xs12 md6>
                                <v-container fluid>
                                    <v-text-field
                                        v-model="editUserFields.name"
                                        :rules="formValidationRules.nameRules"
                                        label="Name"
                                        required
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="editUserFields.email"
                                        :rules="formValidationRules.emailRules"
                                        label="Email"
                                        required
                                    ></v-text-field>
                                </v-container>
                                <v-container
                                    v-if="
                                        editUserFields.role == 'stylist' ||
                                        editUserFields.role == 'art_director'
                                    "
                                    fluid
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="avatar"
                                        class="form-control-file btn btn-default"
                                        style=""
                                        @change="avatarUploaded"
                                    />
                                    <span
                                        >Upload Square(ie: 300x300 pixels)
                                        Images for best quality</span
                                    >
                                </v-container>
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-container fluid>
                                    <v-text-field
                                        v-model="editUserFields.phone"
                                        :rules="formValidationRules.phoneRules"
                                        label="Phone"
                                        required
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="editUserFields.password"
                                        :rules="
                                            formValidationRules.passwordRules
                                        "
                                        label="Password"
                                    ></v-text-field>
                                </v-container>
                            </v-flex>
                        </v-layout>
                        <v-container fluid>
                            <b-button
                                @click="editUserSubmitted(editUserFields.id)"
                                class="mr-2 mb-2"
                                :variant="formIsValid ? 'success' : 'danger'"
                                :disabled="
                                    formIsValid && !submitting ? false : true
                                "
                                >{{ submitButtonText }}</b-button
                            >
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
        editUserFields: {
            avatarFIle: null,
            password: null,
        },
        formIsValid: false,
        formValidationRules: {
            nameRules: [(v) => !!v || "Name is required"],
            phoneRules: [(v) => !!v || "Phone is required"],
            // passwordRules: [v => !!v || 'Password is required'],
            passwordRules: [true || "Password is required"],
            emailRules: [
                (v) => !!v || "E-mail is required",
                (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
            ],
        },
        submitting: false,
        pageTitle: {
            heading: "Edit Users",
            subheading: "To edit users please fill up the form below.",
            icon: "pe-7s-users icon-gradient bg-tempting-azure",
            createNewLink: { name: "user.create" },
        },
        email: "",
    }),
    computed: {
        submitButtonText() {
            if (this.submitting) {
                return "Submitting";
            } else if (this.formIsValid) {
                return "Submit";
            } else {
                return "Invalid Inputs";
            }
        },
    },
    created() {
        this.getUserData(this.$route.params.id);
    },

    methods: {
        avatarUploaded(event) {
            this.editUserFields.avatarFIle = event.target.files[0];
            console.log(this.editUserFields.avatarFIle);
        },
        getUserData(id) {
            var link = `api/users/${id}`;
            axios.get(link).then(({ data }) => {
                this.editUserFields = data.user.data;
                console.log(this.editUserFields);
            });
        },
        editUserSubmitted(id) {
            this.$refs.form.validate();

            if (this.formIsValid) {
                var link = `api/users/${id}`;

                let data = new FormData();
                data.append("_method", "PATCH");
                data.append("name", this.editUserFields.name);
                data.append("email", this.editUserFields.email);
                data.append("phone", this.editUserFields.phone);
                if (this.editUserFields.password) {
                    data.append("password", this.editUserFields.password);
                }
                if (this.editUserFields.avatarFIle) {
                    data.append("avatar", this.editUserFields.avatarFIle);
                }

                let config = {
                    header: {
                        "content-type": "multipart/form-data",
                    },
                };

                this.submitting = true;
                axios.post(link, data, config).then((response) => {
                    this.submitting = false;
                    this.$router.push({ name: "users.index" });
                });

                // axios.patch(link, this.editUserFields).then( response => {
                //     this.$router.push({name: 'users.index'})
                // } )
            }
        },
    },
};
</script>
