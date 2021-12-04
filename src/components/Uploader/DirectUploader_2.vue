<template>
  <div class="direct-uploader">
    <a-upload
      :showUploadList="false"
      multiple
      list-type="picture"
      method="put"
      :action="uploadUrl"
      :before-upload="beforeUpload"
      @change="handleChange"
    >
      <span><a-icon type="upload" /> 直连上传 </span>
    </a-upload>
  </div>
</template>
<script>
const moment = require("moment");
import { mapActions, mapGetters } from "vuex";

import { EventBus } from "../../EventBus.js";

import Drawer from "../../components/drawer/Drawer.vue";

export default {
  components: { Drawer },
  data() {
    return {
      uploadUrl: "",
      uploadPercent: null,
      uploadStartTimeStamp: null,
      uploadEndTimeStamp: null,
      uploadCostSeconds: 0,
      interval: null,
      fileList: [],
    };
  },
  computed: {
    ...mapGetters(["presignedURL"]),
  },
  methods: {
    ...mapActions(["getPresignedURL"]),

    // previewFile(file) {
    //   console.log("Your upload file:", file);
    //   this.showFileList = file;
    //   // Your process logic. Here we just mock to the same file
    // },

    // 上传文件之前处理
    beforeUpload(file, fileList) {
      this.fileList = [...this.fileList, file];
      return new Promise((resolve, reject) => {
        // 获取预签名url
        this.getPresignedURL({
          bucketName: "test",
          objectName: file.name,
        }).then((url) => {
          console.log(`文件《${file.name}》开始上传`);

          this.uploadUrl = url;
          this.uploadCostSeconds = 0;
          this.interval = setInterval(() => {
            this.uploadCostSeconds++;
          }, 1000); // 执行定时器
          EventBus.$emit("showDirectUploadSignal");

          this.uploadUrl ? resolve() : reject();
        });
      });
    },

    // 文件上传中、完成、失败处理
    handleChange(info) {
      let fileList = [...info.fileList]; // 文件列表
      // let res = [...info.event]; // 服务器端响应内容
      // console.log(info);

      // // 1. Limit the number of uploaded files
      // //    Only to show two recent uploaded files, and old ones will be replaced by the new
      // fileList = fileList.slice(-2);

      // // 2. read from response and show file link
      // fileList = fileList.map((file) => {
      //   if (file.response) {
      //     // Component will show file.url as link
      //     file.url = file.response.url;
      //   }
      //   return file;
      // });

      EventBus.$emit("directUploadFileListSignal", fileList);

      if (info.file.status === "uploading" && info.event) {
        //   EventBus.$emit("showDrawerSignal");
        // } else {
        console.log(
          `文件《${info.file.name}》上传中,大小:${Math.floor(
            info.event.total / 1024
          )}KB,进度:${info.event.percent.toFixed(2)}%,时间戳:${new Date(
            info.event.timeStamp
          ).toLocaleTimeString()}`
        );
      }

      if (info.file.status === "done") {
        // 清除定时器
        clearInterval(this.interval);
        // 用花费时间（s）创建时长对象
        const uploadCostMoment = moment.duration(
          this.uploadCostSeconds,
          "seconds"
        );

        // 花费时间 时分秒 00:00:00
        const costTime = [
          uploadCostMoment.hours(),
          uploadCostMoment.minutes(),
          uploadCostMoment.seconds(),
        ].join(":");

        console.log(`文件《${info.file.name}》上传完成,花费时间:${costTime}`);
      }

      if (info.file.status === "error") {
        console.log(`文件《${info.file.name}》上传失败`);
      }
    },
  },
  created() {},
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
