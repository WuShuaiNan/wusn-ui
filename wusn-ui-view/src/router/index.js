import Vue from 'vue';
import VueRouter from 'vue-router';

import { currentTimestamp } from '@/util/time';

Vue.use(VueRouter);

// 路由表
const routes = [
  // 默认路由
  {
    path: '/',
    redirect: '/home',
  },
  // home页路由
  {
    path: '/home',
    component: () => import('@/views/home/Home.vue'),
    // home页子路由
    children: [
      {
        path: '',
        redirect: '/home/welcome',
      },
      // 首页
      {
        name: 'welcome',
        path: 'welcome',
        component: () => import('@/views/welcome/Welcome.vue'),
      },
      // 帮助
      {
        path: 'readme',
        component: () => import('@/views/readme/Readme.vue'),
      },
      // 监控管理
      // 视频监控
      {
        path: 'video/rtsp2flv',
        component: () => import('@/views/video/VideoManager.vue'),
      },
      // 系统设置
      // 角色管理
      {
        path: 'system/role-manager',
        component: () => import('@/views/system/RoleManager.vue'),
      },
      // 账户管理
      {
        path: 'system/user-manager',
        component: () => import('@/views/system/UserManager.vue'),
      },
      // 密码更新
      {
        path: 'system/password-update',
        component: () => import('@/views/system/PasswordUpdate.vue'),
      },
    ],
  },
  // 登录页路由
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/video/rtsp2flv',
    component: () => import('@/views/video/VideoManager.vue'),
  },
  // 如果未命中路由规则，则全部跳转到404页面
  {
    path: '*',
    component: () => import('@/views/404/404.vue'),
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

// 添加用于检测登录信息的路由守卫
router.beforeEach((to, from, next) => {
  // 如果目标路径为登录，则不用进行登录信息检测
  if (to.path === '/login') {
    next();
    return;
  }
  if (to.path === '/video/rtsp2flv') {
    next();
    return;
  }
  // 从缓存中读取登录信息
  // noinspection JSUnresolvedVariable
  const loginInfo = Vue.ls.get('loginInfo');
  // 如果登录信息不存在，直接跳转到登录界面
  if (loginInfo == null) {
    next({ path: '/login' });
    return;
  }
  // 如果登录信息已经过期，直接跳转到登录界面
  // noinspection JSUnresolvedVariable
  if (currentTimestamp() > loginInfo.expire_date) {
    next({ path: '/login' });
    return;
  }
  // 通过登录信息检测，继续访问目标页面
  next();
});

export default router;
