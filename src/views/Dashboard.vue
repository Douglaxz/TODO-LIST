<template>
  <div
    class="d-flex flex-column flex-md-row rounded-xl justify-center rounded-xl overflow-hidden"
    :class="geralClassCss"
    style="border-width: 2px; border-color: black; border-style: solid"
  >
    <div class="w-100">
      <Cabecalho></Cabecalho>
      <BarraTitulo :titlepage="'Lista de Tarefas'">
        <template v-slot:slot1>
          <RouterLink to="/addList"
            ><v-btn
              prepend-icon="mdi mdi-playlist-plus"
              variant="outlined"
              color="white"
            >
              Adicionar
            </v-btn></RouterLink
          >
        </template>
      </BarraTitulo>
      <Alerta
        :titlepage="'Tarefa Criada com sucesso'"
        :type="'success'"
        :alert="created"
        :resetCreated="resetCreated"
      ></Alerta>
      <div
        class="m-a-0 w-100 d-flex align-center justify-space-around flex-wrap"
        style="height: 60%; overflow: auto"
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
import Cabecalho from "@/components/header-intern.vue";
import BarraTitulo from "@/components/title-bar.vue";
import Alerta from "@/components/msg-alert.vue";
export default {
  components: {
    Cabecalho,
    BarraTitulo,
    Alerta,
  },
  props: {
    created: Boolean,
    resetCreated: Function,
  },
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
  unmounted() {
    this.resetCreated();
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
