<template>
  <div class="drawer">
    <!-- <a-button shape="circle" icon="search" @click="showDrawer"> </a-button> -->
    <a-button type='link' @click="sendShowFileListDrawerSignal">上传列表</a-button>
    <a-drawer
      width="400"
      title="上传进度"
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
    // 监听上传组件发送的上传文件信号
    EventBus.$on("sendFileListSignal", (fileList) => {
      this.showFileList = fileList;
    });

    // 监听上传组件发送的显示drawer信号
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
    sendShowFileListDrawerSignal() {
      EventBus.$emit("showFileListDrawerSignal")
    }
  },
  destroyed() {
    // 组件销毁则事件总线绑定事件销毁
    EventBus.$off('sendFileListSignal');
    EventBus.$off('showDrawerSignal');
  }
};
</script>
<style lang="less" scoped>
</style>