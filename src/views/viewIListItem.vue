<template>
  <div
    class="d-flex flex-column flex-md-row rounded-xl justify-center rounded-xl overflow-hidden"
    :class="geralClassCss"
    style="border-width: 2px; border-color: black; border-style: solid"
  >
    <div class="w-100">
      <Cabecalho></Cabecalho>

      <BarraTitulo :titlepage="'Visualizar item da lista'">
        <template v-slot:slot1>
          <v-btn
            prepend-icon="mdi mdi-playlist-plus"
            variant="outlined"
            color="white"
            @click="handleSubmit"
          >
            Atualizar
          </v-btn>
        </template>
        <template v-slot:slot2>
          <v-btn
            prepend-icon="mdi mdi-delete-alert"
            variant="outlined"
            color="white"
            @click="deleteItem"
            class="align-self-center"
          >
            Apagar
          </v-btn>
        </template>
        <template v-slot:slot3>
          <v-btn
            prepend-icon="mdi mdi-arrow-left"
            variant="outlined"
            color="white"
            :to="`/viewList/${idPai}`"
            class="align-self-center"
          >
            Voltar
          </v-btn>
        </template>
      </BarraTitulo>
      <div class="w-100">
        <v-sheet width="300" height="500" class="mx-auto mt-16">
          <v-form v-model="formValid" fast-fail @submit.prevent>
            <v-text-field v-model="title" label="Título do Item"></v-text-field>
            <label for="datetime" style="color: gray"
              >Prazo para finalização:</label
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
  mixins: [toDoListsItemsApiMixin],
  data: () => ({
    title: "",
    myDate: "",
    id: null,
    done: Boolean,
    idPai: "",
  }),

  created() {
    this.id = this.$route.params.id;
  },

  methods: {
    handleDateChange(e) {
      const { value } = e.target;
      console.log(value);
      this.myDate = value;
      console.log("passou por aqui");
    },
    dateToISOString(date) {
      console.log("aqui");
      if (!date) return "";

      const adjustedDate = new Date(date);
      adjustedDate.setHours(adjustedDate.getHours() - 3);
      console.log(adjustedDate.toISOString());
      return adjustedDate.toISOString().slice(0, 16);
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
        alert("Item atualizado com sucesso!");
        this.$router.push(`/viewList/${this.idPai}`);
      } catch (err) {
        console.log(err);
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
        alert("Item deletado com sucesso!");
        this.$router.push(`/viewList/${this.idPai}`);
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
  mounted() {
    this.getItemLists();
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
