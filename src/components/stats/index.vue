<template>
  <div class="stats pa-4">
    <template v-if="stats.sales.length && stats.sources.length">
      <stats-block
        class="mt-8"
        :table-headers="salesHeaders"
        :table-items="stats.sales"
      >
        <template v-slot:chart>
          <horizontal-chart :chart-data="salesChart" />
        </template>
      </stats-block>
      <stats-block
        class="mt-8"
        :table-headers="sourcesHeaders"
        :table-items="stats.sources"
      >
        <template v-slot:chart>
          <standart-chart :chart-data="sourcesChart" />
        </template>
      </stats-block>
    </template>
    <v-alert v-else type="info">
      Нет продаж, удовлетворяющих фильтрам
    </v-alert>
  </div>
</template>

<script>
import chartMapper from "../../utils/chart-mapper";

export default {
  name: "stats",
  components: {
    statsBlock: () => import("./partials/stats-block"),
    horizontalChart: () => import("../chart/horizontal-chart"),
    standartChart: () => import("../chart/standart-chart")
  },
  props: {
    stats: { type: Object, default: () => {} }
  },
  data: () => ({
    salesHeaders: [
      {
        text: "Стадия покупки",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Количество людей", value: "quantity" },
      { text: "Доля", value: "percent" }
    ],
    sourcesHeaders: [
      {
        text: "Источник получения информации",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Доля", value: "percent" }
    ]
  }),
  computed: {
    salesChart() {
      return chartMapper(this.stats.sales);
    },
    sourcesChart() {
      return chartMapper(this.stats.sources);
    }
  }
};
</script>
