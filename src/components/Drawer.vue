<template>
  <div class="drawer-content">
    <a-button type="primary" @click="showDrawer">Open</a-button>
    <a-drawer
      title="主题定制"
      placement="right"
      :closable="false"
      :visible="visible"
      @close="onClose"
    >
      <template v-solt:handle>
        <div class="handle" @click="visible = !visible">
          <a-icon style="color: #fff; font-size: 20px" :type="visible ? 'left' : 'setting'"></a-icon>
        </div>
      </template>
      <div>
        <div>主题风格</div>
        <a-radio-group 
          name="radioGroup" 
          :default-value="$route.query.type" 
          @change= "e => onChange('navTheme', e.target.value)"
        >
          <a-radio value="dark">黑色</a-radio>
          <a-radio value="light">白色</a-radio>
        </a-radio-group>
      </div>
      <div>
        <div>导航模式</div>
        <a-radio-group 
          name="radioGroup" 
          :default-value="$route.query.type"  
          @change= "e => onChange('navLayout', e.target.value)"
        >
          <a-radio value="left">侧边</a-radio>
          <a-radio value="top">顶部</a-radio>
        </a-radio-group>
      </div>
    </a-drawer>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DrawerPage',
  data: () => {
    return {
      visible: false,
      value: 1,
    }
  },
  methods: {
    afterVisibleChange(val: string) {
      console.log('visible', val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    onChange(type: string, value: string) {
      this.$router.push({ query: { ...this.$route.query, [type]: value } }).catch(() => {console.log('error')})
    }
  }
}
</script>

<style>
.ant-drawer-content {
  position: relative;
  z-index: 1;
  overflow: inherit;
  background-color: #fff;
  background-clip: padding-box;
  border: 0;
}
.ant-drawer-content-wrapper .ant-drawer-body .handle {
  position: absolute;
  right: 256px;
  width: 70px;
  height: 70px;
  text-align: center;
  line-height: 70px;
  background: #207ddd;
}
</style>
