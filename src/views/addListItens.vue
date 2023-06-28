<template>
  <div
    class="d-flex flex-column flex-md-row rounded-xl justify-center rounded-xl overflow-hidden"
    :class="geralClassCss"
    style="border-width: 2px; border-color: black; border-style: solid"
  >
    <div class="w-100">
      <Cabecalho></Cabecalho>
      <BarraTitulo :titlepage="'Adicionar Items'">
        <template v-slot:slot1>
          <v-btn
            prepend-icon="mdi mdi-content-save-alert-outline"
            type="submit"
            class="align-self-center"
            @click="handleSubmit"
            >Cadastrar</v-btn
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
            Voltar
          </v-btn>
        </template>
      </BarraTitulo>
      <div
        class="m-a-0 w-100 d-flex align-center justify-space-around flex-wrap"
        style="height: 60%; overflow: auto"
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
    </div>
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
    titleRules: [
      (value) => {
        if (!/^.+$/.test(value)) return "Campo Obrigatório";
        if (/.[!#@().$%&]/.test(value))
          return "O nome não deve conter caracteres.";
        return true;
      },
    ],
    myDate: new Date(),
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
        alert("Item da lista criado com sucesso!");
        this.$router.push(`/viewList/${this.id}`);
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
