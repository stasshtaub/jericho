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
  addOutlet: async ({ commit }, name) => {
    try {
      const { id } = await Axios.post(`/outlets`, null, {
        params: {
          name
        }
      });
      commit("addOutlet", { id, name });
    } catch (errorObj) {
      const message = "Не удалось добавить точку продаж";
      commit("setError", { message, errorObj }, { root: true });
    }
  }
};
