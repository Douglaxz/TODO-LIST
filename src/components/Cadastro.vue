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
            v-model="user"
            append-icon="mdi-account-circle"
            label="Usuário"
            :rules="userRules"
          ></v-text-field>

          <v-text-field
            v-model="email"
            append-icon="mdi-email-outline"
            label="E-mail"
            :rules="emailRules"
          ></v-text-field>

          <v-text-field
            v-model="password"
            append-icon="mdi-lock-outline"
            :rules="passwordRules"
            type="password"
            label="Senha"
            hint="Senha necessária"
          ></v-text-field>

          <v-text-field
            v-model="confirmPassword"
            append-icon="mdi-lock-outline"
            type="password"
            label="Confirmação de senha"
            hint="Senha necessária"
            :rules="[testPassword]"
          ></v-text-field>

          <v-btn type="submit" block class="mt-2" :disabled="!formValid"
            >Cadastrar</v-btn
          >
        </v-form>
      </v-sheet>
    </div>
    <div
      class="d-flex flex-column align-center bg-black justify-space-evenly"
      :class="iconeClassCss"
    >
      <h3>Bem-vindo ao TODO List</h3>
      <p class="text-center pa-2">
        Informe seu dados para cadastro ou clique em Login para acesso
      </p>
      <div
        class="iconeCirculo bg-white d-flex align-center justify-center"
        style="width: 170px; height: 170px; border-radius: 50%"
      >
        <span
          class="mdi mdi-list-status text-black"
          style="font-size: 90px"
        ></span>
      </div>
      <RouterLink to="/"
        ><v-btn prepend-icon="mdi-login" variant="outlined" color="white">
          Login
        </v-btn></RouterLink
      >
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    formValid: true,
    user: "",
    userRules: [
      (value) => {
        if (!value) return "Por favor, preencha o campo usuário";
        if (value.includes(" "))
          return "Campo usuário não pode conter espaço em branco";
        if (value.toLowerCase() !== value)
          return "Campo usuário só pode ter letras minúsculas";
        return true;
      },
    ],
    email: "",
    emailRules: [
      (value) => {
        const emailRegex =
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

        if (!emailRegex.test(value)) {
          return "E-mail inválido";
        }
        return true;
      },
    ],
    password: "",
    passwordRules: [
      (value) => {
        const senhaRegex =
          /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

        // Verifica se a senha corresponde ao formato esperado
        if (!senhaRegex.test(value)) {
          return "A senha deve ter no mínimo 8 caracteres, conter pelo menos 1 caractere especial e 1 número";
        }
        return true;
      },
    ],
    confirmPassword: "",
  }),
  methods: {
    handleSubmit(event) {
      event.preventDEfault();
      if (!this.isFormValid) {
        alert("Preencha direito");
        return;
      }
      console.log(this.isFormValid);
    },
    testPassword(value) {
      if (value !== this.password) {
        return "As senhas não coincidem";
      }
      return true;
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
