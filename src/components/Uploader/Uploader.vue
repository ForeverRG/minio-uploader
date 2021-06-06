<template>
  <div class="upload">
    <a-upload
      :showUploadList="false"
      list-type="picture"
      action="//jsonplaceholder.typicode.com/posts/"
      :preview-file="previewFile"
      @change="handleChange"
    >
      <span><a-icon type="cloud-upload" /> 上传 </span>
    </a-upload>
  </div>
</template>
<script>
import { EventBus } from "../../EventBus.js";

export default {
  data() {
    return {};
  },
  methods: {
    previewFile(file) {
      console.log("Your upload file:", file);
      this.showFileList = file;
      // Your process logic. Here we just mock to the same file
      return fetch("https://next.json-generator.com/api/json/get/4ytyBoLK8", {
        method: "POST",
        body: file,
      })
        .then((res) => console.log(res.json()))
        .then(({ thumbnail }) => thumbnail);
    },

    handleChange(info) {
      let fileList = [...info.fileList];

      // 1. Limit the number of uploaded files
      //    Only to show two recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-2);

      // 2. read from response and show file link
      fileList = fileList.map((file) => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        return file;
      });

      EventBus.$emit("sendFileListSignal", fileList);

      if (info.file.status !== 'uploading') {
        EventBus.$emit("showDrawerSignal");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.upload {
  float: right;
  span:hover {
    color: #1890ff;
  }
  .show-file-name {
    background: pink;
  }
}
</style>