<template>
  <v-main class="d-flex justify-center align-center ma-3">
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :color="snackbarcolor"
      rounded="pill"
    >
      {{ snackbarMessage }}

      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <div
      class="d-flex flex-column flex-md-row rounded-xl rounded-xl overflow-hidden"
      :class="geralClassCss"
      style="
        border-width: 2px;
        border-color: black;
        border-style: solid;
        height: 100%;
      "
    >
      <div class="w-100">
        <Cabecalho></Cabecalho>
        <spiner :show="showSpinner"></spiner>
        <router-view @snackbar="snackbarMsg" @spinner="toggleSpinner" />
      </div>
    </div>
  </v-main>
</template>

<script>
import Cabecalho from "@/components/header-intern.vue";
import spiner from "@/components/spiner.vue";

export default {
  components: {
    Cabecalho,
    spiner,
  },
  data() {
    return {
      snackbar: false,
      snackbarMessage: "",
      timeout: 3000,
      snackbarcolor: "",
      showSpinner: false,
    };
  },
  methods: {
    snackbarMsg(msg, color) {
      console.log(color);
      this.snackbar = true;
      this.snackbarMessage = msg;
      this.snackbarcolor = color;
    },
    toggleSpinner() {
      this.showSpinner = !this.showSpinner;
    },
  },
  computed: {
    geralClassCss() {
      return {
        "w-100": this.$vuetify.display.smAndDown,
        "w-50": this.$vuetify.display.mdAndUp,
        "h-75": this.$vuetify.display.smAndDown,
        "h-75": this.$vuetify.display.mdAndUp,
      };
    },
    formularioClassCss() {
      return {
        "h-50": this.$vuetify.display.smAndDown,
        "h-100": this.$vuetify.display.mdAndUp,
        "w-100": this.$vuetify.display.smAndDown,
        "w-100": this.$vuetify.display.mdAndUp,
      };
    },
    iconeClassCss() {
      return {
        "h-50": this.$vuetify.display.smAndDown,
        "h-100": this.$vuetify.display.mdAndUp,
        "w-100": this.$vuetify.display.smAndDown,
      };
    },
  },
};
</script>

<style></style>
