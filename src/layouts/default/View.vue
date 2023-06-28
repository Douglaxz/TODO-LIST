<template>
  <v-main class="d-flex justify-center align-center ma-3">
    <transition name="slide-x-transition" mode="out-in">
      <router-view
        @alerta="created = true"
        :created="created"
        :resetCreated="resetCreated"
      />
    </transition>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      created: false,
    };
  },
  methods: {
    resetCreated() {
      this.created = false;
    },
  },
};
</script>

<style>
.slide-x-transition-enter-active,
.slide-x-transition-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-x-transition-enter,
.slide-x-transition-leave-to {
  transform: translateX(100%);
}
</style>
