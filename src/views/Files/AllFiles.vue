<template lang="">
  <div id="allFiles">
  <a-table :columns="columns" :data-source="allFileList" rowKey="name">
    <span slot="size" slot-scope="size">{{size | formatSize(size)}}</span>
  </a-table>
  </div>
</template>
<script>
import { mapActions,mapGetters } from "vuex";

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
  name: "AllFiles",
  data() {
    return {
      columns,
    };
  },
  created() {
    this.getAllFiles();
  },
  computed: {
    ...mapGetters(['allFileList'])
  },
  methods: {
    ...mapActions(['getAllFileList']),
    // 获取所有文件
    getAllFiles() {
      this.getAllFileList();
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