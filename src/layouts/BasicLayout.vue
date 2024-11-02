<template>
  <div>
    <a-layout id="components-layout-demo-custom-trigger" style="min-height: 100vh">
      <a-layout-sider
        v-if="navLayout === 'left'" 
        v-model="collapsed" 
        collapsible 
        :trigger="null" 
        :theme="navTheme"
      >
        <SiderMenu/>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <HeaderPage/>
          <a-icon
            v-if="navLayout === 'left'" 
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <FooterPage/>
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <authorization :authority="['admin']">
      <DrawerPage/>
    </authorization>
  </div>
</template>

<script>
import HeaderPage from './HeaderPage.vue'
import SiderMenu from './SiderMenu.vue'
import FooterPage from './FooterPage.vue'
import DrawerPage from '../components/Drawer.vue'

export default {
  name: 'BasicLayout',
  data() {
    return {
      collapsed: false,
    }
  },
  components: {
    HeaderPage,
    SiderMenu,
    FooterPage,
    DrawerPage,
  },
  computed: {
      navTheme() {
       return this.$route.query.navTheme || 'dark'
      },
      navLayout() {
        return this.$route.query.navLayout || 'left'
      }
  },
}
</script>

<style scoped lang="less">
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
</style>