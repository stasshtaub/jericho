import Axios from "../../../../plugins/axios";

export default {
  getSettings: async ({ commit }) => {
    try {
      const { data } = await Axios.get("/settings");
      commit("setSettings", data);
    } catch (errorObj) {
      const message = "Не удалось получить настройки фильтров";
      commit("setError", { message, errorObj }, { root: true });
    }
  },
  addOutlet: async ({ state, commit }, name) => {
    try {
      await Axios.post("/outles", name);
      const id =
        state.settings.outlets[state.settings.outlets.length - 1].id + 1; //fake id
      commit("addOutlet", { id, name });
    } catch (errorObj) {
      const message = "Не удалось добавить точку продаж";
      commit("setError", { message, errorObj }, { root: true });
    }
  }
};
