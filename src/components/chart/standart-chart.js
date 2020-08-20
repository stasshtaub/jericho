import { Bar } from "vue-chartjs";
import settings from "./mixins/setting";

export default {
  extends: Bar,
  mixins: [settings]
};
