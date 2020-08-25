<template>
  <div class="stats pa-4">
    <template v-if="stats.sales.length && stats.sources.length">
      <stats-sales class="mt-8" :sales="stats.sales" />
      <stats-sources class="mt-8" :sources="stats.sources" />
    </template>
    <v-alert v-else type="info">
      Нет продаж, удовлетворяющих фильтрам
    </v-alert>
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
