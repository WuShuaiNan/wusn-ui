<template>
  <div>
    <div ref="gaugeChart" id="gaugeChart" :style="chartStyle">
    </div>
  </div>
</template>

<script>
export default {
  name: 'GaugeChart',
  props: {
    title: {
      type: String,
      default: '',
    },
    chartStyle: {
      type: String,
      default: 'width: 100%;height: 500px',
    },
    seriesData: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const gaugeChart = this.$echarts.init(this.$refs.gaugeChart, 'light', {
        renderer: 'svg',
        useDirtyRect: false,
      });
      // 绘制图表
      gaugeChart.setOption({
        title: {
          text: this.title,
          left: 'left',
        },
        tooltip: {
          formatter: '{b} : {c}%',
        },
        series: [
          {
            // name: 'OEE',
            type: 'gauge',
            detail: { formatter: '{value}%' },
            data: this.seriesData,
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
</style>
