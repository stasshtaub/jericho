import actions from "./partials/actions";
import mutations from "./partials/mutations";
import getters from "./partials/getters";

export default {
  namespaced: true,
  state: () => ({
    stats: null
  }),
  actions,
  mutations,
  getters
};
