<template>
  <div class="stats-sorce">
    <p class="text-h6">Источник получения информации о предприятии</p>
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
          :items="sources"
          hide-default-footer
          class="elevation-1"
        >
        </v-data-table>
        <chart v-else :chart-data="chartdata" />
      </div>
    </keep-alive>
  </div>
</template>

<script>
export default {
  components: {
    chart: () => import("../../chart/standart-chart")
  },
  props: {
    sources: { type: Array, dafult: () => [] } // [{name: <String>, percent: <Number>}, ...]
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
          text: "Источник получения информации",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Доля", value: "percent" }
      ]
    }
  }),
  computed: {
    chartdata() {
      const chartdata = {
        labels: [],
        datasets: [
          {
            label: "Процент",
            backgroundColor: ["red", "blue", "green"],
            data: []
          }
        ]
      };

      this.sources.forEach(source => {
        chartdata.labels.push(source.name);
        chartdata.datasets[0].data.push(source.percent);
      });

      return chartdata;
    }
  }
};
</script>
