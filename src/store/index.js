import Vue from "vue";
import Vuex from "vuex";

import filters from "./modules/filters";
import stats from "./modules/stats";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    filters,
    stats
  },
  state: {
    error: {
      hasError: false,
      errorObj: null,
      message: ""
    }
  },
  mutations: {
    setError: (state, { message, errorObj }) => {
      state.error = { ...state.error, hasError: true, message, errorObj };
    },
    clearError: state => {
      state.error = {
        hasError: false,
        errorObj: null,
        message: ""
      };
    }
  },
  getters: {
    error: s => s.error
  }
});
