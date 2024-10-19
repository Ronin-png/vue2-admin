<template>
  <div style="width: 200px">
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['2']"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
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
    return {
      newDataList: this.getMenuList(this.$router.options.routes),
      collapsed: false,
      list: [
        {
          key: '1',
          title: 'Option 1',
        },
        {
          key: '2',
          title: 'Navigation 2',
          children: [
            {
              key: '2.1',
              title: 'Navigation 3',
              children: [{ key: '2.1.1', title: 'Option 2.1.1' }],
            },
          ],
        },
      ],
    };
  },

  created() {
    console.log('222', this.$router.options.routes) 
    console.log('5555', this.getMnueList)
  },

  methods: {
    // 递归处理路由数据
    getMenuList(routes) {
      debugger
      const newRoutes = []
      for (const items of routes) {
        if (items.name && !items.isHideMenu) {
          const newItems = {...items}
          delete items.children
          if (items.children && !items.hideChildrenMenu) {
            newItems.children = getMenuList(items.children)
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
      console.log('newRoutes', newRoutes)
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