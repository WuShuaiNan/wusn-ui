<template>
  <div>
    <el-submenu index="video">
      <template slot="title">
        <i class="el-icon-setting" style="color: black"/>
        <span>{{$t('home.menu.video.submenu')}}</span>
      </template>
      <!-- 视频监控 -->
      <el-menu-item
        index="/home/video/rtsp2flv"
        @click="selectMenu('/home/video/rtsp2flv', 'home.menu.video.rtsp2flv')"
      >
        <template slot="title">
          <i class="el-icon-postcard" style="color: black"/>
          <span>{{$t('home.menu.video.rtsp2flv')}}</span>
        </template>
      </el-menu-item>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'VideoMenu',
  computed: {
  },
  data() {
    return {
      // permissions: this.$ls.get('permissionInfo'),
    };
  },
  methods: {
    selectMenu(url, name) {
      this.$emit('selectMenu', url, name);
    },
  },
  mounted() {
  },
};
</script>

<style scoped lang="less">
</style>
