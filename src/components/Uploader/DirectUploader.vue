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
      // uploadPercent: null,
      // uploadStartTimeStamp: null,
      // uploadEndTimeStamp: null,
      uploadCostSecondsList: [], // 上传文件花费时间
      // intervalList: [], // 上传文件定时器
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
          EventBus.$emit("appendLogsSignal", {
            content: `文件《${file.name}》开始上传`,
            style: {
              color: "blue",
            },
          });

          this.uploadUrl = url;
          // const timeStamp = moment().valueOf() + "";
          const uploadCostSeconds = {
            // timeStamp,
            fileName: file.name,
            costSeconds: 0,
          };

          this.uploadCostSecondsList.push(uploadCostSeconds);
          uploadCostSeconds.interval = setInterval(() => {
            uploadCostSeconds.costSeconds++;
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

      EventBus.$emit("directUploadFileListSignal", fileList);

      if (info.file.status === "uploading" && info.event) {
        console.log(
          `文件《${info.file.name}》上传中,大小:${Math.floor(
            info.event.total / 1024
          )}KB,进度:${info.event.percent.toFixed(2)}%,Unix时间戳:${new Date(
            info.event.timeStamp
          )}`
        );
        EventBus.$emit(
          "appendLogsSignal",
          `文件《${info.file.name}》上传中,大小:${Math.floor(
            info.event.total / 1024
          )}KB,进度:${info.event.percent.toFixed(2)}%,时间戳:${new Date(
            info.event.timeStamp
          )}`
        );
      }

      if (info.file.status === "done") {
        const currentUploadCostSeconds = this.uploadCostSecondsList.find(
          (o) => o.fileName === info.file.name
        );
        // 清除定时器
        clearInterval(currentUploadCostSeconds.interval);
        // 用花费时间（s）创建时长对象
        const uploadCostMoment = moment.duration(
          currentUploadCostSeconds.costSeconds,
          "seconds"
        );

        // 花费时间 时分秒 00:00:00
        const costTime = [
          uploadCostMoment.hours(),
          uploadCostMoment.minutes(),
          uploadCostMoment.seconds(),
        ].join(":");
        this.uploadCostSecondsList = this.uploadCostSecondsList.filter(
          (o) => o.fileName !== info.file.name
        );

        console.log(`文件《${info.file.name}》上传完成,花费时间:${costTime}`);
        // 刷新主列表数据
        EventBus.$emit("loadDataSignal");
        // 打印log
        EventBus.$emit("appendLogsSignal", {
          content: `文件《${info.file.name}》上传完成,花费时间:${costTime}`,
          style: { color: "green" },
        });
      }

      if (info.file.status === "error") {
        const currentUploadCostSeconds = this.uploadCostSecondsList.find(
          (o) => o.fileName === info.file.name
        );
        console.log(`文件《${info.file.name}》上传失败`);
        EventBus.$emit("appendLogsSignal", {
          content: `文件《${info.file.name}》上传失败`,
          style: { color: "red" },
        });
        // 清除定时器
        clearInterval(currentUploadCostSeconds.interval);
        // 删除相应对象
        this.uploadCostSecondsList = this.uploadCostSecondsList.filter(
          (o) => o.fileName !== info.file.name
        );
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
