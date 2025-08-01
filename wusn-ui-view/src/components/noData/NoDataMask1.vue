<template>
  <div class="container">
    <div class="lottie" id="lottie"></div>
  </div>
</template>

<script>
import lottie from 'lottie-web';
import noData from '@/assets/img/noData/noData.json';

export default {
  name: 'NoDataMask1',
  data() {
    return {
      animation: {},
    };
  },
  mounted() {
    this.animation = lottie.loadAnimation({
      container: document.getElementById('lottie'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: noData,
    });
    this.animation.play();
  },
  beforeDestroy() {
    this.animation.destroy();
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  display:flex;
  justify-content:center;
  align-items:center;
  .lottie {
    width: 50%;
    height: 50%;
  }
}
</style>
