<template>
  <v-sheet class="stats mt-8 pa-4">
    <stats-sales />
  </v-sheet>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "stats",
  components: {
    statsSales: () => import("./stats-sales")
  },
  comuted: {
    ...mapGetters(["stats"])
  }
};
</script>
