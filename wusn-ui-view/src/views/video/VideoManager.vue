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
              {{ $t('video.rtsp2flv.button.create') }}
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
              prop="label"
              width="250"
              :label="$t('video.rtsp2flv.table.label').toString()"
            />
            <el-table-column
              prop="url"
              :label="$t('video.rtsp2flv.table.url').toString()"
            />
            <el-table-column
              prop="remark"
              width="250"
              :label="$t('video.rtsp2flv.table.remark').toString()"
            />
            <el-table-column
              width="150"
              :label="$t('video.rtsp2flv.table.operation').toString()"
            >
              <template slot-scope="scope">
                <el-button-group>
                  <!-- 查看  -->
                  <el-tooltip
                    effect="dark"
                    :content="$t('video.rtsp2flv.button.inspect').toString()"
                    placement="top"
                  >
                    <el-button
                      class="table-button"
                      size="medium"
                      type="text"
                      @click="handleMonitoring(scope.row)"
                    >
                      <i class="el-icon-video-camera" style="color: #409EFF;font-weight: bold"/>
                    </el-button>
                  </el-tooltip>
                  <!-- 编辑  -->
                  <el-tooltip
                    effect="dark"
                    :content="$t('video.rtsp2flv.button.edit').toString()"
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
                  <!-- 删除  -->
                  <el-tooltip
                    effect="dark"
                    :content="$t('video.rtsp2flv.button.delete').toString()"
                    placement="top"
                  >
                    <el-button
                      class="table-button"
                      size="medium"
                      type="text"
                      @click="handleDelete(scope.row)"
                    >
                      <i class="el-icon-delete" style="color: #ff4040;font-weight: bold"/>
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
        :title="$t('video.rtsp2flv.createForm.title').toString()"
        :visible.sync="createVisible"
        width="50%"
        @closed="handleCreateDialogClose"
      >
        <!-- 表单 -->
        <el-form
          ref="createForm"
          :model="createForm"
          label-width="80px"
        >
          <el-form-item
            prop="label"
            :label="$t('video.rtsp2flv.createForm.label').toString()"
          >
            <el-input
              v-model="createForm.label"
              clearable
            />
          </el-form-item>
          <el-form-item
            prop="url"
            :label="$t('video.rtsp2flv.createForm.url').toString()"
          >
            <el-input
              v-model="createForm.url"
              clearable
            />
          </el-form-item>
          <el-form-item
            prop="remark"
            :label="$t('video.rtsp2flv.createForm.remark').toString()"
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
              {{ $t('video.rtsp2flv.button.create') }}
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 编辑弹出框 -->
      <el-dialog
        :title="$t('video.rtsp2flv.editForm.title').toString()"
        :visible.sync="editVisible"
        width="70%"
        @closed="handleEditDialogClose"
      >
        <!-- 表单 -->
        <el-form
          ref="editForm"
          :model="editForm"
          label-width="80px"
        >
          <el-form-item
            prop="label"
            :label="$t('video.rtsp2flv.editForm.label').toString()"
          >
            <el-input
              v-model="editForm.label"
              clearable
            />
          </el-form-item>
          <el-form-item
            prop="url"
            :label="$t('video.rtsp2flv.editForm.url').toString()"
          >
            <el-input
              v-model="editForm.url"
              clearable
            />
          </el-form-item>
          <el-form-item
            prop="remark"
            :label="$t('video.rtsp2flv.editForm.remark').toString()"
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
              {{ $t('video.rtsp2flv.button.edit') }}
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 监控查看弹出框 -->
      <el-dialog
        :title="$t('video.rtsp2flv.button.inspect').toString()"
        :visible.sync="monitoringVisible"
        width="650"
        @closed="handleMonitoringDialogClose"
      >
        <video id="videoElement" controls autoplay width="640" height="480"></video>
      </el-dialog>
    </div>
    <!--  移动端  -->
    <div class="mobile-container hidden-md-only hidden-lg-only hidden-xl-only">
      <!-- 操作栏 -->
      <van-cell-group style="margin: 15px;" inset>
        <van-button type="default" block @click="createVisible = !createVisible">
          <i class="el-icon-plus"/>
          {{ $t('video.rtsp2flv.button.create') }}
        </van-button>
      </van-cell-group>
      <!-- 表格 -->
      <van-cell-group
        v-for="(item) in tableData"
        :key="item.key.long_id"
        style="margin: 15px;"
        inset>
        <van-swipe-cell>
          <el-descriptions size="small" :title="item.key.long_id" style="padding: 10px">
            <el-descriptions-item :label="$t('video.rtsp2flv.table.label').toString()">
              {{ item.label }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('video.rtsp2flv.table.url').toString()">
              {{ item.url }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('video.rtsp2flv.table.remark').toString()">
              {{ item.remark }}
            </el-descriptions-item>
          </el-descriptions>
          <template #right>
            <van-button square type="info" class="button" @click="handleEdit(item, item)">
              <i class="el-icon-edit" style="padding: 7px"/>
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
            v-model="createForm.label"
            :label="$t('video.rtsp2flv.createForm.label').toString()"
          />
          <van-field
            v-model="createForm.url"
            :label="$t('video.rtsp2flv.createForm.url').toString()"
          />
          <van-field
            v-model="createForm.remark"
            :label="$t('video.rtsp2flv.createForm.remark').toString()"
          />
          <div style="margin: 16px;">
            <van-button
              round
              block
              type="info"
              native-type="submit"
              @click="handleCreateFormSubmit"
            >
              {{ $t('video.rtsp2flv.createForm.title') }}
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
            v-model="editForm.label"
            :label="$t('video.rtsp2flv.editForm.label').toString()"
          />
          <van-field
            v-model="editForm.url"
            :label="$t('video.rtsp2flv.editForm.url').toString()"
          />
          <van-field
            v-model="editForm.remark"
            :label="$t('video.rtsp2flv.editForm.remark').toString()"
          />
          <div style="margin: 16px;">
            <van-button
              round
              block
              type="info"
              native-type="submit"
              @click="handleEditSubmit"
            >
              {{ $t('video.rtsp2flv.editForm.title') }}
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
  update,
  remove,
} from '@/api/video/rtsp';
import flvjs from 'flv.js';

export default {
  name: 'VideoManager',
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 15,
      entityCount: 0,
      createVisible: false,
      createForm: {
        key: {
          long_id: '',
        },
        label: '',
        url: '',
        remark: '',
      },
      editVisible: false,
      editForm: {
        key: {
          long_id: '',
        },
        label: '',
        url: '',
        remark: '',
      },
      monitoringVisible: false,
      monitoringForm: {
        url: '',
      },
      player: null,
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
      this.createForm.key.long_id = Date.now().toString();
      resolveResponse(this, insert(this.createForm))
        .then(() => {
          this.handleCreateDialogClose();
          this.handleLookup();
        });
    },
    handleCreateDialogClose() {
      this.createVisible = false;
      this.createForm = {
        key: {
          long_id: '',
        },
        label: '',
        url: '',
        remark: '',
      };
    },
    handleEdit(index, row) {
      this.editForm = row;
      this.editVisible = true;
    },
    handleEditDialogClose() {
      this.editVisible = false;
      this.editForm = {
        key: {
          long_id: '',
        },
        label: '',
        url: '',
        remark: '',
      };
    },
    handleEditSubmit() {
      resolveResponse(this, update(this.editForm))
        .then(() => {
          this.handleEditDialogClose();
          this.handleLookup();
        });
    },
    handleDelete(row) {
      Promise.resolve(row)
        .then((res) => this.$confirm(
          this.$t('entityDelete.message').toString(),
          this.$t('entityDelete.title').toString(),
          {
            confirmButtonText: this.$t('entityDelete.confirm').toString(),
            cancelButtonText: this.$t('entityDelete.cancel').toString(),
            dangerouslyUseHTMLString: true,
            customClass: 'custom-message-box__w500',
            type: 'warning',
          },
        ).then(() => Promise.resolve(res)).catch(() => Promise.reject()))
        .then((res) => resolveResponse(this, remove(res.key.long_id)).then(() => res))
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
    },
    handleMonitoring(row) {
      // eslint-disable-next-line no-constant-condition
      if (process.env.NODE_ENV === 'development' || 'debug') {
        this.monitoringForm.url = `http://localhost:8080/video/rtsp2flv?rtspUrl=${row.url}&width=640&height=480`;
      } else if (process.env.NODE_ENV === 'production') {
        this.monitoringForm.url = `${window.location.origin}/wusn-api/video/rtsp2flv?rtspUrl=${row.url}&width=640&height=480`;
      }
      this.monitoringVisible = true;
      this.$nextTick(() => {
        this.handlePlay();
      });
    },
    handlePlay() {
      if (flvjs.isSupported()) {
        const videoElement = document.getElementById('videoElement');
        if (videoElement) {
          try {
            // 如果已有播放器实例，先销毁
            if (this.player) {
              this.player.destroy();
              this.player = null;
            }

            this.player = flvjs.createPlayer({
              type: 'flv',
              url: `${this.monitoringForm.url}`,
            });
            this.player.attachMediaElement(videoElement);
            this.player.load();

            // 正确处理 play() 的 Promise
            const playPromise = this.player.play();
            if (playPromise !== undefined) {
              playPromise.catch((error) => {
                // 处理播放被中断的情况
                if (error.name === 'AbortError') {
                  this.$message({
                    showClose: true,
                    message: '中断视频播放',
                    type: 'info',
                    center: true,
                  });
                } else {
                  this.$message({
                    showClose: true,
                    message: '视频播放失败',
                    type: 'error',
                    center: true,
                  });
                }
              });
            }
          } catch (e) {
            this.$message({
              showClose: true,
              message: `播放器初始化失败:${e.message}`,
              type: 'warning',
              center: true,
            });
            this.$message({
              showClose: true,
              message: '播放器初始化失败',
              type: 'error',
              center: true,
            });
          }
        }
      } else {
        this.$message({
          showClose: true,
          message: '播放器不支持',
          type: 'warning',
          center: true,
        });
      }
    },
    handleMonitoringDialogClose() {
      // 在销毁播放器前先暂停
      if (this.player) {
        try {
          // 先暂停播放，避免中断错误
          this.player.pause();

          // 等待一小段时间再销毁，让暂停操作完成
          setTimeout(() => {
            if (this.player) {
              try {
                this.player.destroy();
              } catch (e) {
                this.$message({
                  showClose: true,
                  message: `播放器销毁失败:${e.message}`,
                  type: 'warning',
                  center: true,
                });
              }
              this.player = null;
            }
          }, 100);
        } catch (e) {
          // 直接销毁
          try {
            this.player.destroy();
          } catch (destroyError) {
            this.$message({
              showClose: true,
              message: `播放器销毁失败:${destroyError.message}`,
              type: 'warning',
              center: true,
            });
          }
          this.player = null;
        }
      }
      this.monitoringVisible = false;
      this.monitoringForm = {
        url: '',
      };
    },
  },
  mounted() {
    this.handleLookup();
  },
  beforeDestroy() {
    // 组件销毁前确保播放器被正确清理
    if (this.player) {
      try {
        this.player.pause();
        // 等待一小段时间再销毁
        setTimeout(() => {
          if (this.player) {
            this.player.destroy();
            this.player = null;
          }
        }, 100);
      } catch (e) {
        this.$message({
          showClose: true,
          message: `组件销毁时播放器清理失败:${e.message}`,
          type: 'warning',
          center: true,
        });
        try {
          this.player.destroy();
        } catch (destroyError) {
          this.$message({
            showClose: true,
            message: `组件销毁时播放器销毁失败:${e.message}`,
            type: 'warning',
            center: true,
          });
        }
        this.player = null;
      }
    }
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
