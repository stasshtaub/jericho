import { HorizontalBar } from "vue-chartjs";
import settings from "./mixins/setting";

export default {
  extends: HorizontalBar,
  mixins: [settings]
};
