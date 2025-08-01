import Vue from 'vue';
import router from '@/router';
import '@/store';
import '@/elements';
import '@/util/http';
import '@/vuex/index';
import echarts from 'echarts';
import dataV from '@jiaminghi/data-view';
import i18n from '@/assets/i18n';
import Vant from 'vant';
import viewFullScreen from 'view-full-screen';
import 'vant/lib/index.css';
import Contextmenu from 'vue-contextmenujs';
// eslint-disable-next-line import/no-extraneous-dependencies
import VCharts from 'v-charts';
import App from './App.vue';
import '@/assets/iconfont/iconfont.css';

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;

Vue.use(dataV);
Vue.use(Vant);
Vue.use(viewFullScreen);
Vue.use(Contextmenu);
Vue.use(VCharts);

new Vue({
  el: '#app',
  router,
  i18n,
  data: {
    Bus: new Vue(),
  },
  render: (h) => h(App),
}).$mount('#app');
