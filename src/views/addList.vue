<template>
  <div
    class="d-flex flex-column flex-md-row rounded-xl justify-center rounded-xl overflow-hidden"
    :class="geralClassCss"
    style="border-width: 2px; border-color: black; border-style: solid"
  >
    <div class="w-100">
      <Cabecalho></Cabecalho>
      <BarraTitulo :titlepage="'Adicionar Lista de Tarefas'">
        <template v-slot:slot1>
          <v-btn
            prepend-icon="mdi mdi-content-save-alert-outline"
            type="submit"
            class="align-self-center"
            :disabled="!formValid"
            @click="handleSubmit"
            >Cadastrar</v-btn
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
            Voltar
          </v-btn>
        </template>
      </BarraTitulo>
      <Snackbar :snackbar=true :texto="'Adicionar Lista de Tarefas'"></Snackbar>
      <div
        class="m-a-0 w-100 d-flex align-center justify-space-around flex-wrap"
        style="height: 60%; overflow: auto"
      >
        <v-sheet width="300" class="mx-auto">
          <v-form v-model="formValid" fast-fail @submit.prevent>
            <v-text-field
              v-model="title"
              label="Título da Lista"
              :rules="titleRules"
            ></v-text-field>
          </v-form>
        </v-sheet>
      </div>
    </div>
  </div>
</template>

<script>
import { toDoListsApiMixin } from "@/api/toDoLists";
import Cabecalho from "@/components/header-intern.vue";
import BarraTitulo from "@/components/title-bar.vue";
import Snackbar from "@/components/snackbar.vue";

export default {
  components: {
    Cabecalho,
    BarraTitulo,
    Snackbar,
  },
  mixins: [toDoListsApiMixin],
  data: () => ({
    formValid: true,
    snackbar: false,
    snackbarTexto: "",
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
        /*this.$emit("alerta");*/
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
