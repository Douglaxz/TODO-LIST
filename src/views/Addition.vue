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
      <v-sheet width="300" class="mx-auto">
        <v-form v-model="formValid" fast-fail @submit.prevent>
          <v-text-field
            v-model="title"
            label="Título"
            :rules="titleRules"
          ></v-text-field>

          <v-btn
            type="submit"
            block
            class="mt-2"
            :disabled="!formValid"
            @click="handleSubmit"
            >Cadastrar</v-btn
          >

          <v-btn
            type="back"
            block
            class="mt-2"
            to="/Dashboard"
            >Voltar</v-btn
          >

        </v-form>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import { toDoListsApiMixin } from "@/api/toDoLists";

export default {
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
        alert("Tarefa criada!");
        this.$router.push("/Dashboard");
      } catch (err) {
        console.error(err);
        const status = err?.response?.status;

        if (status >= 500 && status < 600) {
          alert("Ocorreu um erro no servidor, tente mais tarde");
        } else {
          alert("Algo deu errado, pedimos desculpas");
        }
      }
    },
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
