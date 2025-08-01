<template>
  <div class="container">
    <!--  PC端  -->
    <div class="pc-container hidden-xs-only hidden-sm-only">
      <el-form
        class="form"
        :model="form"
        :rules="formRules"
        ref="form"
      >
        <!-- 旧密码 -->
        <el-form-item
          prop="old_password"
          :label="$t('system.passwordUpdate.oldPassword').toString()"
        >
          <el-input v-model="form.old_password" show-password clearable/>
        </el-form-item>
        <!-- 新密码 -->
        <el-form-item
          prop="new_password"
          :label="$t('system.passwordUpdate.newPassword').toString()"
        >
          <el-input v-model="form.new_password" show-password clearable/>
        </el-form-item>
        <!-- 重复新密码 -->
        <el-form-item
          prop="confirm_new_password"
          :label="$t('system.passwordUpdate.confirmNewPassword').toString()"
        >
          <el-input v-model="form.confirm_new_password" show-password clearable/>
        </el-form-item>
        <!-- 提交按钮 -->
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            @click="handlePasswordUpdate"
          >
            {{$t('system.passwordUpdate.submitButton')}}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--  移动端  -->
    <div class="mobile-container  hidden-md-only hidden-lg-only hidden-xl-only">
      <el-form
        class="form"
        :model="form"
        :rules="formRules"
        ref="form"
      >
        <el-divider>
          <i class="el-icon-lock"/>
        </el-divider>
        <!-- 旧密码 -->
        <el-form-item
          prop="old_password"
          :label="$t('system.passwordUpdate.oldPassword').toString()"
        >
          <el-input v-model="form.old_password" show-password clearable/>
        </el-form-item>
        <!-- 新密码 -->
        <el-form-item
          prop="new_password"
          :label="$t('system.passwordUpdate.newPassword').toString()"
        >
          <el-input v-model="form.new_password" show-password clearable/>
        </el-form-item>
        <!-- 重复新密码 -->
        <el-form-item
          prop="confirm_new_password"
          :label="$t('system.passwordUpdate.confirmNewPassword').toString()"
        >
          <el-input v-model="form.confirm_new_password" show-password clearable/>
        </el-form-item>
        <!-- 提交按钮 -->
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            @click="handlePasswordUpdate"
          >
            {{$t('system.passwordUpdate.submitButton')}}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { updatePassword } from '@/api/system/basic';

export default {
  name: 'PasswordUpdate',
  data() {
    return {
      form: {
        account_key: this.$ls.get('loginInfo').account_key,
        old_password: '',
        new_password: '',
        confirm_new_password: '',
      },
      formRules: {
        old_password: [
          { required: true, message: this.$t('system.passwordUpdate.oldPassword').toString(), trigger: 'blur' },
        ],
        new_password: [
          { required: true, message: this.$t('system.passwordUpdate.newPassword').toString(), trigger: 'blur' },
        ],
        confirm_new_password: [
          { required: true, message: this.$t('system.passwordUpdate.confirmNewPassword').toString(), trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    handlePasswordUpdate() {
      // eslint-disable-next-line consistent-return
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.old_password !== this.form.new_password) {
            if (this.form.new_password === this.form.confirm_new_password) {
              updatePassword(this.form)
                .then((res) => {
                  if (res.meta.code === 1050) {
                    this.$message({
                      message: this.$t('system.passwordUpdate.validate3').toString(),
                      type: 'warning',
                    });
                  } else if (res.meta.code === 0) {
                    this.$message({
                      message: this.$t('system.passwordUpdate.validate4').toString(),
                      type: 'warning',
                    });
                  } else {
                    this.$message({
                      message: this.$t('system.passwordUpdate.validate5').toString(),
                      type: 'warning',
                    });
                  }
                });
            } else {
              this.$message({
                message: this.$t('system.passwordUpdate.validate2').toString(),
                type: 'warning',
              });
              return false;
            }
          } else {
            this.$message({
              message: this.$t('system.passwordUpdate.validate1').toString(),
              type: 'warning',
            });
            return false;
          }
        } else {
          return false;
        }
      });
    },
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
    .form {
      margin: 20px;
      width: 25%;
    }
  }

  .mobile-container {
    width: 100%;
    height: 100%;
    .form {
      padding: 20px;
      .button {
        margin-top: 20px;
        width: 100%;
      }
    }
  }
}
</style>
