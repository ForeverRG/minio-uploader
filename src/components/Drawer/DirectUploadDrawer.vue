<template>
  <div class="direct-upload-drawer">
    <a-button type="link" @click="showDrawer" style="color:rgba(0, 0, 0, 0.65)"
      >直连上传列表</a-button
    >
    <a-drawer
      width="400"
      title="上传文件列表"
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <!-- 展示文件列表-->
      <div class="show-file-name">
        <a-upload
          ref="uploadRef"
          style="float: left; width: 100%"
          :file-list="showFileList"
        >
        </a-upload>
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
    EventBus.$on("directUploadFileListSignal", (fileList) => {
      this.showFileList = fileList;
    });

    // 监听上传组件发送的显示drawer信号
    EventBus.$on("showDirectUploadSignal", () => {
      this.showDrawer();
    });
  },
  methods: {
    afterVisibleChange(val) {
      // console.log("visible", val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    // sendShowFileListDrawerSignal() {
    //   EventBus.$emit("showFileListDrawerSignal");
    // },
  },
  destroyed() {
    // 组件销毁则事件总线绑定事件销毁
    EventBus.$off("sendFileListSignal");
    EventBus.$off("showDrawerSignal");
  },
};
</script>
<style lang="less" scoped></style>
