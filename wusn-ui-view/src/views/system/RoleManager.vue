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
              {{ $t('system.roleManager.button.create') }}
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
              :label="$t('system.roleManager.table.id').toString()"
            />
            <el-table-column
              prop="name"
              :label="$t('system.roleManager.table.name').toString()"
            />
            <el-table-column
              prop="enabled"
              :formatter="enabledFormatter"
              :label="$t('system.roleManager.table.enabled').toString()"
            />
            <el-table-column
              prop="remark"
              :label="$t('system.roleManager.table.remark').toString()"
            />
            <el-table-column width="120">
              <template slot-scope="scope">
                <el-button-group>
                  <!-- 查看  -->
                  <el-tooltip
                    effect="dark"
                    :content="$t('system.roleManager.button.inspect').toString()"
                    placement="top"
                  >
                    <el-button
                      class="table-button"
                      size="medium"
                      type="text"
                      @click="handleInspect(scope.$index, scope.row)"
                    >
                      <i class="el-icon-search" style="color: #5a5c5d;font-weight: bold"/>
                    </el-button>
                  </el-tooltip>
                  <!-- 编辑  -->
                  <el-tooltip
                    effect="dark"
                    :content="$t('system.roleManager.button.edit').toString()"
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
                  <!-- 删除 -->
                  <el-tooltip
                    effect="dark"
                    :content="$t('system.roleManager.button.delete').toString()"
                    placement="top"
                  >
                    <el-button
                      class="table-button"
                      size="medium"
                      type="text"
                      @click="handleDelete(scope.$index, scope.row)"
                    >
                      <i class="el-icon-delete" style="color: #F56C6C;font-weight: bold"/>
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
        :title="$t('system.roleManager.createForm.title').toString()"
        :visible.sync="createVisible"
        width="70%"
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
            prop="key.string_id"
            :label="$t('system.roleManager.createForm.id').toString()"
          >
            <el-input
              v-model="createForm.key.string_id"
              clearable
            />
          </el-form-item>
          <el-form-item
            prop="name"
            :label="$t('system.roleManager.createForm.name').toString()"
          >
            <el-input
              v-model="createForm.name"
              clearable
            />
          </el-form-item>
          <el-form-item
            :label="$t('system.roleManager.createForm.enabled').toString()"
          >
            <el-switch
              v-model="createForm.enabled"
              active-color="#13ce66"
              inactive-color="#ff4949"/>
          </el-form-item>
          <el-form-item
            :label="$t('system.roleManager.createForm.remark').toString()"
          >
            <el-input
              v-model="createForm.remark"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <!-- 权限多选框 -->
            <div class="createTransfer">
              <el-transfer
                v-model="rolePermissions"
                :data="permissions"
                :titles="titles"
              />
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleCreateFormSubmit"
            >
              {{ $t('system.roleManager.button.create') }}
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 查看弹出框 -->
      <el-dialog
        :visible.sync="inspectVisible"
        :title="this.$t('system.roleManager.button.inspect').toString()"
        width="70%"
        @closed="handleInspectDialogClose"
      >
        <!-- 表单 -->
        <el-form
          :model="inspectForm"
          label-width="80px"
        >
          <el-form-item
            prop="key.string_id"
            :label="$t('system.roleManager.createForm.id').toString()"
          >
            <el-input
              v-model="inspectForm.key.string_id"
              disabled
            />
          </el-form-item>
          <el-form-item
            prop="name"
            :label="$t('system.roleManager.createForm.name').toString()"
          >
            <el-input
              v-model="inspectForm.name"
              disabled
            />
          </el-form-item>
          <el-form-item
            :label="$t('system.roleManager.createForm.enabled').toString()"
          >
            <el-switch
              v-model="inspectForm.enabled"
              disabled
              active-color="#13ce66"
              inactive-color="#ff4949"/>
          </el-form-item>
          <el-form-item
            :label="$t('system.roleManager.createForm.remark').toString()"
          >
            <el-input
              v-model="inspectForm.remark"
              disabled
            />
          </el-form-item>
          <el-form-item>
            <!-- 权限多选框 -->
            <div class="createTransfer">
              <el-transfer
                disabled
                v-model="rolePermissions"
                :data="permissions"
                :titles="titles"
              />
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 编辑弹出框 -->
      <el-dialog
        :title="$t('system.roleManager.editForm.title').toString()"
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
            :label="$t('system.roleManager.editForm.id').toString()"
          >
            <el-input
              v-model="editForm.key.string_id"
              clearable
            />
          </el-form-item>
          <el-form-item
            prop="name"
            :label="$t('system.roleManager.editForm.name').toString()"
          >
            <el-input
              v-model="editForm.name"
              clearable
            />
          </el-form-item>
          <el-form-item
            :label="$t('system.roleManager.editForm.enabled').toString()"
          >
            <el-switch
              v-model="editForm.enabled"
              active-color="#13ce66"
              inactive-color="#ff4949"/>
          </el-form-item>
          <el-form-item
            :label="$t('system.roleManager.editForm.remark').toString()"
          >
            <el-input
              v-model="editForm.remark"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <!-- 权限多选框 -->
            <div class="createTransfer">
              <el-transfer
                v-model="rolePermissions"
                :data="permissions"
                :titles="titles"
              />
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleEditSubmit"
            >
              {{ $t('system.roleManager.button.edit') }}
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
          {{ $t('system.roleManager.button.create') }}
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
            <el-descriptions-item :label="$t('system.roleManager.table.name').toString()">
              {{ item.name }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('system.roleManager.table.enabled').toString()">
              {{ enabledMobileFormatter(item.enabled) }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('system.roleManager.table.remark').toString()">
              {{ item.remark }}
            </el-descriptions-item>
          </el-descriptions>
          <template #right>
            <van-button square type="primary" class="button" @click="handleInspect(item, item)">
              <i class="el-icon-search" style="padding: 7px"/>
            </van-button>
            <van-button square type="info" class="button" @click="handleEdit(item, item)">
              <i class="el-icon-edit" style="padding: 7px"/>
            </van-button>
            <van-button
              square
              type="danger"
              class="button"
              @click="handleDelete(item, item)"
            >
              <i class="el-icon-delete" style="padding: 7px"/>
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
            v-model="createForm.key.string_id"
            :label="$t('system.roleManager.createForm.id').toString()"
            :rules="
              [{ required: true, message: $t('system.roleManager.createForm.id').toString() }]
            "
          />

          <van-field
            v-model="createForm.name"
            :label="$t('system.roleManager.createForm.name').toString()"
            :rules="
              [{ required: true, message: $t('system.roleManager.createForm.name').toString() }]"
          />

          <van-field
            name="switch"
            :label="$t('system.roleManager.createForm.enabled').toString()"
          >
            <template #input>
              <van-switch v-model="createForm.enabled" size="20" />
            </template>
          </van-field>

          <van-field
            v-model="createForm.remark"
            :label="$t('system.roleManager.createForm.remark').toString()"
          />

          <van-field
            :label="$t('system.roleManager.createForm.permission').toString()">
            <template #input>
              <van-collapse v-model="collapseIsActive">
                <van-collapse-item
                  name="1"
                >
                  <van-checkbox-group v-model="rolePermissions">
                    <van-checkbox
                      style="margin: 10px"
                      v-for="(item) in permissions"
                      :key="item.key"
                      :name="item.key"
                      shape="square">
                      {{ item.label }}
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
              {{ $t('system.roleManager.createForm.title') }}
            </van-button>
          </div>
        </van-form>
      </van-popup>
      <!-- 详情查询弹出层 -->
      <van-popup
        overlay-class="van-model"
        v-model="inspectVisible"
        position="bottom"
        style="height: 60%;"
        @close="handleInspectDialogClose"
      >
        <van-form>
          <van-field
            v-model="inspectForm.key.string_id"
            :label="$t('system.roleManager.createForm.id').toString()"
            readonly
          />

          <van-field
            v-model="inspectForm.name"
            :label="$t('system.roleManager.createForm.name').toString()"
            readonly
          />

          <van-field
            name="switch"
            :label="$t('system.roleManager.createForm.enabled').toString()"
          >
            <template #input>
              <van-switch v-model="inspectForm.enabled" size="20" disabled />
            </template>
          </van-field>

          <van-field
            readonly
            v-model="inspectForm.remark"
            :label="$t('system.roleManager.createForm.remark').toString()"
          />

          <van-field
            :label="$t('system.roleManager.createForm.permission').toString()">
            <template #input>
              <van-collapse v-model="collapseIsActive">
                <van-collapse-item
                  name="1"
                >
                  <van-checkbox-group v-model="rolePermissions">
                    <van-checkbox
                      disabled
                      style="margin: 10px"
                      v-for="(item) in permissions"
                      :key="item.key"
                      :name="item.key"
                      shape="square">
                      {{ item.label }}
                    </van-checkbox>
                  </van-checkbox-group>
                </van-collapse-item>
              </van-collapse>
            </template>
          </van-field>
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
            :label="$t('system.roleManager.editForm.id').toString()"
            :rules="
              [{ required: true, message: $t('system.roleManager.editForm.id').toString() }]
            "
          />

          <van-field
            v-model="editForm.name"
            :label="$t('system.roleManager.editForm.name').toString()"
            :rules="
              [{ required: true, message: $t('system.roleManager.editForm.name').toString() }]"
          />

          <van-field
            name="switch"
            :label="$t('system.roleManager.editForm.enabled').toString()"
          >
            <template #input>
              <van-switch v-model="editForm.enabled" size="20" />
            </template>
          </van-field>

          <van-field
            v-model="editForm.remark"
            :label="$t('system.roleManager.editForm.remark').toString()"
          />

          <van-field
            :label="$t('system.roleManager.editForm.permission').toString()">
            <template #input>
              <van-collapse v-model="collapseIsActive">
                <van-collapse-item
                  name="1"
                >
                  <van-checkbox-group v-model="rolePermissions">
                    <van-checkbox
                      style="margin: 5px"
                      v-for="(item) in permissions"
                      :key="item.key"
                      :name="item.key"
                      shape="square">
                      {{ item.label }}
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
              {{ $t('system.roleManager.editForm.title') }}
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
  lookup,
  insert,
  remove,
  update,
} from '@/api/system/role';
import {
  permissions,
  resetPermissions,
  lookupPermissionsForRole,
} from '@/api/system/basic';

export default {
  name: 'RoleManager',
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 15,
      entityCount: 0,
      collapseIsActive: [],
      createVisible: false,
      createForm: {
        key: {
          string_id: '',
        },
        name: '',
        enabled: true,
        remark: '',
      },
      createFormRules: {
        key: {
          string_id: [
            { required: true, message: this.$t('system.roleManager.createForm.id').toString(), trigger: 'blur' },
          ],
        },
        name: [
          { required: true, message: this.$t('system.roleManager.createForm.name').toString(), trigger: 'blur' },
        ],
      },
      inspectVisible: false,
      inspectForm: {
        key: {
          string_id: '',
        },
        name: '',
        enabled: true,
        remark: '',
      },
      editVisible: false,
      editForm: {
        key: {
          string_id: '',
        },
        name: '',
        enabled: true,
        remark: '',
      },
      editFormRules: {
        key: {
          string_id: [
            { required: true, message: this.$t('system.roleManager.editForm.id').toString(), trigger: 'blur' },
          ],
        },
        name: [
          { required: true, message: this.$t('system.roleManager.editForm.name').toString(), trigger: 'blur' },
        ],
      },
      rolePermissions: [],
      permissions: [],
      titles: [
        this.$t('system.roleManager.transfer.left'),
        this.$t('system.roleManager.transfer.right'),
      ],
    };
  },
  methods: {
    handleLookup() {
      resolveResponse(this, lookup(this.currentPage - 1, this.pageSize))
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
          resolveResponse(this, insert(this.createForm))
            .then(() => {
              resolveResponse(
                this,
                resetPermissions(this.createForm.key.string_id, this.rolePermissions),
              );
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
      this.rolePermissions = [];
      this.createForm = {
        key: {
          string_id: '',
        },
        name: '',
        enabled: true,
        remark: '',
      };
      this.lookUpAllPermissions();
    },
    handleInspect(index, row) {
      resolveResponse(this, lookupPermissionsForRole(row.key.string_id))
        .then((res) => {
          this.inspectForm = row;
          this.rolePermissions = res;
          this.permissions.forEach((permission) => {
            // eslint-disable-next-line no-param-reassign
            permission.disabled = true;
          });
        })
        .then(() => {
          this.inspectVisible = true;
        });
    },
    handleInspectDialogClose() {
      this.inspectVisible = false;
      this.collapseIsActive = [];
      this.rolePermissions = [];
      this.lookUpAllPermissions();
    },
    handleEdit(index, row) {
      if (row.key.string_id !== 'role_for_root') {
        resolveResponse(this, lookupPermissionsForRole(row.key.string_id))
          .then((res) => {
            this.editForm = row;
            this.rolePermissions = res;
          })
          .then(() => {
            this.editVisible = true;
          });
      } else {
        this.$message({
          message: this.$t('system.roleManager.button.editMessage').toString(),
          type: 'warning',
          showClose: true,
        });
      }
    },
    handleEditDialogClose() {
      this.editVisible = false;
      this.collapseIsActive = [];
      this.rolePermissions = [];
      this.editForm = {
        key: {
          string_id: '',
        },
        name: '',
        enabled: true,
        remark: '',
      };
      this.lookUpAllPermissions();
    },
    handleEditSubmit() {
      // eslint-disable-next-line consistent-return
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          resolveResponse(this, update(this.editForm))
            .then(() => {
              resolveResponse(
                this,
                resetPermissions(this.editForm.key.string_id, this.rolePermissions),
              );
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
    handleDelete(index, row) {
      if (row.key.string_id !== 'role_for_root') {
        Promise.resolve(row)
          .then((res) => this.$dialog.alert(
            {
              title: this.$t('entityDelete.title').toString(),
              message: this.$t('entityDelete.message').toString(),
              confirmButtonText: this.$t('entityDelete.confirm').toString(),
              cancelButtonText: this.$t('entityDelete.cancel').toString(),
              allowHtml: true,
              showCancelButton: true,
            },
          ).then(() => Promise.resolve(res)).catch(() => Promise.reject()))
          .then((res) => resolveResponse(this, remove(res.key.string_id)).then(() => res))
          .then(() => {
            this.$message({
              showClose: true,
              message: this.$t('entityDelete.successMessage').toString(),
              type: 'success',
              center: true,
            });
          })
          .then(() => {
            this.handleLookup();
          })
          .catch(() => {
          });
      } else {
        this.$message({
          message: this.$t('system.roleManager.button.deleteMessage').toString(),
          type: 'warning',
          showClose: true,
        });
      }
    },
    enabledFormatter(row, column, cellValue) {
      if (cellValue) {
        return this.$t('system.roleManager.table.enable').toString();
      }
      return this.$t('system.roleManager.table.notEnable').toString();
    },
    enabledMobileFormatter(cellValue) {
      if (cellValue) {
        return this.$t('system.roleManager.table.enable').toString();
      }
      return this.$t('system.roleManager.table.notEnable').toString();
    },
    lookUpAllPermissions() {
      resolveResponse(this, permissions(0, 0))
        .then((res) => {
          this.permissions = [];
          res.data.forEach((data) => {
            this.permissions.push({
              key: data.key.string_id,
              label: data.name,
              disabled: false,
            });
          });
        });
    },
  },
  mounted() {
    this.handleLookup();
    this.lookUpAllPermissions();
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
