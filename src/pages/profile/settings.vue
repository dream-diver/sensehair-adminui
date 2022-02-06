<template>
    <div>
        <layout-wrapper>
            <v-container fluid>
                <card heading="Change Your Profile Settings" subheading="">
                    <v-form ref="form" v-model="formIsValid" lazy-validation>
                        <v-layout>
                            <v-flex xs12 md6>
                                <v-container pb-0 fluid>
                                    <h5><b>Profile Settings</b></h5>
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
                            </v-flex>
                            <v-flex xs12 md6>
                                <v-container fluid>
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

<script>
import LayoutWrapper from "@/Layout/Components/LayoutWrapper";
import Card from "@/Layout/Components/Card";
import { mapGetters } from "vuex";
import _ from "lodash";
export default {
    name: "profile.settings",
    components: {
        // PageTitle,
        "layout-wrapper": LayoutWrapper,
        Card,
        // FontAwesomeIcon,
    },
    data: () => ({
        editUserFields: {},
        formIsValid: false,
        formValidationRules: {
            passwordRules: [true || "Password is required"],
            emailRules: [
                (v) => !!v || "E-mail is required",
                (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
            ],
        },
        submitting: false,
    }),
    computed: {
        ...mapGetters("auth", ["loggedInUser"]),
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
        this.editUserFields = _.cloneDeep(this.loggedInUser.data);
        console.log(this.editUserFields);
    },
    methods: {
        editUserSubmitted(id) {
            this.$refs.form.validate();

            if (this.formIsValid) {
                var link = `api/users/${id}`;

                let data = new FormData();
                data.append("name", this.editUserFields.name);
                data.append("email", this.editUserFields.email);
                data.append("_method", "PATCH");

                if (this.editUserFields.password) {
                    data.append("password", this.editUserFields.password);
                }

                let config = {
                    header: {
                        "content-type": "multipart/form-data",
                    },
                };

                this.submitting = true;
                axios.post(link, data, config).then((response) => {
                    this.submitting = false;
                    this.$router.push({ name: "planer" });
                    this.$store.dispatch("auth/fetchLoggedInUserData", {
                        force: true,
                    });
                });
            }
        },
    },
};
</script>
