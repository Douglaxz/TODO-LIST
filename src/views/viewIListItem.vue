<template>
  <BarraTitulo :titlepage="'Visualizar Item'">
    <template v-slot:slot1>
      <v-btn
        prepend-icon="mdi mdi-playlist-plus"
        variant="outlined"
        color="white"
        @click="handleSubmit"
      >
        <p v-if="$vuetify.display.mdAndUp">Atualizar</p>
      </v-btn>
    </template>
    <template v-slot:slot2>
      <v-btn
        prepend-icon="mdi mdi-delete-alert"
        variant="outlined"
        color="white"
        @click="showConfirmationDialog"
        class="align-self-center"
      >
        <p v-if="$vuetify.display.mdAndUp">Apagar</p>
      </v-btn>
      <v-dialog v-model="confirmationDialog" max-width="400px">
        <v-card>
          <v-card-title>Confirmação de exclusão</v-card-title>
          <v-card-text>
            Tem certeza de que deseja apagar o item de tarefa?
          </v-card-text>
          <v-card-actions>
            <v-btn color="black" text @click="deleteItem">Apagar</v-btn>
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
        :to="`/viewList/${idPai}`"
        class="align-self-center"
      >
        <p v-if="$vuetify.display.mdAndUp">Voltar</p>
      </v-btn>
    </template>
  </BarraTitulo>
  <div class="w-100">
    <v-sheet width="300" height="200" class="mx-auto mt-16">
      <v-form v-model="formValid" fast-fail @submit.prevent>
        <v-text-field v-model="title" label="Título do Item"></v-text-field>
        <label for="datetime" style="color: gray"
          >Prazo para finalização deste item:</label
        >
        <input
          type="datetime-local"
          :value="dateToISOString(myDate)"
          @input="handleDateChange"
          style="background-color: #f6f6f6; height: 40px; width: 100%"
        />

        <v-checkbox v-model="this.done" :label="`Finalizado?`"></v-checkbox>
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
import { toDoListsItemsApiMixin } from "@/api/toDoItens";
import BarraTitulo from "@/components/title-bar.vue";

export default {
  components: {
    BarraTitulo,
  },
  mixins: [toDoListsItemsApiMixin],
  data: () => ({
    title: "",
    myDate: "",
    id: null,
    done: Boolean,
    idPai: "",
    formValid: false,
    confirmationDialog: false,
  }),
  props: {
    updatedItem: Boolean,
    resetUpdatedItem: Function,
    showLocalAlert: Boolean,
    localAlertMsg: String,
  },

  created() {
    this.id = this.$route.params.id;
  },

  methods: {
    handleDateChange(e) {
      const { value } = e.target;
      this.myDate = value;
    },
    dateToISOString(date) {
      if (!date) return "";
      const adjustedDate = new Date(date);
      adjustedDate.setHours(adjustedDate.getHours() - 3);
      return adjustedDate.toISOString().slice(0, 16);
    },

    showConfirmationDialog() {
      this.confirmationDialog = true;
    },

    cancelDelete() {
      this.confirmationDialog = false;
    },

    async getItemLists() {
      try {
        const { data } = await this.viewListItem(this.id);
        this.title = data.title;
        this.myDate = new Date(data.deadline);
        this.done = data.done;
        this.idPai = data.listId;
      } catch (err) {
        alert("Algo deu errado na hora de puxar esse item list.");
      }
    },

    async handleSubmit() {
      const dataCorrigida = new Date(this.myDate);
      const payload = {
        title: this.title,
        deadline: dataCorrigida.toISOString(),
        done: this.done,
      };
      try {
        await this.uptListItem(this.id, payload);
        this.$emit(
          "snackbar",
          "Item de tarefa atualizado com sucesso",
          "green"
        );
      } catch (err) {
        const status = err?.response?.status;
        if (status >= 500 && status < 600) {
          alert("Ocorreu um erro no servidor! Tente novamente mais tarde.");
        } else {
          alert("Algo deu errado. Pedimos desculpas pelo inconveniente.");
        }
      }
    },

    async deleteItem() {
      try {
        await this.delListItem(this.id);
        this.$router.push(`/viewList/${this.idPai}`);
        this.$emit("snackbar", "Item de tarefa excluída com sucesso", "green");
      } catch (err) {
        const status = err?.response?.status;
        if (status >= 500 && status < 600) {
          this.$emit(
            "snackbar",
            "Ocorreu um erro no servidor! Tente novamente mais tarde.",
            "red"
          );
        } else {
          this.$emit(
            "snackbar",
            "Algo deu errado. Pedimos desculpas pelo inconveniente.",
            "red"
          );
        }
      }
    },
  },
  mounted() {
    this.getItemLists();
  },
};
</script>
