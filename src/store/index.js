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
    setError: (state, { message, error }) => {
      console.log("in mutation setError");

      state.error.hasError = true;
      state.error.errorObj = error;
      state.error.message = message;
    },
    clearError: state => {
      console.log("clear error");

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
