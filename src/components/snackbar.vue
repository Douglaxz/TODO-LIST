<template>
  <v-snackbar v-model="snackbar" multi-line>
    {{ texto }}

    <template v-slot:actions>
      <v-btn color="red" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  props: {
    texto: String,
    snackbar: Boolean,
  },
};
</script>
