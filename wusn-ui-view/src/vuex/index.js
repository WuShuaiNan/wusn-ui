import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// eslint-disable-next-line import/prefer-default-export
export const store = new Vuex.Store({
  state: {
    axiosArr: [],
  },
  mutations: {
    setAxiosArr: ({ axiosArr }, cancelAjax) => {
      axiosArr.push(cancelAjax.cancel);
    },
    clearAxiosArr: ({ axiosArr }) => {
      axiosArr.forEach((item) => {
        const message = '路由跳转取消请求！';
        item(message);
      });
      // eslint-disable-next-line no-param-reassign
      axiosArr = [];
    },
  },
  actions: {
    setAxiosArr: ({ commit }, cancelAjax) => {
      commit('SET_AXIOS_ARR', cancelAjax);
    },
    clearAxiosArr: ({ commit }) => {
      commit('CLEAR_AXIOS_ARR');
    },
  },
  modules: {},
});
