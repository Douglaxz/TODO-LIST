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
            @click="uptLists"
            >Atualizar</v-btn
          >

          <v-btn type="delete" block class="mt-2" @click="delLists()"
            >Deletar</v-btn
          >

          <v-btn :to="`/addListItens/${id}`" block class="mt-2"
            >Adicionar Item</v-btn
          >

          <v-btn type="back" block class="mt-2" to="/Dashboard">Voltar</v-btn>
        </v-form>
      </v-sheet>
      <v-card v-for="list in itemList" :key="list.id" variant="outlined">
        <router-link :to="`/viewIListItem/${list.id}`">
          <v-card-title>{{ list.title }}</v-card-title>
          <v-card-text
            >{{ formatDate(list.deadline) }}
            <v-checkbox v-model="list.done" :label="`Finalizado?`"></v-checkbox
          ></v-card-text>
        </router-link>
      </v-card>
    </div>
  </div>
</template>

<script>
import { toDoListsApiMixin } from "@/api/toDoLists";
import moment from "moment";

export default {
  mixins: [toDoListsApiMixin],
  data() {
    const id = this.$route.params.id;

    return {
      id: id,
      title: this.title,
      itemList: [],
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY HH:mm");
    },

    async getItemLists(id) {
      try {
        const { data } = await this.details(id);
        this.itemList = data.items;
      } catch (err) {
        alert("Algo deu errado na hora de puxar os itens da lista.");
      }
    },
    async getLists() {
      try {
        const { data } = await this.details(this.id);
        this.title = data.title;
      } catch (err) {
        alert("Algo deu errado.");
      }
    },
    async delLists() {
      try {
        await this.delete(this.id);
        alert("Item apagado com sucesso!");
        this.$router.push("/Dashboard");
      } catch (err) {
        alert("Algo deu errado na hora de deletar.");
      }
    },
    async uptLists() {
      const payload = {
        title: this.title,
      };
      try {
        await this.uptItem(this.id, payload);
        alert("Item atualizado com sucesso");
        this.$router.push("/Dashboard");
      } catch (err) {
        alert("Algo deu errado na hora de atualizar.");
      }
    },
  },
  mounted() {
    this.getLists();
    this.getItemLists(this.id);
  },
};
</script>
