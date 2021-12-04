<template lang="">
  <div id="allFiles">
    <a-table
      :loading="loading"
      :columns="columns"
      :data-source="allFileList"
      rowKey="name"
    >
      <span slot="size" slot-scope="size">{{ size | formatSize(size) }}</span>
    </a-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

import { EventBus } from "../../EventBus.js";

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
    sorter: (a, b) => a.size - b.size,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "创建日期",
    dataIndex: "lastModifiedDateTime",
    key: "lastModifiedDateTime",
    width: 200,
    sorter: (a, b) =>
      new Date(a.lastModifiedDateTime) - new Date(b.lastModifiedDateTime),
    sortDirections: ["descend", "ascend"],
  },
];

export default {
  name: "AllFiles",
  data() {
    return {
      columns,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["allFileList"]),
  },
  filters: {
    // 格式化文件大小
    formatSize(size) {
      let sizeM = size / 1024;
      sizeM = sizeM.toFixed(2);
      return `${sizeM} KB`;
    },
  },
  methods: {
    ...mapActions(["getAllFileList"]),
    // 获取所有文件
    getAllFiles() {
      this.loading = true;
      this.getAllFileList().then((res) => {
        this.loading = false;
      });
    },
  },
  created() {
    this.getAllFiles();
  },
  mounted() {
    EventBus.$on("loadDataSignal", () => this.getAllFiles());
  },
};
</script>
<style></style>
