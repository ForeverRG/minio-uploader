<template>
  <div>
    <a-card title="控制台" :bordered="false" style="width:100%">
      <p v-for="(log, index) in logs" :key="index" :style="log.style">
        {{ log.content }}
      </p>
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
    EventBus.$on("appendLogsSignal", (log) => {
      // 判断是否为对象
      if (Object.prototype.toString.call(log) === "[object Object]") {
        this.logs.unshift(log);
      } else {
        this.logs.unshift({ content: log, style: {} });
      }

      if (this.logs.length > 50) {
        this.logs = [];
      }
    });
  },
  destroyed() {
    EventBus.$off("appendLogsSignal");
  },
};
</script>

<style lang="less" scoped></style>
