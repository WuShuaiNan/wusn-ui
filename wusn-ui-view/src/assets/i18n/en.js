// 英文
const en = {
  systemName: 'Wusn System',
  timeFormat: 'dd-MM-yyyy HH:mm:ss',
  // 登录页
  login: {
    footer: 'Power By Wusn',
    loginButton: 'Login',
    userIdPlaceholder: 'Account ID',
    passwordPlaceholder: 'Password',
  },
  // 首页
  home: {
    firstTab: 'Home',
    header: {
      refresh: 'Refresh',
      language: 'Language',
      help: 'Help',
      hello: 'Hello ',
      logout: 'Logout',
    },
    menu: {
      title: 'Main menu',
      video: {
        submenu: 'Monitoring Management',
        rtsp2flv: 'Monitoring',
      },
      system: {
        submenu: 'System Settings',
        role: 'Role',
        user: 'Account',
        passwordUpdate: 'Password Update',
      },
    },
  },
  // 监控管理
  video: {
    // 视频监控
    rtsp2flv: {
      button: {
        create: 'Create Monitoring',
        inspect: 'Inspect',
        edit: 'Edit',
        delete: 'Delete',
      },
      createForm: {
        title: 'Create',
        label: 'Monitoring Label',
        url: 'Monitoring URL',
        remark: 'Remark',
      },
      editForm: {
        title: 'Edit',
        label: 'Monitoring Label',
        url: 'Monitoring URL',
        remark: 'Remark',
      },
      table: {
        label: 'Monitoring Label',
        url: 'Monitoring URL',
        remark: 'Remark',
        operation: 'Operation',
      },
    },
  },
  // 系统设置
  system: {
    // 角色管理
    roleManager: {
      button: {
        create: 'Create Role',
        inspect: 'Inspect',
        edit: 'Edit',
        editMessage: 'The root role cannot be edited!',
        delete: 'Delete',
        deleteMessage: 'The root role cannot be deleted!',
      },
      createForm: {
        title: 'Create',
        id: 'Role ID',
        name: 'Role Name',
        enabled: 'Enabled',
        remark: 'Remark',
        permission: 'Permission',
      },
      editForm: {
        title: 'Edit',
        id: 'Role ID',
        name: 'Role Name',
        enabled: 'Enabled',
        remark: 'Remark',
        permission: 'Permission',
      },
      table: {
        id: 'Role ID',
        name: 'Role name',
        enabled: 'Enabled',
        remark: 'Remark',
        enable: 'Yes',
        notEnable: 'No',
      },
      transfer: {
        left: 'Unauthorized',
        right: 'Authorized',
      },
    },
    // 用户管理
    userManager: {
      button: {
        create: 'Create User',
        reset: 'Reset Password',
        edit: 'Edit',
        editMessage: 'The root user cannot be edited!',
      },
      createForm: {
        title: 'Create',
        id: 'User ID',
        displayName: 'User Name',
        enabled: 'Enabled',
        role: 'Role',
        password: 'Password',
        remark: 'Remark',
      },
      editForm: {
        title: 'Edit',
        id: 'User ID',
        displayName: 'User Name',
        enabled: 'Enabled',
        role: 'Role',
        remark: 'Remark',
      },
      resetForm: {
        title: 'Reset Password',
        id: 'User ID',
        newPassword: 'New Password',
      },
      table: {
        id: 'User ID',
        displayName: 'User Name',
        enabled: 'Enabled',
        remark: 'Remark',
        enable: 'Yes',
        notEnable: 'No',
      },
    },
    // 密码更新
    passwordUpdate: {
      oldPassword: 'Old password',
      newPassword: 'New password',
      confirmNewPassword: 'Confirm new password',
      submitButton: 'Submit',
      validate1: 'The new password cannot be the same as the old password!',
      validate2: 'The new password entered twice does not match!',
      validate3: 'Old password verification failed!',
      validate4: 'Successfully modified!',
      validate5: 'Unknown error!',
    },
  },
  // 404
  notFind: {
    message: 'The webmaster said that you can not enter this page...',
  },
  entityDelete: {
    message: 'This operation is irreversibl.<br>Go on?',
    title: 'Tip',
    confirm: 'Confirm',
    cancel: 'Cancel',
    successMessage: 'Successfully deleted!',
  },
};

export default en;
