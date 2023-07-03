<template>
  <div>
    <v-alert
      v-model="open"
      :type="type"
      border="start"
      variant="tonal"
      closable
      close-label="Close Alert"
      title="Atenção"
      @taskCreated="updateAlert"
      @click:close="resetCreated"
    >
      {{ titlepage }}
    </v-alert>
  </div>
</template>
<script>
export default {
  props: {
    titlepage: String,
    type: String,
    alert: Boolean,
    resetCreated: Function,
  },
  data() {
    return {
      open: this.$props.alert,
    };
  },
  methods: {
    updateAlert() {
      this.alert = !this.alert;
    },
  },
  updated() {
    this.open = this.$props.alert;
  },
};
</script>
