<template>
  <div
    class="d-flex flex-column flex-md-row rounded-xl justify-center rounded-xl overflow-hidden"
    :class="geralClassCss"
    style="border-width: 2px; border-color: black; border-style: solid"
  >
    <div
      class="d-flex flex-sm-column align-center justify-center justify-sm-space-evenly"
      :class="formularioClassCss"
    >
      Teste
    </div>
  </div>
</template>
<script>
import { authApiMixin } from "@/api/auth";

export default {
  computed: {
    geralClassCss() {
      return {
        "w-100": this.$vuetify.display.smAndDown,
        "w-50": this.$vuetify.display.mdAndUp,
        "h-100": this.$vuetify.display.smAndDown,
        "h-75": this.$vuetify.display.mdAndUp,
      };
    },
    formularioClassCss() {
      return {
        "h-50": this.$vuetify.display.smAndDown,
        "h-100": this.$vuetify.display.mdAndUp,
        "w-100": this.$vuetify.display.smAndDown,
        "w-75": this.$vuetify.display.mdAndUp,
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
