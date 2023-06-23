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

          <v-btn type="delete" block class="mt-2" @click="delLists()"
            >Deletar</v-btn
          >

          <v-btn type="back" block class="mt-2" to="/Dashboard">Voltar</v-btn>
        </v-form>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import { toDoListsApiMixin } from "@/api/toDoLists";
export default {
  mixins: [toDoListsApiMixin],
  data() {
    const id = this.$route.params.id;

    return {
      id: id,
      title: this.title,
    };
  },
  methods: {
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
  },
  mounted() {
    this.getLists();
  },
};
</script>
