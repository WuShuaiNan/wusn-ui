<template>
  <chart ref="chart"/>
</template>

<script>
import Chart from '@/components/chart/Chart.vue';

export default {
  name: 'ZoomedNumericChart',
  components: { Chart },
  props: {
    title: {
      type: String,
      default: '标题',
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    showTooltip: {
      type: Boolean,
      default: true,
    },
    hoverAnimation: {
      type: Boolean,
      default: false,
    },
    datas: {
      type: Array,
      default: () => [],
    },
    dataUnit: {
      type: String,
      default: '',
    },
  },
  watch: {
    title(value) {
      this.$refs.chart.setOption({ title: { text: value } });
    },
    showTitle(value) {
      this.$refs.chart.setOption({ title: { show: value } });
    },
    showTooltip(value) {
      this.$refs.chart.setOption({ tooltip: { show: value } });
    },
    hoverAnimation(value) {
      this.$refs.chart.setOption({ series: [{ hoverAnimation: value }] });
    },
    datas(value) {
      this.$refs.chart.setOption({ series: [{ data: value }] });
    },
    dataUnit(newValue) {
      this.$refs.chart.setOption({
        yAxis: {
          name: newValue,
        },
      });
    },
  },
  data() {
    return {
      defaultOption: {
        animation: false,
        title: {
          text: this.title,
          show: this.showTitle,
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            const firstParam = params[0];
            return `${firstParam.data.value[0]} : ${firstParam.data.value[1]}`;
          },
          axisPointer: {
            animation: false,
            axis: 'x',
          },
          show: this.showTooltip,
        },
        grid: {
          left: '3%',
          right: '10%',
          bottom: '7%',
          containLabel: true,
        },
        // toolbox: {
        //   feature: {
        //     dataZoom: {
        //       yAxisIndex: 'none',
        //     },
        //     restore: {},
        //     saveAsImage: {},
        //   },
        // },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          name: this.dataUnit,
          type: 'value',
          splitLine: {
            show: false,
          },
          scale: true,
          // min: 0,
        },
        dataZoom: [
          {
            type: 'slider',
            start: 0,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            },
            minSpan: 10,
          },
        ],
        series: [
          {
            type: 'line',
            symbol: 'none',
            sampling: 'average',
            hoverAnimation: this.hoverAnimation,
            data: this.datas,
          },
        ],
      },
    };
  },
  methods: {
    getDatazoomValue() {
      const datazoom = this.$refs.chart.getOption().dataZoom[0];
      return {
        start: datazoom.start,
        end: datazoom.end,
      };
    },
    setDatazoomValue(value) {
      this.$refs.chart.setOption({ dataZoom: [{ start: value.start, end: value.end }] });
    },
    setMarkLineValue(value) {
      const series = this.$refs.chart.getOption().series[0];
      series.markLine = {
        silent: true,
        label: {
          show: true,
          position: 'end',
          formatter: '{b}:{c}',
        },
        lineStyle: {
          color: '#333',
          // color:'rgba(0, 149, 255, 0.91)'
        },
        data: [
          {
            name: this.$t('numericLegend.averagePeak').toString(),
            type: 'average',
          },
          {
            name: this.$t('numericLegend.lowPeak').toString(),
            type: 'min',
          },
          {
            name: this.$t('numericLegend.highPeak').toString(),
            type: 'max',
          },
        ],
      };
      if (value.lowThreshold) {
        series.markLine.data.push(
          {
            name: this.$t('numericLegend.lowThreshold').toString(),
            yAxis: value.lowThreshold,
            lineStyle: {
              color: 'green',
            },
          },
        );
      }
      if (value.highThreshold) {
        series.markLine.data.push(
          {
            name: this.$t('numericLegend.highThreshold').toString(),
            yAxis: value.highThreshold,
            lineStyle: {
              color: 'red',
            },
          },
        );
      }
      this.$refs.chart.setOption({ series: [series] });
    },
  },
  mounted() {
    this.$refs.chart.setOption(this.defaultOption);
  },

};
</script>

<style scoped>
</style>
