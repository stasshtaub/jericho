import Axios from "../../../../plugins/axiosMocked";

export default {
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
};
