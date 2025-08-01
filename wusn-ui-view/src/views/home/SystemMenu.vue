<template>
  <div>
    <el-submenu index="system">
      <template slot="title">
        <i class="el-icon-setting" style="color: black"/>
        <span>{{$t('home.menu.system.submenu')}}</span>
      </template>
      <!-- 角色管理 -->
      <el-menu-item
        index="/home/system/role-manager"
        @click="selectMenu('/home/system/role-manager', 'home.menu.system.role')"
      >
        <template slot="title">
          <i class="el-icon-postcard" style="color: black"/>
          <span>{{$t('home.menu.system.role')}}</span>
        </template>
      </el-menu-item>
      <!-- 用户管理 -->
      <el-menu-item
        index="/home/system/user-manager"
        @click="selectMenu('/home/system/user-manager', 'home.menu.system.user')"
      >
        <template slot="title">
          <i class="el-icon-user-solid" style="color: black"/>
          <span>{{$t('home.menu.system.user')}}</span>
        </template>
      </el-menu-item>
      <!-- 密码修改 -->
      <el-menu-item
        index="/home/system/password-update"
        @click="selectMenu('/home/system/password-update', 'home.menu.system.passwordUpdate')"
      >
        <template slot="title">
          <i class="el-icon-lock" style="color: black"/>
          <span>{{$t('home.menu.system.passwordUpdate')}}</span>
        </template>
      </el-menu-item>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'SystemMenu',
  computed: {
  },
  data() {
    return {
      permissions: this.$ls.get('permissionInfo'),
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
