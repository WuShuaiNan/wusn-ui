<!--使用dataV加载组件的加载蒙版组件,效果很酷，但是需要引入dataV-->
<template>
  <div :style="{
    backgroundColor,
    height,
    width,
    zIndex
  }">
    <dv-loading :style="loadingStyle">Loading...</dv-loading>
  </div>
</template>

<script>
export default {
  name: 'LoadingMask',
  props: {
    backgroundColor: {
      type: String,
      default: 'rgb(255, 255, 255, 0)',
    },
    height: {
      type: String,
      default: '100%',
    },
    width: {
      type: String,
      default: '100%',
    },
    zIndex: {
      type: String,
      default: '0',
    },
    loadingStyle: {
      type: String,
      default: '',
    },
  },
};
</script>
