<template>
  <div class="container">
    <div class="change-language">
      <el-dropdown
        style="margin-right: 20px"
        @command="changeLanguage">
        <el-button
          type="text"
          style="color: white"
        >
          <i class="iconfont" style="font-size: 25px;color: black">{{'\uffd7'}}</i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="zh">中文</el-dropdown-item>
          <el-dropdown-item command="en">English</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!--  PC端  -->
    <div class="pc-container hidden-xs-only hidden-sm-only">
      <!-- 背景图 -->
      <el-image class="background" :src="img.pcBackground" fit="fill"/>
      <!-- 主内容区 -->
      <div class="main">
        <!-- 登陆面板 -->
        <el-card
          class="box-card"
          shadow="hover"
          :body-style="loginCardBodyStyle"
        >
          <el-row style="height: 100%">
            <!-- 登陆面板-动画 -->
            <el-col :span="12" style="height: 100%; border-right: 1px dashed gray">
              <div class="animation-title">{{ $t('systemName') }}</div>
              <div class="animation-lottie" id="animation"/>
            </el-col>
            <!-- 登陆面板-表单 -->
            <el-col :span="12" style="height: 100%">
              <div class="login-form-title">Welcome</div>
              <div class="login-form">
                <el-form
                  ref="form"
                  :model="loginForm"
                  :rules="loginFormRules"
                >
                  <el-form-item prop="account_key.string_id">
                    <el-input
                      v-model="loginForm.account_key.string_id"
                      size="small"
                      :placeholder="$t('login.userIdPlaceholder')"
                      clearable
                    />
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input
                      v-model="loginForm.password"
                      size="small"
                      show-password
                      :placeholder="$t('login.passwordPlaceholder')"
                      clearable
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="primary"
                      size="small"
                      style="width: 100%"
                      @click="login"
                    >
                      {{ $t('login.loginButton') }}
                    </el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <!-- 注脚 -->
      <div class="footer">
        <el-link type="info" disabled>{{$t('login.footer')}}</el-link>
      </div>
    </div>
    <!--  移动端  -->
    <div class="mobile-container hidden-md-only hidden-lg-only hidden-xl-only">
      <!--  背景图 -->
      <el-image class="background" :src="img.mobileBackground" fit="fill"/>
      <!-- 主内容区 -->
      <div class="main">
        <!-- 登陆面板 -->
        <el-card class="box-card" :body-style="loginCardBodyStyle">
          <!-- 登陆面板-表单标题 -->
          <div class="login-form-title"> {{$t('systemName')}}</div>
          <!-- 登陆面板-表单 -->
          <div class="login-form">
            <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="loginFormRules"
            >
              <el-form-item prop="account_key.string_id">
                <el-input
                  v-model="loginForm.account_key.string_id"
                  size="medium"
                  :placeholder="$t('login.userIdPlaceholder')"
                  clearable
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="loginForm.password"
                  size="medium"
                  show-password
                  :placeholder="$t('login.passwordPlaceholder')"
                  clearable
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  size="medium"
                  style="width: 100%"
                  @click="login"
                >
                  {{ $t('login.loginButton') }}
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
      <!-- 注脚 -->
      <div class="footer">
        <el-link type="info" disabled style="font-size: 10px">{{$t('login.footer')}}</el-link>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/img/login/logo.png';
import pcBackground from '@/assets/img/login/pcBackground.png';
import mobileBackground from '@/assets/img/login/mobileBackground.png';
import loginLottie from '@/assets/img/login/login.json';
import lottie from 'lottie-web';

import resolveResponse from '@/util/response';
import { login, myPermissions } from '@/api/system/basic';

export default {
  name: 'Login',
  data() {
    return {
      img: {
        logo,
        pcBackground,
        mobileBackground,
      },
      loginCardBodyStyle: {
        padding: 0,
        height: '100%',
      },
      loginForm: {
        account_key: {
          string_id: '',
        },
        password: '',
      },
      loginFormRules: {
        account_key: {
          string_id: [
            { required: true, message: this.$t('login.userIdPlaceholder').toString(), trigger: 'blur' },
          ],
        },
        password: [
          { required: true, message: this.$t('login.passwordPlaceholder').toString(), trigger: 'blur' },
        ],
      },
      animation: {},
    };
  },
  methods: {
    login() {
      // eslint-disable-next-line consistent-return
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          resolveResponse(this, login(this.loginForm))
            .then((res) => {
              // 获取登录信息，并缓存
              this.$ls.set('loginInfo', res);
              return resolveResponse(this, myPermissions());
            })
            .then((res) => {
              // 获取登录用户的授权信息，并缓存
              // noinspection JSUnresolvedVariable
              this.$ls.set('permissionInfo', res);
            })
            .then(() => {
              // 判断是否存在活动菜单索引缓存。
              // 如存在，不进行任何操作。
              // 如不存在，则设置活动菜单索引为空字符串，以避免Element UI报错。
              // noinspection JSUnresolvedVariable
              const activeMenuIndex = this.$ls.get('activeMenuIndex');
              if (activeMenuIndex === undefined || activeMenuIndex === null) {
                // noinspection JSUnresolvedVariable
                this.$ls.set('activeMenuIndex', '');
              }
            })
            .then(() => {
              // 判断标签页数组缓存是否存在
              // 如果存在，则不进行任何操作
              // 如果不存在，则初始化标签页数组缓存
              // noinspection JSUnresolvedVariable
              const tabs = this.$ls.get('tabs');
              if (tabs === undefined || tabs === null || tabs === '') {
                // noinspection JSUnresolvedVariable
                this.$ls.set('tabs', [{ title: 'home.firstTab', name: '/home/welcome' }]);
              }
            })
            .then(() => {
              // 判断当前标签页缓存是否存在
              // 如果存在，则跳转到该标签页
              // 如果不存在，则初始化当前标签页，并跳转到欢迎页
              // noinspection JSUnresolvedVariable
              const tabName = this.$ls.get('tabName');
              if (tabName === undefined || tabName === null || tabName === '') {
                // noinspection JSUnresolvedVariable
                this.$ls.set('tabName', '/home/welcome');
                this.$router.push('/home/welcome');
              } else {
                this.$router.push(tabName);
              }
            });
        } else {
          return false;
        }
      });
    },
    changeLanguage(language) {
      this.$ls.set('locale', language);
      this.$i18n.locale = language;
    },
  },
  mounted() {
    this.animation = lottie.loadAnimation({
      container: document.getElementById('animation'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: loginLottie,
    });
    this.animation.play();
  },
  beforeDestroy() {
    this.animation.destroy();
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;

  .change-language {
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: right;
    align-items: center;
  }

  .pc-container {
    width: 100%;
    height: 95%;

    .background {
      margin: 0 0 0 0;
      padding: 0 0 0 0;
      position: fixed;
      right: 0;
      bottom: 0;
      min-width: 100%;
      min-height: 100%;
      height: 100%;
      width: 100%;
      z-index: -11;
    }

    .main {
      width: 100%;
      height: 95%;
      display: flex;
      justify-content: center;
      align-items: center;

      .box-card {
        width: 600px;
        height: 400px;
        border-radius: 10px;

        .animation-title {
          width: 100%;
          height: 30%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 30px;
          font-family: 'loginTitle', serif;
        }

        .animation-lottie {
          width: 100%;
          height: 70%;
        }

        .login-form-title {
          width: 100%;
          height: 30%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 50px;
          font-family: 'loginTitle', serif;
        }

        .login-form {
          width: 100%;
          height: 70%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .footer {
      width: 100%;
      height: 5%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .mobile-container {
    width: 100%;
    height: 95%;

    .background {
      margin: 0 0 0 0;
      padding: 0 0 0 0;
      position: fixed;
      right: 0;
      bottom: 0;
      min-width: 100%;
      min-height: 100%;
      height: 100%;
      width: 100%;
      z-index: -11;
    }

    .main {
      width: 100%;
      height: 95%;
      display: flex;
      justify-content: center;
      align-items: center;

      .box-card {
        width: 70%;
        height: 40%;
        border-radius: 10px;

        .login-form-title {
          width: 100%;
          height: 25%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 30px;
          font-family: 'loginTitle', serif;
        }

        .login-form {
          width: 100%;
          height: 75%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .footer {
      width: 100%;
      height: 5%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
