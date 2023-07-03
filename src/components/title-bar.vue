<template>
  <v-container
    class="bg-black mt-3 mb-2 pa-2 d-flex align-center"
    style="height: 50px"
  >
    <v-row no-gutters class="d-flex justify-space-between">
      <v-col cols="6">
        <v-sheet class="bg-black d-flex flex-column justify-start pt-2">
          <strong>{{ titlepage }}</strong>
        </v-sheet>
      </v-col>
      <v-col cols="6">
        <v-sheet
          class="bg-black d-flex justify-end text-right align-self-center pa-0"
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
