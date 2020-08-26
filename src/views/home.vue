<template>
  <div>
    <filters />
    <stats v-if="stats" :stats="stats" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import filters from "@/components/filters/index";
import stats from "@/components/stats/index";

export default {
  components: {
    filters,
    stats
  },
  computed: {
    ...mapGetters("stats", ["stats"])
  }
};
</script>
