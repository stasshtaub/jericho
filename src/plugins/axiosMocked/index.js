import Axios from "axios";

import MockAdapter from "axios-mock-adapter";
import stats from "./mock/stats";
import settings from "./mock/settings";
const mock = new MockAdapter(Axios);
mock
  .onGet(
    /\/stats\?outlets=.+&date_start=\d+&date_end=\d+&target=\d+&category=\d+&brans=.+/
  )
  .reply(200, stats);
mock.onGet("/settings").reply(200, settings);
mock.onPost("/outlets").reply(200);

export default Axios;
