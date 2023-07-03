<template>
  <BarraTitulo :titlepage="'Adicionar Items'">
    <template v-slot:slot1>
      <v-btn
        prepend-icon="mdi mdi-content-save-alert-outline"
        type="submit"
        class="align-self-center"
        @click="handleSubmit"
        ><p v-if="$vuetify.display.mdAndUp">Adicionar</p></v-btn
      >
    </template>
    <template v-slot:slot2>
      <v-btn
        prepend-icon="mdi mdi-arrow-left"
        variant="outlined"
        color="white"
        :to="`/viewList/${id}`"
        class="align-self-center"
      >
        <p v-if="$vuetify.display.mdAndUp">Voltar</p>
      </v-btn>
    </template>
  </BarraTitulo>
  <div
    class="m-a-0 w-100 d-flex align-center justify-space-around flex-wrap"
    style="height: 60%; min-height: 510px; overflow: auto"
  >
    <v-card>
      <v-sheet width="300" class="mx-auto">
        <v-form v-model="formValid" fast-fail @submit.prevent>
          <v-text-field
            v-model="title"
            label="Título do Item"
            :rules="titleRules"
          ></v-text-field>
          <label for="datetime" style="color: gray"
            >Prazo para finalização:</label
          >
          <input
            type="datetime-local"
            :value="myDate"
            @input="handleDateChange"
            style="background-color: #f6f6f6; height: 40px; width: 100%"
          />
        </v-form>
      </v-sheet>
    </v-card>
  </div>
</template>

<script>
import { toDoListsItemsApiMixin } from "@/api/toDoItens";
import Cabecalho from "@/components/header-intern.vue";
import BarraTitulo from "@/components/title-bar.vue";
export default {
  components: {
    Cabecalho,
    BarraTitulo,
  },
  components: {
    Cabecalho,
    BarraTitulo,
  },
  mixins: [toDoListsItemsApiMixin],
  data: () => ({
    title: "",
    formValid: false,
    titleRules: [
      (value) => {
        if (!/^.+$/.test(value)) return "Campo Obrigatório";
        if (/.[!#@().$%&]/.test(value))
          return "O nome não deve conter caracteres.";
        return true;
      },
    ],
    myDate: new Date().toISOString().slice(0, 16),
    id: null,
  }),
  created() {
    this.id = this.$route.params.id;
  },
  methods: {
    handleDateChange(e) {
      const { value } = e.target;
      console.log(value);
      this.myDate = value;
    },

    dateToISOString(date) {
      if (!date) return "";
      const adjustedDate = new Date(date);
      return adjustedDate.toISOString();
    },

    async handleSubmit() {
      const payload = {
        title: this.title,
        deadline: this.dateToISOString(this.myDate),
        listId: this.id,
      };
      console.log(payload);

      try {
        await this.addListItem(payload);
        this.$router.push(`/viewList/${this.id}`);
        this.$emit("snackbar", "Item de tarefa criado com sucesso", "green");
      } catch (err) {
        const status = err?.response?.status;
        if (status >= 500 && status < 600) {
          alert("Ocorreu um erro no servidor! Tente novamente mais tarde.");
        } else {
          alert("Algo deu errado. Pedimos desculpas pelo inconveniente.");
        }
      }
    },
  },
};
</script>
