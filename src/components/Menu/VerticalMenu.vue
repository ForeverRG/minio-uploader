<template>
  <div>
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['sub1']"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <a-sub-menu key="sub1">
        <span slot="title"
          ><a-icon type="file" /><span>全部文件</span></span
        >
        <a-menu-item key="5"> 图片 </a-menu-item>
        <a-menu-item key="6"> 文档 </a-menu-item>
        <a-menu-item key="7"> 视屏 </a-menu-item>
        <a-menu-item key="8"> 音乐 </a-menu-item>
        <a-menu-item key="9"> 其他 </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="1">
        <a-icon type="pie-chart" />
        <span>我的分享</span>
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="rest" />
        <span>回收站</span>
      </a-menu-item>
      <a-menu-item key="3">
        <a-icon type="inbox" />
        <span>收集文件</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>
