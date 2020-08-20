import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

import MockAdapter from "axios-mock-adapter";
import settings from "./mock/settings";
import stats from "./mock/stats";
const mock = new MockAdapter(Axios);
mock.onGet("/settings").reply(200, settings);
mock
  .onGet(
    /\/stats\?outlets=.+&date_start=\d+&date_end=\d+&target=\d+&category=\d+&brans=.+/
  )
  .reply(200, stats);

Vue.use(Vuex);

export default new Vuex.Store({
  state: () => ({
    settings: {
      outlets: [],
      targets: [],
      categories: [],
      brands: []
    },
    stats: null
  }),
  actions: {
    getSettings: ({ commit }) => {
      return new Promise((resolve, reject) => {
        Axios.get("/settings")
          .then(resp => {
            commit("setSettings", resp.data);
            resolve();
          })
          .catch(err => {
            console.log(err);
            reject();
          });
      });
    },
    getStats: (
      { commit },
      { outlets, dateStart, dateEnd, target, category, brands }
    ) => {
      return new Promise((resolve, reject) => {
        const url = `/stats?outlets=${outlets.join(
          ","
        )}&date_start=${dateStart}&date_end=${dateEnd}&target=${target}&category=${category}&brans=${brands.join(
          ","
        )}`;
        console.log(url);
        Axios.get(url)
          .then(resp => {
            console.log(resp.data);
            commit("setStats", resp.data);
            resolve();
          })
          .catch(err => {
            console.log(err);
            reject();
          });
      });
    }
  },
  mutations: {
    setSettings: (state, settings) => {
      state.settings = settings;
    },
    setStats: (state, stats) => {
      state.stats = stats;
    }
  },
  getters: {
    settings: s => s.settings,
    stats: s => s.stats
  }
});
