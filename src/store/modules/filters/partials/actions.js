import Axios from "../../../../plugins/axiosMocked";

export default {
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
  addOutlet: async ({ state, commit }, name) => {
    // await Axios.post("/outles", name);
    // const message = "Не удалось добавить точку продаж";
    // commit("setError", { message, error }, { root: true }); // мутация для логов (глобавльный стор)

    try {
      await Axios.post("/outles", name);
      const id =
        state.settings.outlets[state.settings.outlets.length - 1].id + 1; //fake id
      commit("addOutlet", { id, name });
    } catch (error) {
      const message = "Не удалось добавить точку продаж";
      commit("setError", { message, error }, { root: true }); // мутация для логов (глобавльный стор)
    }
  }
};
