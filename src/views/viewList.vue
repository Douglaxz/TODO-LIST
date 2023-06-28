<template>
  <div
    class="d-flex flex-column flex-md-row rounded-xl justify-center rounded-xl overflow-hidden"
    :class="geralClassCss"
    style="border-width: 2px; border-color: black; border-style: solid"
  >
    <div class="w-100">
      <Cabecalho></Cabecalho>
      <BarraTitulo :titlepage="'Viualizar Lista de Tarefas'">
        <template v-slot:slot1>
          <v-btn
            prepend-icon="mdi mdi-content-save-alert-outline"
            class="align-self-center"
            variant="outlined"
            color="white"
            @click="uptLists"
          >
            Atualizar
          </v-btn>
        </template>
        <template v-slot:slot2>
          <v-btn
            prepend-icon="mdi mdi-delete-alert"
            class="align-self-center"
            variant="outlined"
            color="white"
            @click="delLists()"
          >
            Apagar
          </v-btn>
        </template>
        <template v-slot:slot3>
          <v-btn
            prepend-icon="mdi mdi-arrow-left"
            variant="outlined"
            color="white"
            to="/Dashboard"
            class="align-self-center"
          >
            Voltar
          </v-btn>
        </template>
      </BarraTitulo>
      <div
        class="d-flex align-center justify-space-around"
        style="overflow: auto"
      >
        <v-sheet width="300" class="mx-auto mt-7">
          <v-form v-model="formValid" fast-fail @submit.prevent>
            <v-text-field
              v-model="title"
              label="Tarefa"
              :rules="titleRules"
              block
            ></v-text-field>
          </v-form>
        </v-sheet>
      </div>
      <BarraTitulo :titlepage="'Itens da Lista de Tarefas'">
        <template v-slot:slot1>
          <RouterLink :to="`/addListItens/${id}`"
            ><v-btn
              class="align-self-center"
              prepend-icon="mdi mdi-playlist-plus"
              variant="outlined"
              color="white"
            >
              Adicionar
            </v-btn></RouterLink
          >
        </template>
      </BarraTitulo>
      <div
        class="w-100 d-flex align-center justify-space-around flex-wrap"
        style="height: 40%; overflow: auto"
      >
        <v-card
          v-for="list in itemList"
          :key="list.id"
          variant="outlined"
          style="width: 250px; height: 165px"
          class="ma-3 pa-2"
        >
          <v-card-title>{{ list.title }}</v-card-title>
          <v-card-text
            >Limite: {{ formatDate(list.deadline) }} Finalizado:
            <span v-if="list.done">Sim</span>
            <span v-else>Não</span>
          </v-card-text>
          <v-card-actions>
            <RouterLink :to="`/viewIListItem/${list.id}`"
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
  <v-snackbar v-model="snackbar" multi-line>
    eita

    <template v-slot:actions>
      <v-btn color="red" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { toDoListsApiMixin } from "@/api/toDoLists";
import Cabecalho from "@/components/header-intern.vue";
import BarraTitulo from "@/components/title-bar.vue";
import moment from "moment";

export default {
  components: {
    Cabecalho,
    BarraTitulo,
  },
  mixins: [toDoListsApiMixin],
  data() {
    const id = this.$route.params.id;
    let snackbar = false;
    let snackbarTexto ="";

    return {
      id: id,
      title: this.title,
      itemList: [],
    };
  },
  methods: {
    formatDate(date) {
      const modifiedDate = moment(date).add(0, "hours");
      return modifiedDate.format("DD/MM/YYYY HH:mm");
    },

    async getItemLists(id) {
      try {
        const { data } = await this.details(id);
        this.itemList = data.items;
      } catch (err) {
        alert("Algo deu errado na hora de puxar os itens da lista.");
      }
    },
    async getLists() {
      try {
        const { data } = await this.details(this.id);
        this.title = data.title;
      } catch (err) {
        alert("Algo deu errado.");
      }
    },
    async delLists() {
      try {
        await this.delete(this.id);
        alert("Item apagado com sucesso!");
        this.$router.push("/Dashboard");
      } catch (err) {
        alert("Algo deu errado na hora de deletar.");
      }
    },
    async uptLists() {
      const payload = {
        title: this.title,
      };
      console.log("o meu payload é" + payload);
      try {
        await this.uptItem(this.id, payload);
        alert("Item atualizado com sucesso!!");
        this.$router.push("/Dashboard");
      } catch (err) {
        alert("Algo deu errado na hora de atualizar.");
      }
    },
  },
  mounted() {
    this.getLists();
    this.getItemLists(this.id);
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
