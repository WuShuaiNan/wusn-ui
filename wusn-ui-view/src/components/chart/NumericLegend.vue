<template>
  <div>
    <el-descriptions class="margin-top" :column="2" border>
      <el-descriptions-item labelStyle="padding: 12px 100px;" contentStyle="padding: 12px 100px;">
        <template slot="label">
<!--          <el-tag color="#FF5159" effect="dark">高阈值</el-tag>-->
          <el-tag color="#FF5159" effect="dark">{{ $t('numericLegend.highThreshold') }}</el-tag>
        </template>
        {{highThreshold}}
      </el-descriptions-item>
      <el-descriptions-item labelStyle="padding: 12px 100px;" contentStyle="padding: 12px 100px;">
        <template slot="label">
          <!--          <el-tag color="#FFA753" effect="dark">低阈值</el-tag>-->
          <el-tag color="#FFA753" effect="dark">{{ $t('numericLegend.lowThreshold') }}</el-tag>
        </template>
        {{lowThreshold}}
      </el-descriptions-item>
      <el-descriptions-item labelStyle="padding: 12px 100px;" contentStyle="padding: 12px 100px;">
        <template slot="label">
          <!--          <el-tag color="#7191D7" effect="dark">高峰值</el-tag>-->
          <el-tag color="#7191D7" effect="dark">{{ $t('numericLegend.highPeak') }}</el-tag>
        </template>
        {{highPeak}}
      </el-descriptions-item>
      <el-descriptions-item labelStyle="padding: 12px 100px;" contentStyle="padding: 12px 100px;">
        <template slot="label">
          <!--          <el-tag color="#939FE2" effect="dark">低峰值</el-tag>-->
          <el-tag color="#939FE2" effect="dark">{{ $t('numericLegend.lowPeak') }}</el-tag>
        </template>
        {{lowPeak}}
      </el-descriptions-item>
      <el-descriptions-item labelStyle="padding: 12px 100px;" contentStyle="padding: 12px 100px;">
        <template slot="label">
<!--          <el-tag color="#3CA3F7" effect="dark">平均值</el-tag>-->
          <el-tag color="#3CA3F7" effect="dark">{{ $t('numericLegend.averagePeak') }}</el-tag>
        </template>
        {{averagePeak}}
      </el-descriptions-item>
<!--      <el-descriptions-item labelStyle="padding: 12px 100px;" contentStyle="padding: 12px 100px;">-->
<!--        <template slot="label">-->
<!--          &lt;!&ndash;          <el-tag color="#2f365e" effect="dark">当前值</el-tag>&ndash;&gt;-->
<!--          <el-tag color="#2f365e" effect="dark">{{ $t('numericLegend.nowValue') }}</el-tag>-->
<!--        </template>-->
<!--        {{nowValue}}-->
<!--      </el-descriptions-item>-->
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: 'NumericLegend',
  props: {
    highThreshold: {
      type: String,
      default: '',
    },
    nowValue: {
      type: String,
      default: '',
    },
    lowThreshold: {
      type: String,
      default: '',
    },
    highPeak: {
      type: String,
      default: '',
    },
    averagePeak: {
      type: String,
      default: '',
    },
    lowPeak: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
.margin-top {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
