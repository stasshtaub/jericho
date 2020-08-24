import actions from "./partials/actions";
import mutations from "./partials/mutations";
import getters from "./partials/getters";

export default {
  namespaced: true,
  state: () => ({
    settings: {
      outlets: [],
      targets: [],
      categories: [],
      brands: []
    }
  }),
  actions,
  mutations,
  getters
};
