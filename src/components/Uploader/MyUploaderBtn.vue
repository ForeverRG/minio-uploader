<template>
  <div>
    <span @click="upload"><a-icon type="cloud-upload" /> 上传 </span>
  </div>
</template>

<script>
import { EventBus } from "../../EventBus.js";

export default {
  data() {
    return {};
  },
  mounted() {
    // 文件选择后的回调
    EventBus.$on("fileAdded", () => {
      console.log("文件已选择");
    });

    // 文件上传成功的回调
    EventBus.$on("fileSuccess", () => {
      console.log("文件上传成功");
    });
  },
  methods: {
    upload() {
      // 打开文件选择框
      EventBus.$emit("openUploader", {
        id: "1111", // 传入的参数
      });
    },
  },
  destroyed() {
    EventBus.$off("fileAdded");
    EventBus.$off("fileSuccess");
  },
};
</script>
