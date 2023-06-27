<template>
  <div
    class="d-flex flex-column flex-md-row rounded-xl justify-center rounded-xl overflow-hidden"
    :class="geralClassCss"
    style="border-width: 2px; border-color: black; border-style: solid"
  >
    <div>
      <v-container class="bg-black">
        <v-row no-gutters class="d-flex align-center justify-center">
          <v-col cols="12" sm="2">
            <v-sheet
              class="ma-2 pa-2 bg-black d-flex align-center justify-center"
            >
              <div
                class="bg-white d-flex align-center justify-center"
                style="width: 90px; height: 90px; border-radius: 50%"
              >
                <span
                  class="mdi mdi-list-status text-black"
                  style="font-size: 90px"
                ></span></div
            ></v-sheet>
          </v-col>
          <v-col cols="12" sm="6">
            <v-sheet
              class="ma-2 pa-2 bg-black text-white d-flex align-center justify-center"
              ><h3>TODO List</h3></v-sheet
            >
          </v-col>
          <v-col cols="12" sm="4">
            <v-sheet
              class="ma-2 pa-2 bg-black d-flex align-center justify-center"
            >
              <RouterLink to="/addList"
                ><v-btn
                  prepend-icon="mdi mdi-playlist-plus"
                  variant="outlined"
                  color="white"
                >
                  Adicionar
                </v-btn></RouterLink
              >
              <v-btn
                prepend-icon="mdi mdi-playlist-plus"
                variant="outlined"
                color="white"
                @click="logout"
              >
                Sair
              </v-btn></v-sheet
            >
          </v-col>
        </v-row>
      </v-container>

      <div
        class="cabecalho m-a-0 w-100 d-flex align-center justify-space-around flex-wrap"
        style="height: 80%; overflow: auto"
      >
        <v-card
          v-for="list in toDoList"
          :key="list.id"
          style="width: 250px; height: 120px"
        >
          <v-card-title>{{ list.title }}</v-card-title>
          <v-card-actions>
            <RouterLink :to="`/viewList/${list.id}`"
              ><v-btn
                prepend-icon="mdi mdi-eye-arrow-right"
                variant="outlined"
                color="black"
              >
                Visualizar
              </v-btn></RouterLink
            >
          </v-card-actions>
        </v-card>
      </div>
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
    logout() {
      localStorage.removeItem("token");
      this.$router.push(`/`);
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
