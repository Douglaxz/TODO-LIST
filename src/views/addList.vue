<template>
  <BarraTitulo :titlepage="'Adicionar Tarefas'">
    <template v-slot:slot1>
      <v-btn
        prepend-icon="mdi mdi-content-save-alert-outline"
        type="submit"
        class="align-self-center"
        :disabled="!formValid"
        @click="handleSubmit"
        ><p v-if="$vuetify.display.mdAndUp">Cadastrar</p></v-btn
      >
    </template>
    <template v-slot:slot2>
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
  <div
    class="m-a-0 w-100 d-flex align-center justify-space-around flex-wrap"
    style="height: 60%; overflow: auto"
  >
    <v-sheet width="300" class="mx-auto">
      <v-form v-model="formValid" fast-fail @submit.prevent>
        <v-text-field
          v-model="title"
          label="Título da tarefa"
          :rules="titleRules"
        ></v-text-field>
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
import { toDoListsApiMixin } from "@/api/toDoLists";
import BarraTitulo from "@/components/title-bar.vue";

export default {
  components: {
    BarraTitulo,
  },
  mixins: [toDoListsApiMixin],
  data: () => ({
    formValid: true,
    title: "",
    titleRules: [
      (value) => {
        if (!value) return "Por favor, preencha o campo Título";
        return true;
      },
    ],
  }),
  methods: {
    async handleSubmit() {
      const payload = {
        title: this.title,
      };
      try {
        await this.register(payload);

        this.$router.push("/Dashboard");
        this.$emit("snackbar", "Tarefa adicionada com sucesso", "green");
      } catch (err) {
        console.error(err);
        const status = err?.response?.status;

        if (status >= 500 && status < 600) {
          /*alert("Ocorreu um erro no servidor, tente mais tarde");*/
          this.$emit(
            "snackbar",
            "Ocorreu um erro no servidor, tente mais tarde",
            "red"
          );
        } else {
          /*alert("Algo deu errado, pedimos desculpas");*/
          this.$emit("snackbar", "Algo deu errado, pedimos desculpas", "red");
        }
      }
    },
  },
};
</script>
