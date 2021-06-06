<template>
  <a-layout class="layout" id="components-layout-demo-custom-trigger">
    <!-- 侧边栏开始 -->
    <a-layout-sider
      class="layout-sider"
      v-model="collapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo" />
      <!-- 侧边栏菜单 -->
      <vertical-menu></vertical-menu>
    </a-layout-sider>
    <!-- 侧边栏结束 -->

    <a-layout>
      <!-- 头部开始 -->
      <a-layout-header
        class="layout-header"
        style="background: #fff; padding: 0"
      >
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />

        <!-- 头像 -->
        <avatar></avatar>
        <!-- 头部菜单 -->
        <horizontal-menu></horizontal-menu>
        <!-- 上传进度 -->
        <drawer></drawer>
        
      </a-layout-header>
      <!-- 头部结束 -->

      <!-- 主体开始 -->
      <a-layout-content
        id="layout-content"
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#ccc',
          minHeight: '280px',
        }"
      >
        Content
      </a-layout-content>
      <!-- 主体结束 -->
    </a-layout>
  </a-layout>
</template>

<script>
import Avatar from "../Avatar/Avatar.vue";
import Drawer from "../Drawer/Drawer.vue";
import HorizontalMenu from "../Menu/HorizontalMenu.vue";
import VerticalMenu from "../Menu/VerticalMenu.vue";

export default {
  name: "Layout",
  components: { HorizontalMenu, VerticalMenu, Avatar, Drawer },
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>

<style lang="less" scoped>
#components-layout-demo-custom-trigger .trigger {
  float: left;
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(236, 215, 215, 0.2);
  margin: 16px;
}
</style>