<template>
    <div class="card main-card">
        <div class="card-header p-3 d-block">
            <v-layout>
                <v-flex xs12 md7>
                    <div class="d-block">{{heading}}</div>
                </v-flex>
                <v-flex xs12 md1>
                    <div class="d-block text-capitalize">
                        <slot name="action5"></slot>
                    </div>
                </v-flex>
                <v-flex xs12 md1>
                    <div class="d-block text-capitalize">
                        <slot name="action4"></slot>
                    </div>
                </v-flex>
                <v-flex xs12 md1>
                    <div class="d-block text-capitalize">
                        <slot name="action3"></slot>
                    </div>
                </v-flex>
                <v-flex xs12 md1>
                    <div class="d-block text-capitalize">
                        <slot name="action2"></slot>
                    </div>
                </v-flex>
                <v-flex xs12 md1>
                    <div class="d-block text-capitalize">
                        <slot name="action1"></slot>
                    </div>
                </v-flex>
            </v-layout>
            <div class="d-block font-weight-normal text-capitalize mt-1 grey--text">{{subheading}}</div>
        </div>
        <div class="card-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: ["heading", "subheading"]
};
</script>
