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
mock.onPost("/outlets").reply(200);

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
    },
    addOutlet: async ({ state, commit }, name) => {
      console.log("add in vuex");
      Axios.post("/outlets", name)
        .then(() => {
          let id =
            state.settings.outlets[state.settings.outlets.length - 1].id + 1; //fake id

          commit("addOutlet", { id, name });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mutations: {
    setSettings: (state, settings) => {
      state.settings = settings;
    },
    setStats: (state, stats) => {
      state.stats = stats;
    },
    addOutlet: (state, outlet) => {
      state.settings.outlets.push(outlet);
    }
  },
  getters: {
    settings: s => s.settings,
    stats: s => s.stats
  }
});
