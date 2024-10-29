<template>
  <div style="width: 200px">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      theme="dark"
    >
      <template v-for="item in newDataList">
        <a-menu-item v-if="!item.children" :key="item.key">
          <a-icon type="pie-chart" />
          <span>{{ item.mate.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.key" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from '../layouts/Submenu'

export default {
  components: { 
    'sub-menu': SubMenu,
  },
  data() {
    const newDataList = this.getMenuList(this.$router.options.routes)
    return {
      collapsed: false,
      newDataList,
      selectedKeys: [],
      openKeys: [],
    };
  },

  created() {
    console.log('222', this.$router.options.routes) 
    console.log('5555', this.getMnueList)
  },

  watch: {
    openKeys: (val, oldVal) => {
      console.log('打开的数组', val)
    },
    selectedKeys: (val, oldVal) => {
      debugger
      console.log('选中的项', val)
    }
  },

  methods: {
    // 处理路由数据
    getMenuList(routes) {
      const newRoutes = []
      for (const items of routes) {
        if (items.name && !items.isHideMenu) {
          const newItems = {...items}
          delete newItems.children
          if (items.children && !items.hideChildrenMenu) {
            newItems.children = this.getMenuList(items.children)
          }
          newRoutes.push(newItems)
        } else if (
          !items.isHideMenu &&
          !items.hideChildrenMenu &&
          items.children
        ) {
          newRoutes.push(...this.getMenuList(items.children))
        }
      }
      return newRoutes
    },

    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
}
</script>

<style>
#components-layout-demo-siderMenu .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  font-size: 18px; 
  color: white; 
  text-align: center; 
  line-height: 32px; 
  overflow: hidden;
}
</style>