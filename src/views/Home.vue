<template>
  <div
    class="d-flex flex-column flex-md-row rounded-xl justify-center rounded-xl overflow-hidden animated-border"
    :class="geralClassCss"
    style="border-width: 2px; border-color: black; border-style: solid"
  >
    <div
      class="d-flex flex-column align-center bg-black justify-space-evenly"
      :class="iconeClassCss"
    >
      <h3>Bem-vindo ao TODO List</h3>
      <p class="text-center pa-2">
        Informe seu dados para login ou clique em Cadastro
      </p>
      <div
        class="bg-white d-flex align-center justify-center"
        style="width: 170px; height: 170px; border-radius: 50%"
      >
        <span
          class="mdi mdi-list-status text-black"
          style="font-size: 90px"
        ></span>
      </div>
      <RouterLink to="/Cadastro"
        ><v-btn
          prepend-icon="mdi-account-plus-outline"
          variant="outlined"
          color="white"
        >
          Cadastro
        </v-btn></RouterLink
      >
    </div>
    <div
      class="d-flex flex-sm-column align-center justify-center justify-sm-space-evenly"
      :class="formularioClassCss"
    >
      <v-sheet width="300" class="mx-auto">
        <v-form v-model="formValid" fast-fail @submit.prevent>
          <v-text-field
            v-model="email"
            append-icon="mdi-account-circle"
            label="E-mail"
            :rules="emailRules"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            label="Senha"
            hint="Senha necessária"
            @click:append="show1 = !show1"
          ></v-text-field>

          <v-btn
            type="submit"
            block
            class="mt-2"
            :disabled="!formValid"
            @click="handleSubmit"
            >Login</v-btn
          >
        </v-form>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import { setupPrivateApi } from "@/api";
import { authApiMixin } from "@/api/auth";
export default {
  mixins: [authApiMixin],
  data: () => ({
    formValid: true,
    email: "",
    emailRules: [
      function (value) {
        const emailRegex =
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

        if (!emailRegex.test(value)) {
          return "E-mail inválido";
        }
      },
    ],
    password: "",
    rules: {
      required: (value) => !!value || "Senha necessária.",
    },
  }),
  methods: {
    async handleSubmit() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      try {
        console.log(payload);
        const { data } = await this.login(payload);
        const { access_token } = data;
        localStorage.setItem("access_token", access_token);
        setupPrivateApi(access_token);
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

<style scoped></style>
