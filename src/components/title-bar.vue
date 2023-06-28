<template>
  <v-container class="bg-black mt-3 mb-2" style="height: 70px">
    <v-row no-gutters class="d-flex justify-space-between">
      <v-col cols="3">
        <v-sheet class="pa-2 bg-black d-flex flex-column justify-start">
          <strong>{{ titlepage }}</strong>
        </v-sheet>
      </v-col>
      <v-col cols="9">
        <v-sheet
          class="bg-black d-flex justify-end text-right align-self-center"
        >
          <slot name="slot1"></slot>
          <slot name="slot2"></slot>
          <slot name="slot3"></slot>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    titlepage: String,
  },
};
</script>
