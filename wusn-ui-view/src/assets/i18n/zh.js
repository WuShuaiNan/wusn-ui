// 中文
const zh = {
  systemName: 'Wusn System',
  timeFormat: 'yyyy-MM-dd HH:mm:ss',
  // 登录页
  login: {
    footer: 'Power By Wusn',
    loginButton: '登录',
    userIdPlaceholder: '请输入账户ID',
    passwordPlaceholder: '请输入密码',
  },
  // 首页
  home: {
    firstTab: '首页',
    header: {
      refresh: '刷新',
      language: '语言',
      help: '帮助',
      hello: '您好：',
      logout: '注销',
    },
    menu: {
      title: '主菜单',
      video: {
        submenu: '监控管理',
        rtsp2flv: '视频监控',
      },
      system: {
        submenu: '系统设置',
        role: '角色管理',
        user: '用户管理',
        passwordUpdate: '密码更新',
      },
    },
  },
  // 监控管理
  video: {
    // 视频监控
    rtsp2flv: {
      button: {
        create: '新增视频监控',
        inspect: '查看',
        edit: '编辑',
        delete: '删除',
      },
      createForm: {
        title: '新增',
        label: '监控名称',
        url: '监控地址',
        remark: '备注',
      },
      editForm: {
        title: '编辑',
        label: '监控名称',
        url: '监控地址',
        remark: '备注',
      },
      table: {
        label: '监控名称',
        url: '监控地址',
        remark: '备注',
        operation: '操作',
      },
    },
  },
  // 系统设置
  system: {
    // 角色管理
    roleManager: {
      button: {
        create: '新增角色',
        inspect: '查看',
        edit: '编辑',
        editMessage: '管理员角色不允许编辑！',
        delete: '删除',
        deleteMessage: '管理员角色不允许删除！',
      },
      createForm: {
        title: '新增',
        id: '角色ID',
        name: '角色名称',
        enabled: '是否启用',
        remark: '备注',
        permission: '角色权限',
      },
      editForm: {
        title: '编辑',
        id: '角色ID',
        name: '角色名称',
        enabled: '是否启用',
        remark: '备注',
        permission: '角色权限',
      },
      table: {
        id: '角色ID',
        name: '角色名称',
        enabled: '是否启用',
        remark: '备注',
        enable: '启用',
        notEnable: '未启用',
      },
      transfer: {
        left: '未授权',
        right: '已授权',
      },
    },
    // 用户管理
    userManager: {
      button: {
        create: '新增用户',
        reset: '重置密码',
        edit: '编辑',
        editMessage: '管理员用户不允许编辑！',
      },
      createForm: {
        title: '新增',
        id: '用户ID',
        displayName: '用户名称',
        enabled: '是否启用',
        role: '角色',
        password: '密码',
        remark: '备注',
      },
      editForm: {
        title: '编辑',
        id: '用户ID',
        displayName: '用户名称',
        enabled: '是否启用',
        role: '角色',
        remark: '备注',
      },
      resetForm: {
        title: '重设密码',
        id: '用户ID',
        newPassword: '新密码',
      },
      table: {
        id: '用户ID',
        displayName: '用户名称',
        enabled: '是否启用',
        remark: '备注',
        enable: '启用',
        notEnable: '未启用',
      },
    },
    // 密码更新
    passwordUpdate: {
      oldPassword: '旧密码',
      newPassword: '新密码',
      confirmNewPassword: '重复新密码',
      submitButton: '提交',
      validate1: '新密码不能与旧密码一样！',
      validate2: '两次输入的新密码不一致！',
      validate3: '旧密码验证失败！',
      validate4: '修改成功！',
      validate5: '未知错误！',
    },
  },
  // 404
  notFind: {
    message: '达娃里氏说你不应该来到这里。。。',
  },
  entityDelete: {
    message: '此操作将永久删除此工单。<br>是否继续?',
    title: '提示',
    confirm: '确定',
    cancel: '取消',
    successMessage: '删除成功',
  },
};

export default zh;
