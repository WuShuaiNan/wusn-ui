<template>
  <div>
    <div ref="barChart" id="barChart" :style="chartStyle">
    </div>
  </div>
</template>

<script>
export default {
  name: 'BarChart',
  props: {
    title: {
      type: String,
      default: '',
    },
    chartStyle: {
      type: String,
      default: 'width: 100%;height: 500px',
    },
    legendData: {
      type: Array,
      default: () => [],
    },
    seriesData: {
      type: Array,
      default: () => [],
    },
    xAxisData: {
      type: Array,
      default: () => [],
    },
    yAxisName: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const barChart = this.$echarts.init(this.$refs.barChart, 'light', {
        renderer: 'svg',
        useDirtyRect: false,
      });
      // 绘制图表
      barChart.setOption({
        title: {
          text: this.title,
          left: 'left',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          left: 'center',
          top: '5%',
          data: this.legendData,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: this.xAxisData,
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: this.yAxisName,
          },
        ],
        series: this.seriesData,
      });
    },
  },
};
</script>

<style scoped>
</style>
