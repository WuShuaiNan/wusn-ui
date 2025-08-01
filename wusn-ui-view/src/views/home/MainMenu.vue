<template>
  <el-scrollbar style="height: 100%;" wrap-style="overflow-x:hidden;">
    <!-- 菜单 -->
    <el-menu
      ref="menu"
      text-color="black"
      active-text-color="#409EFF"
      :default-active="activeMenuIndex"
      :router="true"
      :unique-opened="true"
      style="border-right: 0"
    >
<!--      <energy-monitoring-menu @selectMenu="selectMenu"/>-->
      <!-- 视频监控 -->
      <video-menu @selectMenu="selectMenu"/>
      <!-- 系统设置 -->
      <system-menu @selectMenu="selectMenu"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import VideoMenu from '@/views/home/VideoMenu.vue';
import SystemMenu from '@/views/home/SystemMenu.vue';

export default {
  name: 'MainMenu',
  components: {
    VideoMenu,
    SystemMenu,
  },
  props: {
    activeMenuIndex: {
      type: String,
      default: '',
    },
  },
  methods: {
    selectMenu(url, name) {
      this.$emit('selectMenu', url, name);
    },
  },
};
</script>

<style scoped lang="less">

</style>
