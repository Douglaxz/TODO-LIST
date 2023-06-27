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
              readonly
            ></v-text-field>

            <input
              type="datetime-local"
              :value="dateToISOString(myDate)"
              @input="myDate = new Date($event.target.value)"
              readonly
            />
            <v-checkbox v-model="this.done" :label="`Finalizado?`"></v-checkbox>
            <v-btn
              color="grey-darken-2"
              type="submit"
              block
              class="mt-2"
              @click="handleSubmit"
              >Atualizar</v-btn
            >

            <v-btn type="delete" block class="mt-2" @click="deleteItem"
              >Deletar</v-btn
            >

            <v-btn type="back" block class="mt-2" :to="`/Details/${idPai}`"
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
    myDate: "",
    id: null,
    done: Boolean,
    idPai: "",
  }),

  created() {
    this.id = this.$route.params.id;
  },

  methods: {
    dateToISOString(date) {
      if (!date) return "";

      const adjustedDate = new Date(date);
      adjustedDate.setHours(adjustedDate.getHours() - 3);

      return adjustedDate.toISOString().slice(0, 16);
    },

    async getItemLists() {
      try {
        console.log(this.id);
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
      const payload = {
        done: this.done,
      };

      try {
        await this.uptListItem(this.id, payload);
        alert("Item atualizado com sucesso!");
        this.$router.push(`/Details/${this.idPai}`);
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
        alert("Item deletado com sucesso!");
        this.$router.push(`/Details/${this.idPai}`);
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
};
</script>
