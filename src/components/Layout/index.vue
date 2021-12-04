<template>
  <a-layout class="layout" id="components-layout-demo-custom-trigger">
    <!-- 侧边栏开始 -->
    <a-layout-sider
      class="layout-sider"
      v-model="collapsed"
      :trigger="null"
      collapsible
    >
      <!-- logo -->
      <div class="logo">
        <router-link to="/"
          ><img
            class="quectel-logo"
            src="https://atehub.quectel.com:3004/img/logo_white.png"
            alt=""
            srcset=""
        /></router-link>
      </div>
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
        <!-- 折叠器 -->
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

        <a-menu
          mode="horizontal"
          style="line-height:63px;"
          forceSubMenuRender
          :selectable="false"
        >
          <a-sub-menu>
            <span slot="title" class="upload-submenu-title">上传列表</span>
            <a-menu-item key="0">
              <direct-upload-drawer />
            </a-menu-item>
            <a-menu-item key="1">
              <drawer></drawer>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-header>
      <!-- 头部结束 -->

      <!-- 主体开始 -->
      <a-layout-content
        id="layout-content"
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: 'max-content',
        }"
      >
        <!-- 子路由嵌套 -->
        <router-view />
      </a-layout-content>
      <!-- 主体结束 -->
    </a-layout>
  </a-layout>
</template>

<script>
import Avatar from "../avatar/Avatar.vue";
import DirectUploadDrawer from "../drawer/DirectUploadDrawer.vue";
import Drawer from "../drawer/Drawer.vue";
import HorizontalMenu from "../menu/HorizontalMenu.vue";
import VerticalMenu from "../menu/VerticalMenu.vue";

export default {
  name: "Layout",
  components: {
    HorizontalMenu,
    VerticalMenu,
    Avatar,
    Drawer,
    DirectUploadDrawer,
  },
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {},
  created() {},
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
  background: rgba(0, 0, 0, 0.2);
  margin: 16px;
  .quectel-logo {
    width: 100%;
  }
}
</style>
