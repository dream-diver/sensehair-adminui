<template>
    <div class="card main-card">
        <div class="card-header p-3 h-auto d-block">
            <v-layout>
                <v-flex xs12 md10>
                    <div class="d-block">{{heading}}</div>
                </v-flex>
                <v-flex xs12 md2>
                    <div class="d-block text-capitalize">
                        <slot name="numOfRows"></slot>
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
