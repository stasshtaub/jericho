import Vue from "vue";
import Vuex from "vuex";

import filters from "./modules/filters";
import stats from "./modules/stats";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    filters,
    stats
  }
});
