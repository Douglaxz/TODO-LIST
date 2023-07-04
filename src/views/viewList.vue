<template>
  <BarraTitulo :titlepage="'Viualizar Tarefas'">
    <template v-slot:slot1>
      <v-btn
        prepend-icon="mdi mdi-content-save-alert-outline"
        class="align-self-center"
        variant="outlined"
        color="white"
        @click="uptLists"
      >
        <p v-if="$vuetify.display.mdAndUp">Atualizar</p>
      </v-btn>
    </template>
    <template v-slot:slot2>
      <v-btn
        prepend-icon="mdi mdi-delete-alert"
        class="align-self-center"
        variant="outlined"
        color="white"
        @click="showConfirmationDialog"
      >
        <p v-if="$vuetify.display.mdAndUp">Apagar</p>
      </v-btn>
      <v-dialog v-model="confirmationDialog" max-width="400px">
        <v-card>
          <v-card-title>Confirmação de exclusão</v-card-title>
          <v-card-text>
            Tem certeza de que deseja apagar a tarefa?
          </v-card-text>
          <v-card-actions>
            <v-btn color="black" text @click="delLists">Apagar</v-btn>
            <v-btn color="gray" text @click="cancelDelete">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:slot3>
      <v-btn
        prepend-icon="mdi mdi-arrow-left"
        variant="outlined"
        color="white"
        to="/Dashboard"
        class="align-self-center"
      >
        <p v-if="$vuetify.display.mdAndUp">Voltar</p>
      </v-btn>
    </template>
  </BarraTitulo>
  <div class="d-flex align-center justify-space-around" style="overflow: auto">
    <v-sheet width="300" class="mx-auto mt-5">
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
  <BarraTitulo :titlepage="'Itens'">
    <template v-slot:slot1>
      <RouterLink :to="`/addListItens/${id}`"
        ><v-btn
          class="align-self-center"
          prepend-icon="mdi mdi-playlist-plus"
          variant="outlined"
          color="white"
        >
          <p v-if="$vuetify.display.mdAndUp">Adicionar</p>
        </v-btn></RouterLink
      >
    </template>
  </BarraTitulo>
  <div
    class="ma-0 w-100 d-flex align-center justify-space-around flex-wrap"
    style="height: 50%; overflow: auto"
  >
    <v-card
      v-for="list in itemList"
      :key="list.id"
      variant="outlined"
      class="ma-2"
      width="290"
      height="200"
      style="overflow: hidden"
    >
      <v-card-item>
        <div>
          <div class="text-overline mb-1 d-flex justify-space-between">
            <v-chip class="ma-2" color="red" text-color="white">
              Importante !</v-chip
            >
          </div>
          <div
            class="text-h7 mb-2 w-100"
            style="height: 37px; overflow: hidden"
          >
            {{ list.title }}
          </div>
          <div class="text-caption">
            <v-chip class="ma-2" color="gray" text-color="white">
              <span class="mdi mdi-calendar-check-outline"></span>
              {{ formatDate(list.deadline) }}</v-chip
            >
            <v-chip
              v-if="list.done"
              class="ma-2"
              color="green"
              text-color="white"
            >
              <span><span class="mdi mdi-check-circle-outline"></span></span>
            </v-chip>
          </div>
        </div>
        <div class="d-flex align-center justify-center">
          <RouterLink :to="`/viewIListItem/${list.id}`"
            ><v-btn
              class="align-self-center"
              prepend-icon="mdi mdi-open-in-new"
              variant="outlined"
              color="black"
            >
              <p v-if="$vuetify.display.mdAndUp">Visualizar</p>
            </v-btn></RouterLink
          >
        </div>
      </v-card-item>
    </v-card>
  </div>
</template>

<script>
import { toDoListsApiMixin } from "@/api/toDoLists";
import BarraTitulo from "@/components/title-bar.vue";
import moment from "moment";

export default {
  components: {
    BarraTitulo,
  },
  props: {},
  mixins: [toDoListsApiMixin],

  data() {
    const id = this.$route.params.id;

    return {
      id: id,
      title: this.title,
      formValid: false,
      confirmationDialog: false,
      datalimite: "",
      itemList: [],
      titleRules: [
        (value) => {
          if (!value) return "Por favor, preencha o campo Título";
          return true;
        },
      ],
    };
  },
  methods: {
    formatDate(date) {
      const modifiedDate = moment(date).add(0, "hours");
      this.datalimite = date;

      return modifiedDate.format("DD/MM/YYYY HH:mm");
    },

    showConfirmationDialog() {
      this.confirmationDialog = true;
    },

    cancelDelete() {
      this.confirmationDialog = false;
    },

    async getItemLists(id) {
      try {
        this.$emit("spinner");
        const { data } = await this.details(id);
        this.itemList = data.items;
        this.$emit("spinner");
      } catch (err) {
        this.$emit(
          "snackbar",
          "Algo deu errado na obtenção dos itens da lista",
          "red"
        );
      }
    },
    async getLists() {
      try {
        this.$emit("spinner");
        const { data } = await this.details(this.id);
        this.title = data.title;
        this.$emit("spinner");
      } catch (err) {
        this.$emit(
          "snackbar",
          "Não foi possível pegar a lista de tarefas",
          "red"
        );
      }
    },
    async delLists() {
      try {
        this.$emit("spinner");
        await this.delete(this.id);
        this.$emit("spinner");
        this.$router.push("/Dashboard");
        this.$emit("snackbar", "Tarefa excluída com sucesso", "green");
      } catch (err) {
        this.$emit("snackbar", "Não foi possível deletar a tarefa", "red");
      }
    },
    async uptLists() {
      const payload = {
        title: this.title,
      };
      try {
        this.$emit("spinner");
        await this.uptItem(this.id, payload);
        this.$emit("spinner");
        this.$emit("snackbar", "Tarefa atualizada com sucesso", "green");
      } catch (err) {
        this.$emit("snackbar", "Algo deu errado na atualização", "red");
      }
    },
  },
  mounted() {
    this.getLists();
    this.getItemLists(this.id);
  },
  computed: {},
  updated() {},
};
</script>
