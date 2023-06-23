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
      <v-card v-for="list in toDoList" :key="list.id">
        {{ list.title }}
      </v-card>
    </div>
  </div>
</template>
<script>
import { toDoListsApiMixin } from "@/api/toDoLists";
export default {
  mixins: [toDoListsApiMixin],
  data() {
    return {
      toDoList: [],
    };
  },
  methods: {
    async getList() {
      try {
        const { data } = await this.list();
        this.toDoList = data;
      } catch (err) {
        alert("Algo deu errado");
      }
    },
  },
  mounted() {
    this.getList();
  },
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
