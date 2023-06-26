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
      <v-card>
        <v-sheet width="300" class="mx-auto">
          <v-form v-model="formValid" fast-fail @submit.prevent>
            <v-card-title>Atualize o Item da sua lista:</v-card-title>

            <v-text-field
              v-model="title"
              label="Título do Item"
              :rules="titleRules"
            ></v-text-field>
        
            <input type="datetime-local" :value="dateToISOString(myDate)" />

            <v-btn
              color="grey-darken-2"
              type="submit"
              block
              class="mt-2"
              @click="handleSubmit"
              >Adicionar</v-btn
            >

            <v-btn type="back" block class="mt-2" :to="`/Details/${id}`"
              >Voltar</v-btn
            >
            <div></div>
          </v-form>
        </v-sheet>
      </v-card>
    </div>
  </div>
</template>

<script>
import { toDoListsItemsApiMixin } from "@/api/toDoItens";

export default {
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

  methods: {
    dateToISOString(date) {
      if (!date) return "";
      return date.toISOString().slice(0, 16);
    },

    async handleSubmit() {
      const payload = {
        title: this.title,
        deadline: this.myDate.toISOString(),
        listId: this.id,
      };
      console.log(payload);

      try {
        await this.uptListItem(payload);
        alert("Item atualizado com sucesso!");
        this.$router.push(`/Details/${this.id}`);
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
