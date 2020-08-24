<template>
  <div class="stats pa-4">
    <stats-sales class="mt-8" :sales="stats.sales" />
    <stats-sources class="mt-8" :sources="stats.sources" />
  </div>
</template>

<script>
export default {
  name: "stats",
  components: {
    statsSales: () => import("./partials/sales"),
    statsSources: () => import("./partials/sources")
  },
  props: {
    stats: { type: Object, default: () => {} }
  }
};
</script>
