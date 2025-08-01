<template>
  <div>
    <div ref="pieChart" id="pieChart" :style="chartStyle">
    </div>
  </div>
</template>

<script>
export default {
  name: 'PieChart',
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
    labelFormat: {
      type: String,
      default: '',
    },
    legendLocation: {
      type: String,
      default: 'center',
    },
    seriesRadius: {
      type: Array,
      default: () => ['20%', '40%'],
    },
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      const { labelFormat } = this;
      // 基于准备好的dom，初始化echarts实例
      const pieChart = this.$echarts.init(this.$refs.pieChart, 'light', {
        renderer: 'svg',
        useDirtyRect: false,
      });
      // 绘制图表
      pieChart.setOption({
        title: {
          text: this.title,
          left: 'left',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)',
        },
        legend: {
          left: this.legendLocation,
          top: '5%',
        },
        series: [
          {
            type: 'pie',
            radius: this.seriesRadius,
            label: {
              show: true,
              formatter(param) {
                if (labelFormat === 'percent') {
                  // return `${param.name}: ${param.percent}%`;
                  return `${param.name}: ${param.value}%`;
                }
                return `${param.name}: ${param.value}`;
              },
            },
            data: this.seriesData,
            center: ['50%', '60%'],
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
</style>
