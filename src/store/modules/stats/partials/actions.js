import Axios from "../../../../plugins/axios";

export default {
  getStats: async (
    { commit },
    { outlets, dateStart, dateEnd, target, category, brands }
  ) => {
    try {
      const url = `/stats?outlets=${outlets.join(
        ","
      )}&date_start=${dateStart}&date_end=${dateEnd}&target=${target}&category=${category}&brands=${brands.join(
        ","
      )}`;
      const { data } = await Axios.get(url);
      commit("setStats", data);
    } catch (errorObj) {
      const message = "Не удалось получить статистику";
      commit("setError", { message, errorObj }, { root: true });
    }
  }
};
