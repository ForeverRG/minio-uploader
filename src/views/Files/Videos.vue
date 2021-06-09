<template lang="">
  <div id="videos">
  <a-table :columns="columns" :data-source="data" rowKey="name">
    <span slot="size" slot-scope="size">{{size | formatSize(size)}}</span>
  </a-table>
  </div>
</template>
<script>
var baseUrl = "http://10.66.20.15:5000/api/";
var bucketName = "cain-test";

const columns = [
  {
    title: "文件名",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
  },
  {
    title: "文件类型",
    dataIndex: "type",
    key: "type",
    width: 100,
  },
  {
    title: "文件大小",
    dataIndex: "size",
    key: "size",
    width: 200,
    scopedSlots: { customRender: "size" },
  },
  {
    title: "创建日期",
    dataIndex: "lastModifiedDateTime",
    key: "lastModifiedDateTime",
    width: 200,
  },
];

export default {
  name: "Videos",
  data() {
    return {
      data: [],
      columns,
    };
  },
  created() {
    this.getVideos();
  },
  methods: {
    // 获取所有文件
    getVideos() {
      this.$http
        .get(`${baseUrl}MinioFile/files/${bucketName}?type=video`)
        .then((res) => {
          this.data = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  filters: {
    // 格式化文件大小
    formatSize(size) {
      let sizeM = size / 1024;
      sizeM = sizeM.toFixed(2);
      return `${sizeM} KB`;
    },
  },
};
</script>
<style>
</style>