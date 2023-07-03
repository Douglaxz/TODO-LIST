<template>
  <BarraTitulo :titlepage="'Lista de Tarefas'">
    <template v-slot:slot1>
      <RouterLink to="/addList"
        ><v-btn
          prepend-icon="mdi mdi-playlist-plus"
          variant="outlined"
          color="white"
          class="mt-0"
        >
          <p v-if="$vuetify.display.mdAndUp">Adicionar</p>
        </v-btn></RouterLink
      >
    </template>
  </BarraTitulo>

  <div
    class="ma-0 w-100 d-flex align-center justify-space-around flex-wrap"
    style="overflow: auto"
  >
    <v-card
      v-for="list in toDoList"
      :key="list.id"
      variant="outlined"
      class="mx-auto mb-2"
      width="290"
      height="180"
      style="overflow: hidden"
    >
      <v-card-item>
        <div>
          <div class="text-overline mb-1 d-flex justify-space-between">
            <v-chip class="ma-2" color="gray" text-color="white">
              ToDo !</v-chip
            >
          </div>
          <div
            class="text-h7 mb-2 w-100"
            style="height: 37px; overflow: hidden"
          >
            {{ list.title }}
          </div>
          <div class="text-caption">
            <RouterLink :to="`/viewList/${list.id}`"
              ><v-btn
                prepend-icon="mdi mdi-eye-arrow-right"
                variant="outlined"
                color="black"
              >
                Visualizar
              </v-btn></RouterLink
            >
          </div>
        </div>
      </v-card-item>
    </v-card>
  </div>
</template>
<script>
import { toDoListsApiMixin } from "@/api/toDoLists";
import BarraTitulo from "@/components/title-bar.vue";
export default {
  components: {
    BarraTitulo,
  },
  props: {
    created: Boolean,
    deleted: Boolean,
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
        console.log("entrou no get list");
        const { data } = await this.list();
        this.toDoList = data;
      } catch (err) {
        alert("Algo deu errado");
      }
    },
  },
  mounted() {
    this.getList();
    this.$emit("snackbar", "Bem vindo ao TODO List", "black");
  },
};
</script>
<style></style>
