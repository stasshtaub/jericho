import Axios from "../../../../plugins/axios";

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
};
