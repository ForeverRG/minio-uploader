<template>
  <div class="drawer">
    <a-button shape="circle" icon="search" @click="showDrawer"> </a-button>
    <a-drawer
      title="Basic Drawer"
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <!-- 展示文件列表-->
      <div class="show-file-name">
        <a-upload
          style="float: left; width: 100%"
          :file-list="showFileList"
        ></a-upload>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import { EventBus } from "../../EventBus.js";

export default {
  data() {
    return {
      visible: false,
      showFileList: null,
    };
  },
  mounted() {
    EventBus.$on("sendFileListSignal", (fileList) => {
      this.showFileList = fileList;
    });
    EventBus.$on("showDrawerSignal", () => {
      this.showDrawer();
    });
  },
  methods: {
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
  },
};
</script>
<style lang="less" scoped>
</style>