<template>
  <div class="chart" ref="container"/>
</template>

<script>
// noinspection JSUnusedGlobalSymbols
export default {
  name: 'Chart',
  data() {
    return {
      instance: null,
    };
  },
  methods: {
    init() {
      // noinspection JSCheckFunctionSignatures
      this.instance = this.$echarts.init(this.$refs.container);
    },
    addChartResizeListener() {
      // noinspection JSUnresolvedFunction
      const observer = new ResizeObserver(() => {
        this.instance.resize();
      });
      // noinspection All
      observer.observe(this.$refs.container);
    },
    getInstance() {
      return this.instance;
    },
    getOption() {
      if (this.instance == null) {
        return null;
      }
      return this.instance.getOption();
    },
    setOption(option) {
      if (this.instance == null) {
        return;
      }
      this.instance.setOption(option);
    },
    on(eventName, handler) {
      if (this.instance == null) {
        return;
      }
      this.instance.on(eventName, handler);
    },
    onQuery(eventName, query, handler) {
      if (this.instance == null) {
        return;
      }
      this.instance.on(eventName, query, handler);
    },
    off(eventName, handler) {
      if (this.instance == null) {
        return;
      }
      this.instance.off(eventName, handler);
    },
  },
  mounted() {
    // 初始化 echarts 实例。
    this.init();
    // 添加尺寸变化的感知器。
    this.addChartResizeListener();
  },
};
</script>

<style scoped>
.chart {
  height: 100%;
  width: 100%;
}
</style>
