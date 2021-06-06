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
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="video-camera" />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload" />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <!-- 侧边栏结束 -->
    <a-layout>
      <!-- 头部开始 -->
      <a-layout-header
        class="layout-header"
        style="background: pink; padding: 0"
      >
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
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
export default {
  name: "Layout",
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>

<style lang="less" scoped>
#components-layout-demo-custom-trigger .trigger {
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