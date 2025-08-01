<template>
  <div>
    <div ref="barAndLineChart" id="barAndLineChart" :style="chartStyle">
    </div>
  </div>
</template>

<script>
export default {
  name: 'BarAndLineChart',
  props: {
    title: {
      type: String,
      default: '',
    },
    chartStyle: {
      type: String,
      default: 'width: 100%;height: 450px',
    },
    seriesData: {
      type: Array,
      default: () => [],
    },
    xAxisData: {
      type: Array,
      default: () => [],
    },
    series: {
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
      const barAndLineChart = this.$echarts.init(this.$refs.barAndLineChart, 'light', {
        renderer: 'svg',
        useDirtyRect: false,
      });
      // 绘制图表
      barAndLineChart.setOption({
        title: {
          text: this.title,
          left: 'left',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
          },
        },
        // toolbox: {
        //   feature: {
        //     dataView: { show: true, readOnly: false },
        //     magicType: { show: true, type: ['line', 'bar'] },
        //     restore: { show: true },
        //     saveAsImage: { show: true },
        //   },
        // },
        legend: {
          left: 'center',
          top: '5%',
        },
        xAxis: [
          {
            type: 'category',
            data: this.xAxisData,
            axisPointer: {
              type: 'shadow',
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            // name: '产量',
            // min: 0,
            // max: 250,
            // interval: 50,
            // axisLabel: {
            //   formatter: '{value} ml',
            // },
          },
          {
            type: 'value',
            // name: '百分比',
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: '{value} %',
            },
          },
        ],
        series: this.series,
      });
    },
  },
};
</script>

<style scoped>
</style>
