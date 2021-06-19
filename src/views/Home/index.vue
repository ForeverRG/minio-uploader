<template lang="">
  <div class="layout">
    <layout></layout>
  </div>
</template>
<script>
import Layout from "../../components/layout/index.vue";

export default {
  name: "Home",
  components: {
    Layout,
  },
};
</script>
<style lang="less" scoped>
.layout {
  height: 100%;
}
</style>