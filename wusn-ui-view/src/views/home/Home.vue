<template>
  <div class="container">
    <!--  PC端  -->
    <div class="pc-container hidden-xs-only hidden-sm-only">
      <!-- 头部 -->
      <div class="header">
        <el-row :gutter="10" style="width: 100%;height: 100%;">
          <!-- logo -->
          <el-col class="logo" :span="4" style="height: 100%">
            <el-image :src="img.logo" fit="scale-down"/>
          </el-col>
          <!-- 系统名称 -->
          <el-col :span="9" style="height: 100%">
            <p class="title">{{$t('systemName')}}</p>
          </el-col>
          <!-- 操作按钮栏1 -->
          <el-col :span="6" style="height: 100%">
            <el-breadcrumb separator="|" style="height: 100%;margin: 0;">
              <!-- 刷新 -->
              <el-breadcrumb-item class="breadcrumb">
                <el-button
                  class="button"
                  @click="refresh"
                >
                  <i class="iconfont">&#xe607;</i>
                  {{$t('home.header.refresh')}}
                </el-button>
              </el-breadcrumb-item>
              <!-- 语言 -->
              <el-breadcrumb-item class="breadcrumb">
                <el-dropdown
                  @command="changeLanguage">
                  <el-button
                    class="button"
                  >
                    <i class="iconfont">&#xffd7;</i>
                    {{$t('home.header.language')}}
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="zh">中文</el-dropdown-item>
                    <el-dropdown-item command="en">English</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-breadcrumb-item>
              <!-- 帮助 -->
              <el-breadcrumb-item class="breadcrumb">
                <el-button
                  class="button"
                  @click="handleHelp"
                >
                  <i class="iconfont">&#xe6a5;</i>
                  {{$t('home.header.help')}}
                </el-button>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <!-- 操作按钮栏2 -->
          <el-col :span="5" style="height: 100%">
            <el-breadcrumb separator="|" style="height: 100%;margin: 0;">
              <!-- 当前用户 -->
              <el-breadcrumb-item class="breadcrumb">
                <el-button
                  class="button"
                >
                  <i class="iconfont">&#xe646;</i>
                  {{$t('home.header.hello')}}
                  {{ account_id }}
                </el-button>
              </el-breadcrumb-item>
              <!-- 注销 -->
              <el-breadcrumb-item class="breadcrumb">
                <el-button
                  class="button"
                  @click="handleLogout"
                >
                  <i class="iconfont">&#xe6ac;</i>
                  {{$t('home.header.logout')}}
                </el-button>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row>
      </div>
      <!-- 主内容区 -->
      <div class="main">
        <el-container style="height: 100%;">
          <el-aside width="15%" style="height: 100%;">
            <!-- 菜单 -->
            <main-menu :active-menu-index="activeMenuIndex" @selectMenu="selectMenu"/>
          </el-aside>
          <el-main style="width: 87.5%;margin-left: 0.5%;background-color: white;padding: 0;">
            <el-tabs
              class="tabs"
              v-model="tabName"
              type="card"
              :closable="true"
              @tab-click="clickTab"
              @tab-remove="removeTab"
              style="height: 40px;"
            >
              <el-tab-pane
                style="height: 0"
                v-for="(item) in tabs"
                :key="item.name"
                :label="$t(item.title).toString()"
                :name="item.name"
              />
            </el-tabs>
            <router-view v-if="isLargeScreen" style="width: 100%;height: calc(100% - 40px)"/>
          </el-main>
        </el-container>
      </div>
    </div>
    <!--  移动端  -->
    <div class="mobile-container hidden-md-only hidden-lg-only hidden-xl-only">
      <!-- 头部 -->
      <van-sticky>
        <div class="header">
        <el-row style="height: 100%;">
          <!-- 菜单展示按钮 -->
          <el-col :span="3">
            <el-button
              class="button"
              @click="menuVisible=!menuVisible"
              icon="el-icon-s-unfold"/>
          </el-col>
          <!-- 国际化按钮 -->
          <el-col :span="3" :offset="15">
              <el-dropdown
                @command="changeLanguage">
                <el-button
                  class="button"
                >
                  <i class="iconfont">&#xffd7;</i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="zh">中文</el-dropdown-item>
                  <el-dropdown-item command="en">English</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
          </el-col>
          <!-- 用户头像按钮 -->
          <el-col :span="3" >
            <el-dropdown
              @command="handleAvatarClick"
              :hide-on-click="false"
            >
              <el-button
                class="button"
              >
                <i class="el-icon-user-solid"/>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <!-- 欢迎语 -->
                <el-dropdown-item disabled>
                  {{$t('home.header.hello')}} {{ account_id }}
                </el-dropdown-item>
                <!-- 帮助按钮 -->
                <el-dropdown-item command="help">
                  {{$t('home.header.help')}}
                </el-dropdown-item>
                <!-- 注销按钮 -->
                <el-dropdown-item command="logout">
                  {{$t('home.header.logout')}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </div>
      </van-sticky>
      <!-- 菜单 -->
      <van-popup
        v-model="menuVisible"
        class="drawer"
        position="left"
        style="height: 100%;weight: 60%;"
      >
        <!-- 菜单 -->
        <main-menu :active-menu-index="activeMenuIndex" @selectMenu="selectMenu"/>
      </van-popup>
      <!-- 主内容区 -->
      <div class="main">
        <router-view v-if="!isLargeScreen" style="height: 100%;width: 100%;"/>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/img/home/logo.png';
import resolveResponse from '@/util/response';
import { logout, postpone } from '@/api/system/basic';
import { clone } from '@/util/objects';

import MainMenu from '@/views/home/MainMenu.vue';

export default {
  name: 'Home',
  components: {
    MainMenu,
  },
  data() {
    return {
      img: {
        logo,
      },
      account_id: this.$ls.get('loginInfo').account_key.string_id,
      loginKeeper: null,
      scrollbarOption: {
        className: 'os-theme-light',
        callbacks: {
        },
      },
      activeMenuIndex: this.$ls.get('activeMenuIndex'),
      tabName: this.$ls.get('tabName'),
      tabs: this.$ls.get('tabs'),
      menuVisible: false,
      isLargeScreen: true,
      routerViewVisible: false,
    };
  },
  methods: {
    keepLogin() {
      // 通过调用postpone接口，保持账号登录状态
      this.loginKeeper = setInterval(() => {
        // noinspection JSUnresolvedVariable
        if (this.$ls.get('loginInfo') == null) {
          return;
        }
        resolveResponse(this, postpone(this.$ls.get('loginInfo').key))
          .then((res) => {
            this.$ls.set('loginInfo', res);
          });
      }, 1000 * 60 * 5);
    },
    refresh() {
      this.$router.go(0);
    },
    handleLogout() {
      const longIdKey = {
        long_id: this.$ls.get('loginInfo').key.long_id,
      };
      resolveResponse(this, logout(longIdKey))
        .then(() => {
          // noinspection JSUnresolvedVariable
          this.$ls.remove('loginInfo');
          // noinspection JSUnresolvedVariable
          this.$ls.remove('permissionInfo');
          this.$router.push({ path: '/login' });
        });
    },
    handleHelp() {
      this.$message({
        showClose: true,
        message: '功能开发中，敬请期待！',
      });
    },
    handleAvatarClick(command) {
      switch (command) {
        case 'help':
          this.handleHelp();
          break;
        case 'logout':
          this.handleLogout();
          break;
        default:
          this.$message({
            showClose: true,
            message: '系统错误！请联系开发人员！',
            type: 'error',
          });
      }
    },
    handleClientHeight() {
      const height = clone(document.body.clientWidth, true); // 使用深克隆，以避免对原型链产生影响
      this.isLargeScreen = height > 992;
    },
    changeLanguage(language) {
      this.$ls.set('locale', language);
      this.$i18n.locale = language;
    },
    selectMenu(url, name) {
      this.activeMenuIndex = url;
      this.tabName = url;
      let isTabIncluded = false;
      this.tabs.forEach((tab) => {
        if (tab.name === url) {
          isTabIncluded = true;
        }
      });
      if (!isTabIncluded) {
        this.tabs.push({ title: name, name: url });
      }
      this.$ls.set('activeMenuIndex', this.activeMenuIndex);
      this.$ls.set('tabName', this.tabName);
      this.$ls.set('tabs', this.tabs);
    },
    clickTab(tab) { // 点击标签页时，触发本函数
      if (this.$route.path !== tab.name) {
        this.$router.push(tab.name);
        this.activeMenuIndex = tab.name;
        this.tabName = tab.name;
        this.$ls.set('activeMenuIndex', this.activeMenuIndex);
        this.$ls.set('tabName', this.tabName);
      }
    },
    removeTab(tab) { // 关闭标签页时，触发本函数
      if (tab !== '/home/welcome') {
        let activeMenuIndex = ''; // 设置当前菜单
        let tabName = ''; // 设置当前标签页
        const tabs = []; // 设置标签页数组
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < this.tabs.length; i++) {
          if (this.tabs[i].name !== tab) {
            tabs.push(this.tabs[i]);
          } else {
            activeMenuIndex = this.tabs[i - 1].name;
            tabName = this.tabs[i - 1].name;
            this.$router.push(this.tabs[i - 1].name);
          }
        }
        this.activeMenuIndex = activeMenuIndex;
        this.tabName = tabName;
        this.tabs = tabs;
        this.$ls.set('activeMenuIndex', this.activeMenuIndex);
        this.$ls.set('tabName', this.tabName);
        this.$ls.set('tabs', this.tabs);
      }
    },
  },
  mounted() {
    this.keepLogin();
  },
  created() {
    // 在Vue实例创建完，页面尚未渲染时，计算客户端高度，判断使用哪个router-view
    this.handleClientHeight();
  },
  updated() {
    // 在Vue实例更新完，页面尚未渲染时，计算客户端高度，判断使用哪个router-view
    this.handleClientHeight();
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  .pc-container {
    width: 100%;
    height: 100%;
    background-color: #DCDFE6;
    .header {
      width: 100%;
      height: 5%;
      background-color: #3079c1;
      .logo {
        display:flex;
        justify-content:center;
        align-items:center;
      }
      .title {
        font-weight: bold;
        font-size: 20px;
        line-height: 10px;
        letter-spacing: 5px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        color: white;
      }
      .breadcrumb {
        height: 100%;
        display:flex;
        justify-content:center;
        align-items:center;
        .button {
          color: white;
          background-color: #3079c1;
          border: 0;
          padding: 0;
          .iconfont {
            font-size: 14px;
          }
        }
      }
    }
    .main {
      margin-top: 0.5%;
      width: 100%;
      height: 94%;
      .tabs>.el-tabs__header {
        padding: 0;
        position: relative;
        margin: 0;
      }
    }
  }
  .mobile-container {
    width: 100%;
    height: 100%;
    .header {
      width: 100%;
      background-color: #ecf5ff;
      .button {
        width: 100%;
        height: 100%;
        font-size: 30px;
        border: 0;
        background-color: #ecf5ff;
        padding: 10px;
        .iconfont {
          font-size: 30px;
        }
      }
    }
    .main {
      width: 100%;
      height: calc(100% - 51px);
    }
  }
}
.el-tabs__header {
  padding: 0;
  position: relative;
  margin: 0;
}
</style>
