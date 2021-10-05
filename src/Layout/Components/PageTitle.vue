<template>
    <div class="app-page-title">
        <div class="page-title-wrapper">
            <div class="page-title-heading">
                <div class="page-title-icon">
                    <i :class="icon" />
                </div>
                <div>
                    {{heading}}
                    <div class="page-title-subheading">{{subheading}}</div>
                </div>
            </div>
            <div class="page-title-actions">
                <!-- <button type="button" class="btn&#45;shadow mr&#45;3 btn btn&#45;dark"> -->
                <!--     <font&#45;awesome&#45;icon icon="star" /> -->
                <!-- </button> -->
                <slot name="actions"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faStar, faPlus);

export default {
    components: {
        "font-awesome-icon": FontAwesomeIcon
    },
    props: {
        icon: String,
        heading: String,
        subheading: String,
    }
};
</script>
