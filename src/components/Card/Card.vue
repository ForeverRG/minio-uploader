<template>
  <div>
    <a-card title="控制台" :bordered="false" style="width:100%">
      <p v-for="(log, index) in logs" :key="index">{{ log }}</p>
    </a-card>
  </div>
</template>

<script>
import { EventBus } from "../../EventBus.js";

export default {
  data() {
    return {
      logs: [],
    };
  },
  mounted() {
    EventBus.$on("appendLogsSignal", (logs) => {
      this.logs.push(logs);
    });
  },
  destroyed() {
    EventBus.$off("appendLogsSignal");
  },
};
</script>

<style lang="less" scoped>
</style>