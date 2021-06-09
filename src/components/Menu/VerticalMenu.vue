<template>
  <div>
    <a-menu
      :default-selected-keys="[selectedItemKey]"
      :default-open-keys="['sub1']"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="file" /><span>全部文件</span></span>
        <a-menu-item
          v-for="subMenuItem in subMenuItems"
          :key="subMenuItem.key"
          @click="saveSelectedItemKey"
        >
          <router-link :to="subMenuItem.linkTo">{{
            subMenuItem.name
          }}</router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item v-for="menuItem in menuItems" :key="menuItem.key" @click="saveSelectedItemKey">
        <a-icon :type="menuItem.iconType" />
        <span>{{ menuItem.name }}</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subMenuItems: [
        {
          key: "1",
          name: "所有",
          linkTo: "AllFiles",
        },
        {
          key: "2",
          name: "文档",
          linkTo: "Documents",
        },
        {
          key: "3",
          name: "视频",
          linkTo: "Videos",
        },
        {
          key: "4",
          name: "音乐",
          linkTo: "Music",
        },
        {
          key: "5",
          name: "图片",
          linkTo: "Images",
        },
        {
          key: "6",
          name: "其他",
          linkTo: "Other",
        },
      ],
      menuItems: [
        {
          key: "7",
          iconType: "pie-chart",
          name: "我的分享",
        },
        {
          key: "8",
          iconType: "rest",
          name: "回收站",
        },
        {
          key: "9",
          iconType: "inbox",
          name: "收集文件",
        },
      ],
      selectedItemKey: "",
      collapsed: false,
    };
  },
  created() {
    this.selectedItemKey =
      window.sessionStorage.getItem("selectedItemKey") || "1";
  },

  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },

    // 保存激活的item到sessionStorage
    saveSelectedItemKey({ item, key, keyPath }) {
      this.selectedItemKey = `${key}`;
      window.sessionStorage.setItem("selectedItemKey", `${key}`);
    },
  },
};
</script>
