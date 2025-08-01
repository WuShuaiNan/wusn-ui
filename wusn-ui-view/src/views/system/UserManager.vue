<template>
  <div class="container">
    <!--  PC端  -->
    <div class="pc-container hidden-xs-only hidden-sm-only">
      <el-container style="height: 100%">
        <!-- 操作栏 -->
        <el-header height="5%" class="header">
          <el-button-group>
            <el-button
              type="primary"
              size="small"
              @click="createVisible = true"
            >
              {{ $t('system.userManager.button.create') }}
            </el-button>
          </el-button-group>
        </el-header>
        <!-- 表格 -->
        <el-main class="main">
          <el-table
            class="table"
            :data="tableData"
            stripe
            border
            highlight-current-row
            height="100%"
          >
            <el-table-column
              prop="key.string_id"
              :label="$t('system.userManager.table.id').toString()"
            />
            <el-table-column
              prop="display_name"
              :label="$t('system.userManager.table.displayName').toString()"
            />
            <el-table-column
              prop="enabled"
              :formatter="enabledFormatter"
              :label="$t('system.userManager.table.enabled').toString()"
            />
            <el-table-column
              prop="remark"
              :label="$t('system.userManager.table.remark').toString()"
            />
            <el-table-column width="120">
              <template slot-scope="scope">
                <el-button-group>
                  <!-- 编辑  -->
                  <el-tooltip
                    effect="dark"
                    :content="$t('system.userManager.button.edit').toString()"
                    placement="top"
                  >
                    <el-button
                      class="table-button"
                      size="medium"
                      type="text"
                      @click="handleEdit(scope.$index, scope.row)"
                    >
                      <i class="el-icon-edit" style="color: #409EFF;font-weight: bold"/>
                    </el-button>
                  </el-tooltip>
                  <!-- 重置密码  -->
                  <el-tooltip
                    effect="dark"
                    :content="$t('system.userManager.button.reset').toString()"
                    placement="top"
                  >
                    <el-button
                      class="table-button"
                      size="medium"
                      type="text"
                      @click="handleReset(scope.$index, scope.row)"
                    >
                      <i class="el-icon-key" style="color: #409EFF;font-weight: bold"/>
                    </el-button>
                  </el-tooltip>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
        <!-- 分页 -->
        <el-footer height="5%" class="footer">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[15, 20, 30, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="entityCount"/>
        </el-footer>
      </el-container>
      <!-- 新增弹出框 -->
      <el-dialog
        :title="$t('system.userManager.createForm.title').toString()"
        :visible.sync="createVisible"
        width="50%"
        @closed="handleCreateDialogClose"
      >
        <!-- 表单 -->
        <el-form
          ref="createForm"
          :model="createForm"
          :rules="createFormRules"
          label-width="80px"
        >
          <el-form-item
            prop="account_key.string_id"
            :label="$t('system.userManager.createForm.id').toString()"
          >
            <el-input
              v-model="createForm.account_key.string_id"
              clearable
            />
          </el-form-item>
          <el-form-item
            prop="display_name"
            :label="$t('system.userManager.createForm.displayName').toString()"
          >
            <el-input
              v-model="createForm.display_name"
              clearable
            />
          </el-form-item>
          <el-form-item
            :label="$t('system.userManager.createForm.enabled').toString()"
          >
            <el-switch
              v-model="createForm.enabled"
              active-color="#13ce66"
              inactive-color="#ff4949"/>
          </el-form-item>
          <el-form-item
            :label="$t('system.userManager.createForm.role').toString()"
          >
            <el-select
              v-model="selectRoles"
              multiple
              collapse-tags
            >
              <el-option
                v-for="item in allRoles"
                :key="item.key.string_id"
                :label="item.name"
                :value="item.key.string_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('system.userManager.createForm.password').toString()"
          >
            <el-input
              v-model="createForm.password"
              show-password
              clearable
            />
          </el-form-item>
          <el-form-item
            :label="$t('system.userManager.createForm.remark').toString()"
          >
            <el-input
              v-model="createForm.remark"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleCreateFormSubmit"
            >
              {{ $t('system.userManager.button.create') }}
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 编辑弹出框 -->
      <el-dialog
        :title="$t('system.userManager.editForm.title').toString()"
        :visible.sync="editVisible"
        width="70%"
        @closed="handleEditDialogClose"
      >
        <!-- 表单 -->
        <el-form
          ref="editForm"
          :model="editForm"
          :rules="editFormRules"
          label-width="80px"
        >
          <el-form-item
            prop="key.string_id"
            :label="$t('system.userManager.editForm.id').toString()"
          >
            <el-input
              v-model="editForm.key.string_id"
              clearable
            />
          </el-form-item>
          <el-form-item
            prop="display_name"
            :label="$t('system.userManager.editForm.displayName').toString()"
          >
            <el-input
              v-model="editForm.display_name"
              clearable
            />
          </el-form-item>
          <el-form-item
            :label="$t('system.userManager.editForm.enabled').toString()"
          >
            <el-switch
              v-model="editForm.enabled"
              active-color="#13ce66"
              inactive-color="#ff4949"/>
          </el-form-item>
          <el-form-item
            :label="$t('system.userManager.createForm.role').toString()"
          >
            <el-select
              v-model="selectRoles"
              multiple
              collapse-tags
            >
              <el-option
                v-for="item in allRoles"
                :key="item.key.string_id"
                :label="item.name"
                :value="item.key.string_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('system.userManager.editForm.remark').toString()"
          >
            <el-input
              v-model="editForm.remark"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleEditSubmit"
            >
              {{ $t('system.userManager.button.edit') }}
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 重设密码弹出框 -->
      <el-dialog
        :title="$t('system.userManager.resetForm.title').toString()"
        :visible.sync="resetVisible"
        width="70%"
        @closed="handleResetDialogClose"
      >
        <!-- 表单 -->
        <el-form
          ref="resetForm"
          :model="resetForm"
          :rules="resetFormRules"
          label-width="80px"
        >
          <el-form-item
            :label="$t('system.userManager.resetForm.id').toString()"
          >
            <el-input
              v-model="resetForm.account_key.string_id"
              disabled
            />
          </el-form-item>
          <el-form-item
            prop="new_password"
            :label="$t('system.userManager.resetForm.newPassword').toString()"
          >
            <el-input
              v-model="resetForm.new_password"
              clearable
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleResetSubmit"
            >
              {{ $t('system.userManager.button.reset') }}
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!--  移动端  -->
    <div class="mobile-container hidden-md-only hidden-lg-only hidden-xl-only">
      <!-- 操作栏 -->
      <van-cell-group style="margin: 15px;" inset>
        <van-button type="default" block @click="createVisible = !createVisible">
          <i class="el-icon-plus"/>
          {{ $t('system.userManager.button.create') }}
        </van-button>
      </van-cell-group>
      <!-- 表格 -->
      <van-cell-group
        v-for="(item) in tableData"
        :key="item.key.string_id"
        style="margin: 15px;"
        inset>
        <van-swipe-cell>
          <el-descriptions size="small" :title="item.key.string_id" style="padding: 10px">
            <el-descriptions-item :label="$t('system.userManager.table.displayName').toString()">
              {{ item.display_name }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('system.userManager.table.enabled').toString()">
              {{ enabledMobileFormatter(item.enabled) }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('system.userManager.table.remark').toString()">
              {{ item.remark }}
            </el-descriptions-item>
          </el-descriptions>
          <template #right>
            <van-button square type="info" class="button" @click="handleEdit(item, item)">
              <i class="el-icon-edit" style="padding: 7px"/>
            </van-button>
            <van-button
              square
              type="primary"
              class="button"
              @click="handleReset(item, item)"
            >
              <i class="el-icon-key" style="padding: 7px"/>
            </van-button>
          </template>
        </van-swipe-cell>
      </van-cell-group>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[15, 20, 30, 50]"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="entityCount"/>
      </div>
      <!-- 新增弹出层 -->
      <van-popup
        overlay-class="van-model"
        v-model="createVisible"
        position="bottom"
        style="height: 60%;"
        @close="handleCreateDialogClose"
      >
        <van-form>
          <van-field
            v-model="createForm.account_key.string_id"
            :label="$t('system.userManager.createForm.id').toString()"
            :rules="
              [{ required: true, message: $t('system.userManager.createForm.id').toString() }]
            "
          />

          <van-field
            v-model="createForm.display_name"
            :label="$t('system.userManager.createForm.displayName').toString()"
            :rules="
              [{
                required: true,
                 message: $t('system.userManager.createForm.displayName').toString()
              }]"
          />

          <van-field
            name="switch"
            :label="$t('system.userManager.createForm.enabled').toString()"
          >
            <template #input>
              <van-switch v-model="createForm.enabled" size="20" />
            </template>
          </van-field>

          <van-field
            v-model="createForm.remark"
            :label="$t('system.userManager.createForm.remark').toString()"
          />

          <van-field
            :label="$t('system.userManager.createForm.role').toString()">
            <template #input>
              <van-collapse v-model="collapseIsActive">
                <van-collapse-item
                  name="1"
                >
                  <van-checkbox-group v-model="selectRoles">
                    <van-checkbox
                      style="margin: 5px"
                      v-for="(item) in allRoles"
                      :key="item.key.string_id"
                      :name="item.key.string_id"
                      shape="square">
                      {{ item.name }}
                    </van-checkbox>
                  </van-checkbox-group>
                </van-collapse-item>
              </van-collapse>
            </template>
          </van-field>

          <div style="margin: 16px;">
            <van-button
              round
              block
              type="info"
              native-type="submit"
              @click="handleCreateFormSubmit"
            >
              {{ $t('system.userManager.createForm.title') }}
            </van-button>
          </div>
        </van-form>
      </van-popup>
      <!-- 编辑弹出层 -->
      <van-popup
        overlay-class="van-model"
        v-model="editVisible"
        position="bottom"
        style="height: 60%;"
        @close="handleEditDialogClose"
      >
        <van-form>
          <van-field
            v-model="editForm.key.string_id"
            :label="$t('system.userManager.editForm.id').toString()"
            :rules="
              [{ required: true, message: $t('system.userManager.editForm.id').toString() }]
            "
          />

          <van-field
            v-model="editForm.display_name"
            :label="$t('system.userManager.editForm.displayName').toString()"
            :rules="
              [{
                required: true,
                 message: $t('system.userManager.editForm.displayName').toString()
              }]"
          />

          <van-field
            name="switch"
            :label="$t('system.userManager.editForm.enabled').toString()"
          >
            <template #input>
              <van-switch v-model="editForm.enabled" size="20" />
            </template>
          </van-field>

          <van-field
            v-model="editForm.remark"
            :label="$t('system.userManager.editForm.remark').toString()"
          />

          <van-field
            :label="$t('system.userManager.editForm.role').toString()">
            <template #input>
              <van-collapse v-model="collapseIsActive">
                <van-collapse-item
                  name="1"
                >
                  <van-checkbox-group v-model="selectRoles">
                    <van-checkbox
                      style="margin: 5px"
                      v-for="(item) in allRoles"
                      :key="item.key.string_id"
                      :name="item.key.string_id"
                      shape="square">
                      {{ item.name }}
                    </van-checkbox>
                  </van-checkbox-group>
                </van-collapse-item>
              </van-collapse>
            </template>
          </van-field>

          <div style="margin: 16px;">
            <van-button
              round
              block
              type="info"
              native-type="submit"
              @click="handleEditSubmit"
            >
              {{ $t('system.userManager.editForm.title') }}
            </van-button>
          </div>
        </van-form>
      </van-popup>
      <!-- 修改密码弹出层 -->
      <van-popup
        overlay-class="van-model"
        v-model="resetVisible"
        position="bottom"
        style="height: 30%;"
        @close="handleResetDialogClose"
      >
        <van-form>
          <van-field
            readonly
            v-model="resetForm.account_key.string_id"
            :label="$t('system.userManager.resetForm.id').toString()"
            :rules="
              [{ required: true, message: $t('system.userManager.resetForm.id').toString() }]
            "
          />
          <van-field
            type="password"
            v-model="resetForm.new_password"
            :label="$t('system.userManager.resetForm.newPassword').toString()"
            :rules="
              [{
                required: true,
                 message: $t('system.userManager.resetForm.newPassword').toString()
              }]"
          />
          <div style="margin: 16px;">
            <van-button
              round
              block
              type="info"
              native-type="submit"
              @click="handleResetSubmit"
            >
              {{ $t('system.userManager.resetForm.title') }}
            </van-button>
          </div>
        </van-form>
      </van-popup>
    </div>
  </div>
</template>

<script>
import resolveResponse from '@/util/response';
import {
  lookupAccount,
  register,
  update,
  resetPassword,
} from '@/api/system/basic';
import {
  childForUser,
  lookup as lookupRole,
  relation,
} from '@/api/system/role';

export default {
  name: 'UserManager',
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 15,
      entityCount: 0,
      selectRoles: [],
      allRoles: [],
      collapseIsActive: [],
      createVisible: false,
      createForm: {
        account_key: {
          string_id: '',
        },
        display_name: '',
        enabled: true,
        remark: '',
        password: '',
      },
      createFormRules: {
        account_key: {
          string_id: [
            { required: true, message: this.$t('system.roleManager.editForm.id').toString(), trigger: 'blur' },
          ],
        },
        display_name: [
          { required: true, message: this.$t('system.roleManager.editForm.name').toString(), trigger: 'blur' },
        ],
        password: [
          { required: true, message: this.$t('system.roleManager.editForm.name').toString(), trigger: 'blur' },
        ],
      },
      editVisible: false,
      editForm: {
        key: {
          string_id: '',
        },
        display_name: '',
        enabled: true,
        remark: '',
      },
      editFormRules: {
        key: {
          string_id: [
            { required: true, message: this.$t('system.userManager.editForm.id').toString(), trigger: 'blur' },
          ],
        },
        display_name: [
          { required: true, message: this.$t('system.userManager.editForm.displayName').toString(), trigger: 'blur' },
        ],
      },
      resetVisible: false,
      resetForm: {
        account_key: {
          string_id: '',
        },
        new_password: '',
      },
      resetFormRules: {
        new_password: [
          { required: true, message: this.$t('system.userManager.resetForm.newPassword').toString(), trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    handleLookup() {
      resolveResponse(this, lookupAccount(this.currentPage - 1, this.pageSize))
        .then((res) => {
          this.tableData = res.data;
          this.entityCount = Number(res.count);
        });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.handleLookup();
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.handleLookup();
    },
    handleCreateFormSubmit() {
      // eslint-disable-next-line consistent-return
      this.$refs.createForm.validate((valid) => {
        if (valid) {
          resolveResponse(this, register(this.createForm))
            .then(() => {
              if (this.selectRoles !== []) {
                resolveResponse(
                  this,
                  relation(this.createForm.account_key.string_id, this.selectRoles),
                );
              }
            })
            .then(() => {
              this.handleCreateDialogClose();
              this.handleLookup();
            });
        } else {
          return false;
        }
      });
    },
    handleCreateDialogClose() {
      this.createVisible = false;
      this.collapseIsActive = [];
      this.createForm = {
        account_key: {
          string_id: '',
        },
        display_name: '',
        enabled: true,
        remark: '',
        password: '',
      };
      this.selectRoles = [];
    },
    handleEdit(index, row) {
      if (row.key.string_id !== 'root') {
        this.editForm = row;
        this.editVisible = true;
        resolveResponse(this, childForUser(row.key.string_id))
          .then((res) => {
            this.selectRoles = res;
          });
      } else {
        this.$message({
          message: this.$t('system.userManager.button.editMessage').toString(),
          type: 'warning',
          showClose: true,
        });
      }
    },
    handleEditDialogClose() {
      this.editVisible = false;
      this.collapseIsActive = [];
      this.editForm = {
        key: {
          string_id: '',
        },
        display_name: '',
        enabled: true,
        remark: '',
      };
      this.selectRoles = [];
    },
    handleEditSubmit() {
      // eslint-disable-next-line consistent-return
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          resolveResponse(this, update(this.editForm))
            .then(() => {
              if (this.selectRoles !== []) {
                resolveResponse(
                  this,
                  relation(this.editForm.key.string_id, this.selectRoles),
                );
              }
            })
            .then(() => {
              this.handleEditDialogClose();
              this.handleLookup();
            });
        } else {
          return false;
        }
      });
    },
    handleReset(index, row) {
      this.resetForm.account_key.string_id = row.key.string_id;
      this.resetVisible = true;
    },
    handleResetDialogClose() {
      this.resetVisible = false;
      this.resetForm = {
        account_key: {
          string_id: '',
        },
        new_password: '',
      };
    },
    handleResetSubmit() {
      // eslint-disable-next-line consistent-return
      this.$refs.resetForm.validate((valid) => {
        if (valid) {
          resolveResponse(this, resetPassword(this.resetForm))
            .then(() => {
              this.handleResetDialogClose();
              this.handleLookup();
            });
        } else {
          return false;
        }
      });
    },
    enabledFormatter(row, column, cellValue) {
      if (cellValue) {
        return this.$t('system.userManager.table.enable').toString();
      }
      return this.$t('system.userManager.table.notEnable').toString();
    },
    enabledMobileFormatter(cellValue) {
      if (cellValue) {
        return this.$t('system.userManager.table.enable').toString();
      }
      return this.$t('system.userManager.table.notEnable').toString();
    },
    lookupAllRole() {
      resolveResponse(this, lookupRole(0, -1))
        .then((res) => {
          this.allRoles = res.data;
        });
    },
  },
  mounted() {
    this.handleLookup();
    this.lookupAllRole();
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  .pc-container {
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    padding: 10px;
    .header {
      display:flex;
      justify-content:right;
      align-items:center;
    }
    .main {
      .table {
        width: 100%;
        height: 95%;
        .table-button {
          padding: 7px
        }
      }
    }
    .footer {
      display:flex;
      justify-content:center;
      align-items:center;
      .pagination {
        width: 100%;
        height: 100%;
      }
    }
  }
  .mobile-container {
    width: 100%;
    height: auto;
    padding-top: 2%;
    background-color: #f7f8fa;
    .button {
      height: 100%;
    }
    .pagination {
      margin-top: 20px;
      display:flex;
      justify-content:center;
      align-items:center;
      background-color: #f7f8fa;
    }
  }
}
</style>

<style scoped>
.createTransfer >>> .el-transfer-panel {
  width:35%;
}

.mobile-container >>> .el-divider--horizontal {
  margin: 5px;
}
</style>
