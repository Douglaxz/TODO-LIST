<template>
  <v-container class="bg-black justify-space-between">
    <v-row no-gutters class="d-flex align-center justify-center">
      <v-col cols="12" sm="2">
        <v-sheet class="ma-2 pa-2 bg-black d-flex align-center justify-center">
          <div
            class="bg-white d-flex align-center justify-center"
            style="width: 90px; height: 90px; border-radius: 50%"
          >
            <span
              class="mdi mdi-list-status text-black"
              style="font-size: 90px"
            ></span></div
        ></v-sheet>
      </v-col>
      <v-col cols="12" sm="6">
        <v-sheet
          class="ma-2 pa-2 bg-black text-white d-flex align-center justify-center"
          ><h3>TODO List</h3></v-sheet
        >
      </v-col>
      <v-col cols="12" sm="2">
        <v-sheet class="ma-2 pa-2 bg-black d-flex align-center justify-center">
          <v-btn
            prepend-icon="mdi mdi-home-alert-outline"
            variant="outlined"
            color="white"
            to="/Dashboard"
          >
            Home
          </v-btn></v-sheet
        >
      </v-col>
      <v-col cols="12" sm="2">
        <v-sheet class="ma-2 pa-2 bg-black d-flex align-center justify-center">
          <v-btn
            prepend-icon="mdi mdi-exit-to-app"
            variant="outlined"
            color="white"
            @click="logout"
          >
            Sair
          </v-btn></v-sheet
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push(`/`);
    },
  },
};
</script>
