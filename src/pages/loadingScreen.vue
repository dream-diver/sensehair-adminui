<template>
    <div class="loader-wrapper centered">
        <pulse-loader :color="color"></pulse-loader>
    </div>
</template>

<style scoped>
.centered {
    position: fixed; /* or absolute */
    top: 50%;
    left: 50%;
}
</style>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
    data: () => ({
        color: "#3f6ad8"
    }),
    components: {
        PulseLoader
    }
}
</script>
