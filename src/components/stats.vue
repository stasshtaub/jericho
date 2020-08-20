<template>
  <div class="stats pa-4">
    <stats-sales class="mt-8" :sales="stats.sales" />
    <stats-source class="mt-8" :sources="stats.sources" />
  </div>
</template>

<script>
export default {
  name: "stats",
  components: {
    statsSales: () => import("./stats-sales"),
    statsSource: () => import("./stats-source")
  },
  props: {
    stats: { type: Object, default: () => {} }
  }
};
</script>
