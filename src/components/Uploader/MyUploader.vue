<template>
  <div id="global-uploader">
    <!-- 上传 -->
    <uploader
      ref="uploader"
      :options="options"
      :autoStart="false"
      @file-added="onFileAdded"
      @file-success="onFileSuccess"
      @file-progress="onFileProgress"
      @file-error="onFileError"
      class="uploader-app"
    >
      <uploader-unsupport></uploader-unsupport>

      <uploader-btn id="global-uploader-btn" :attrs="attrs" ref="uploadBtn"
        >选择文件</uploader-btn
      >

      <!-- <a-button shape="circle" icon="search" @click="showDrawer"> </a-button> -->
      <a-drawer
        :height="330"
        title="上传文件列表"
        placement="bottom"
        :closable="false"
        :visible="visible"
        :after-visible-change="afterVisibleChange"
        @close="onClose"
      >
        <!-- 展示文件列表-->
        <uploader-list>
          <div
            class="file-panel"
            slot-scope="props"
            :class="{ collapse: collapse }"
          >
            <ul class="file-list">
              <li v-for="file in props.fileList" :key="file.id">
                <uploader-file
                  :class="'file_' + file.id"
                  ref="files"
                  :file="file"
                  :list="true"
                ></uploader-file>
              </li>
              <div class="no-file" v-if="!props.fileList.length">
                <i class="iconfont icon-empty-file"></i> 暂无待上传文件
              </div>
            </ul>
          </div>
        </uploader-list>
      </a-drawer>
    </uploader>
  </div>
</template>

<script>
/**
 *   全局上传插件
 *   调用方法：EventBus.$emit('openUploader', {}) 打开文件选择框，参数为需要传递的额外参数
 *   监听函数：EventBus.$on('fileAdded', fn); 文件选择后的回调
 *            EventBus.$on('fileSuccess', fn); 文件上传成功的回调
 */

import { ACCEPT_CONFIG } from "../../acceptFileType.js";
import { EventBus } from "../../EventBus.js";
import SparkMD5 from "spark-md5";

import { uploadFiles } from "../../network/files";

var baseUrl = "http://192.168.25.58:5001/api/";
export default {
  data() {
    return {
      options: {
        target: baseUrl + "MinioFile", //api.simpleUploadURL,
        chunkSize: 5242880,
        fileParameterName: "upfile",
        maxChunkRetries: 5,
        forceChunkSize: true, // 强制每片都小于分片大小
        testChunks: true, //是否开启服务器分片校验
        // 服务器分片校验函数，秒传及断点续传基础
        checkChunkUploadedByResponse: function (chunk, res) {
          res = JSON.parse(res);
          let objMessage = res.data;
          if (objMessage.skipUpload) {
            return true;
          }

          return (objMessage.uploaded || []).indexOf(chunk.offset + 1) >= 0;
        },
        headers: {
          //   Authorization: Ticket.get() && "Bearer " + Ticket.get().access_token,
        },
        query() {},
      },
      attrs: {
        accept: ACCEPT_CONFIG.getAll(),
      },
      // panelShow: false, //选择文件后，展示上传panel
      collapse: false,
      visible: false,
    };
  },
  mounted() {
    EventBus.$on("openUploader", (query) => {
      this.params = query || {};

      if (this.$refs.uploadBtn) {
        this.$refs.uploadBtn.$el.click(); //触发组件的click事件
      }
    });
    EventBus.$on("showFileListDrawerSignal", () => {
      this.visible = true;
    });
  },
  computed: {
    //Uploader实例
    uploader() {
      return this.$refs.uploader.uploader;
    },
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
    onFileAdded(file) {
      this.visible = true;
      this.computeMD5(file);
      EventBus.$emit("fileAdded");
    },
    onFileProgress(rootFile, file, chunk) {
      let log = `上传中 ${file.name}，chunk：${
        chunk.startByte / 1024 / 1024
      } ~ ${chunk.endByte / 1024 / 1024}`;
      EventBus.$emit("appendLogsSignal", log);
      // console.log(
      //   `上传中 ${file.name}，chunk：${chunk.startByte / 1024 / 1024} ~ ${
      //     chunk.endByte / 1024 / 1024
      //   }`
      // );
    },
    onFileSuccess(rootFile, file, response, chunk) {
      let res = JSON.parse(response);
      // 服务器自定义的错误（即虽返回200，但是是错误的情况），这种错误是Uploader无法拦截的
      if (!res.success) {
        this.$message({ message: res.msg, type: "error" });
        // 文件状态设为“失败”
        this.statusSet(file.id, "failed");
        return;
      }

      // 如果服务端返回需要合并;
      if (res.data.needMerge) {
        // 文件状态设为“合并中”
        let data = { ...this.params };
        EventBus.$emit("appendLogsSignal", file.id);
        // console.log(file.id);
        this.statusSet(file.id, "merging");
        var self = this;

        uploadFiles(
          JSON.stringify({
            identifier: file.uniqueIdentifier,
          })
        )
          .then((res) => {
            // console.log(res);
            EventBus.$emit("fileSuccess");
            self.statusRemove(file.id);
          })
          .catch((error) => {
            let dom = document.getElementsByClassName(`myStatus_${file.id}`);
            dom[0].style.visibility = "hidden";
            self.statusSet(file.id, "failed");
          });
      } else {
        EventBus.$emit("fileSuccess");
        EventBus.$emit("appendLogsSignal", "上传成功");
        console.log("上传成功");
      }
    },
    onFileError(rootFile, file, response, chunk) {
      this.$message({
        message: res.msg,
        type: "error",
      });
    },

    /**
     * 计算md5，实现断点续传及秒传
     * @param file
     */
    computeMD5(file) {
      let fileReader = new FileReader();
      let time = new Date().getTime();
      let blobSlice =
        File.prototype.slice ||
        File.prototype.mozSlice ||
        File.prototype.webkitSlice;
      let currentChunk = 0;
      const chunkSize = 10 * 1024 * 1000;
      let chunks = Math.ceil(file.size / chunkSize);
      let spark = new SparkMD5.ArrayBuffer();

      // 文件状态设为"计算MD5"
      this.statusSet(file.id, "md5");
      file.pause();

      loadNext();

      fileReader.onload = (e) => {
        spark.append(e.target.result);
        this.$refs.files[
          this.$refs.files.length - 1
        ].$el.children[1].children[4].children[1].style.visibility = "hidden";
        if (currentChunk < chunks) {
          currentChunk++;
          loadNext();

          // 实时展示MD5的计算进度
          this.$nextTick(() => {
            let dom = document.getElementsByClassName(`myStatus_${file.id}`);
            dom[0].innerHTML =
              "(校验MD5 " + ((currentChunk / chunks) * 100).toFixed(0) + "%)";
          });
        } else {
          this.$refs.files[
            this.$refs.files.length - 1
          ].$el.children[1].children[4].children[1].style.visibility =
            "visible";
          let md5 = spark.end();
          this.computeMD5Success(md5, file);
          EventBus.$emit("appendLogsSignal", SparkMD5.hash(md5));
          EventBus.$emit(
            "appendLogsSignal",
            `MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${
              file.size
            } 用时：${new Date().getTime() - time} ms`
          );
          // console.log(SparkMD5.hash(md5));
          // console.log(
          //   `MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${
          //     file.size
          //   } 用时：${new Date().getTime() - time} ms`
          // );
        }
      };

      fileReader.onerror = function () {
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

    // close() {
    //   this.uploader.cancel();

    //   this.panelShow = false;
    // },

    /**
     * 新增的自定义的状态: 'md5'、'transcoding'、'failed'
     * @param id
     * @param status
     */
    statusSet(id, status, checkProcessVal = 0) {
      let statusMap = {
        md5: {
          text: "校验MD5",
          bgc: "#fff",
        },
        checkMD5: {
          text: checkProcessVal,
          bgc: "#fff",
        },
        merging: {
          text: "合并中",
          bgc: "#e2eeff",
        },
        transcoding: {
          text: "转码中",
          bgc: "#e2eeff",
        },
        failed: {
          text: "上传失败",
          bgc: "#e2eeff",
        },
      };

      this.$nextTick(() => {
        let p = document.createElement("p");
        p.setAttribute("class", `myStatus_${id}`);
        p.style.display = "inline";
        let statusNode = document.createTextNode(`(${statusMap[status].text})`);
        p.appendChild(statusNode);
        console.log(this.$refs.files[this.$refs.files.length - 1]);
        this.$refs.files[
          this.$refs.files.length - 1
        ].$el.children[1].children[3].appendChild(p);
      });
    },
    statusRemove(id) {
      this.$nextTick(() => {
        const dom = document.getElementsByClassName("myStatus_" + id);
        dom[0].parentNode.removeChild(dom[0]);
      });
    },

    error(msg) {
      this.$notify({
        title: "错误",
        message: msg,
        type: "error",
        duration: 2000,
      });
    },
  },
  watch: {},
  destroyed() {
    EventBus.$off("openUploader");
    EventBus.$off("showFileListDrawerSignal");
  },
  components: {},
};
</script>

<style scoped lang="less">
#global-uploader {
  position: fixed;
  z-index: 20;
  right: 15px;
  bottom: 15px;

  .uploader-app {
    width: 670px;
  }

  .file-panel {
    background-color: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 7px 7px 0 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .file-list {
    position: relative;
    height: 240px;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #fff;

    > li {
      background-color: #fff;
    }
  }

  .no-file {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
  }

  /deep/ .uploader-file-icon {
    &:before {
      content: "" !important;
    }
    width: auto;
    &[icon="image"] {
      background: url(../../assets/img/image-icon.png);
    }
    &[icon="video"] {
      background: url(../../assets/img/video-icon.png);
    }
    &[icon="document"] {
      background: url(../../assets/img/text-icon.png);
    }
  }

  /deep/ .uploader-file-actions > span {
    margin-right: 6px;
  }
  /deep/ .uploader-file-meta {
    width: 0;
  }
  /deep/ .uploader-file-name {
    text-indent: 0;
    width: 49%;
  }
  /deep/ .uploader-file-size {
    width: 16%;
  }
}

/* 隐藏上传按钮 */
#global-uploader-btn {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}
</style>