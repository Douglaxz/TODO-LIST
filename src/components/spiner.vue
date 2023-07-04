<template>
  <div>
    <div v-if="show" class="spinner-overlay">
      <div class="spinner-content">
        <v-progress-circular
          indeterminate
          color="black"
          :size="128"
          :width="12"
        ></v-progress-circular>
      </div>
    </div>
  </div>
</template>

<style>
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo esmaecido */
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner-content {
  position: relative;
  z-index: 9999;
}
</style>

<script>
export default {
  props: ["show"],
  data() {
    return {
      showSpinner: false,
    };
  },
};
</script>
