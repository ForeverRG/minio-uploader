<template>
  <div class="upload">
    <a-upload
      :showUploadList="false"
      list-type="picture"
      action="//localhost:5000/api/MinioFile"
      :preview-file="previewFile"
      :before-upload="beforeUpload"
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
    return {
      fileList: [],
    };
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

    // 上传文件之前处理
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      this.computMD5(file);
      // return false;
    },

    // 文件上传中、完成、失败处理
    handleChange(info) {
      let fileList = [...info.fileList]; // 文件列表
      let res = [...info.event]; // 服务器端响应内容
      console.log(res);

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

      if (info.file.status !== "uploading") {
        EventBus.$emit("showDrawerSignal");
      } else {
        console.log(`文件上传中`);
      }

      if (info.file.status === "done") {
        console.log(`文件上传完成`);
      }

      if (info.file.status === "error") {
        console.log(`文件上传失败`);
      }
    },

    // 计算我文件md5，实现断电续传和秒传
    computMD5(file) {
      let fileReader = new FileReader();
      let msTime = new Date().getTime();
      let blobSlice =
        File.prototype.slice ||
        File.prototype.mozSlice ||
        File.prototype.webkitSlice;
      let currentChunk = 0;
      const chunkSize = 10 * 1024 * 1000;
      let chunks = Math.ceil(file.size / chunkSize);
      let spark = new SparkMD5.ArrayBuffer();

      // 文件正在计算md5
      this.setUploadFileStatus(file.id, "md5");
      file.pause();

      loadNext();

      fileReader.onload = (e) => {
        spark.append(e.target.result);
        $(".uploader-file-resume").css("visibility", "hidden");
        if (currentChunk < chunks) {
          currentChunk++;
          loadNext();

          // 实时展示MD5的计算进度
          this.$nextTick(() => {
            $(`.myStatus_${file.id}`).text(
              "校验MD5 " + ((currentChunk / chunks) * 100).toFixed(0) + "%"
            );
          });
        } else {
          $(".uploader-file-resume").css("visibility", "visible");
          let md5 = spark.end();
          this.computeMD5Success(md5, file);
          console.log(SparkMD5.hash(md5));
          console.log(
            `MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${
              file.size
            } 用时：${new Date().getTime() - time} ms`
          );
        }
      };

      fileReader.onerror = function() {
        this.error(`文件${file.name}读取出错，请检查该文件`);
        file.cancel();
      };

      function loadNext() {
        let start = currentChunk * chunkSize;
        let end =
          start + chunkSize >= file.size ? file.size : start + chunkSize;

        fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end));
      }
    },

    // 计算md5完成
    computeMD5Success(md5, file) {
      // 将自定义参数直接加载uploader实例的opts上
      Object.assign(this.uploader.opts, {
        query: {
          ...this.params,
        },
      });

      file.uniqueIdentifier = md5;
      file.resume();
      this.statusRemove(file.id);
    },

    // 设置上传文件的状态
    setUploadFileStatus(id, status) {
      let statusMap = {
        md5: {
          text: "正在校验MD5",
          bgc: "#fff",
        },
        merging: {
          text: "正在合并中",
          bgc: "#e2eeff",
        },
        transcoding: {
          text: "正在转码中",
          bgc: "#e2eeff",
        },
        failed: {
          text: "文件上传失败",
          bgc: "#e2eeff",
        },
      };

      this.$nextTick(() => {
        $(`<p class="myStatus_${id}"></p>`)
          .appendTo(`.file_${id} .uploader-file-status`)
          .css({
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            zIndex: "1",
            backgroundColor: statusMap[status].bgc,
          })
          .text(statusMap[status].text);
      });
    },

    // 移除上传文件状态
    removeUploadFileStatus(id) {
      this.$nextTick(() => {
        $(`.myStatus_${id}`).remove();
      });
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
