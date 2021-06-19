<template>
  <div class="horizontal-menu">
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="mail">
        <!-- 上传文件组件 -->
        <!-- <uploader></uploader> -->
        <my-uploader-btn></my-uploader-btn>
        <my-uploader></my-uploader>
      </a-menu-item>
      <a-sub-menu>
        <span slot="title" class="submenu-title-wrapper"
          ><a-icon type="setting" />更多</span
        >
        <a-menu-item-group title="平台管理">
          <a-menu-item key="setting:1">
            <keep-alive>
              <router-link to="UploadLog">控制台</router-link>
            </keep-alive>
          </a-menu-item>
          <a-menu-item key="setting:2" @click="clearLogs">
            垃圾清理
          </a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group title="常用工具">
          <a-menu-item key="setting:3"> 记事本 </a-menu-item>
          <a-menu-item key="setting:4"> 通讯录 </a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-menu-item key="alipay">
        <a href="#" rel="noopener noreferrer"
          ><a-icon type="share-alt" />分享</a
        >
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
import MyUploader from "../uploader/MyUploader.vue";
import MyUploaderBtn from "../uploader/MyUploaderBtn.vue";
import Uploader from "../uploader/Uploader.vue";

import { EventBus } from "../../EventBus.js";

export default {
  components: { Uploader, MyUploader, MyUploaderBtn },
  data() {
    return {
      current: ["mail"],
    };
  },
  methods: {
    clearLogs() {
      EventBus.$emit("clearLogsSignal");
    },
  },
};
</script>
<style lang="less" scoped>
.horizontal-menu {
  float: right;
  height: 100%;
  .ant-menu-submenu,
  .ant-menu-item {
    line-height: 64px;
  }
}
</style>