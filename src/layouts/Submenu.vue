<template functional>
  <a-sub-menu :key="props.menuInfo.path">
    <span slot="title">
      <a-icon type="mail" />
      <span>{{ props.menuInfo.mate.title }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item v-if="!item.children" :key="item.path">
        <a-icon type="pie-chart" />
        <span>{{ item.mate.title }}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.path" :menu-info="item" />
    </template>
   </a-sub-menu>
</template>

<script lang="ts">
export default {
  props: ['menuInfo'],
  created() {
    debugger
    console.log('++++++++++', this.menuInfo)
  }
}
</script>

<style scoped lang="less">

</style>
