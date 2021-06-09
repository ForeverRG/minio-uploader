<template lang="">
  <div id="uploadLog">
    <card ref="card"></card>
  </div>
</template>
<script>
import Card from "../../components/Card/Card.vue";

import { EventBus } from "../../EventBus.js";

export default {
  name: "UploadLog",
  components: {
    Card,
  },
  mounted() {
    EventBus.$on("clearLogsSignal", () => this.clearLogs());
  },
  methods: {
    clearLogs() {
      this.$refs.card.logs = [];
    },
  },
  destroyed() {
    EventBus.$off("clearLogsSignal");
  },
};
</script>
<style >
</style>