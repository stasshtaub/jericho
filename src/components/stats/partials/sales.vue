<template>
  <div class="stats-sales">
    <p class="text-h6">Статистика продаж</p>
    <div class="stats-sales__formats">
      <p>Форма представления данных:</p>
      <v-radio-group v-model="formats.selected" row>
        <v-radio
          v-for="format in formats.values"
          :key="format.id"
          :label="format.name"
          :value="format.id"
        ></v-radio>
      </v-radio-group>
    </div>
    <keep-alive>
      <div style="max-width: 800px">
        <v-data-table
          no-data-text="Нет продаж"
          v-if="formats.selected == 0"
          :headers="table.headers"
          :items="sales"
          hide-default-footer
          class="elevation-1"
        >
        </v-data-table>
        <horizontal-chart v-else :chart-data="chartdata" />
      </div>
    </keep-alive>
  </div>
</template>

<script>
import chartMapper from "../../../utils/chart-mapper";
export default {
  name: "stats-sales",
  components: {
    horizontalChart: () => import("../../chart/horizontal-chart")
  },
  props: {
    sales: { type: Array, dafult: () => [] } // [{name: <String>, percent: <Number>, quantity: <Number>}, ...]
  },
  data: () => ({
    formats: {
      selected: 0,
      values: [
        { id: 0, name: "Табличная" },
        { id: 1, name: "Схематичная" }
      ]
    },
    table: {
      headers: [
        {
          text: "Стадия покупки",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Количество людей", value: "quantity" },
        { text: "Доля", value: "percent" }
      ]
    }
  }),
  computed: {
    chartdata() {
      return chartMapper(this.sales);
    }
  }
};
</script>
