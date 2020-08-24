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
      <div v-if="filled" style="max-width: 800px">
        <v-data-table
          v-if="formats.selected == 0"
          :headers="table.headers"
          :items="sources"
          hide-default-footer
          class="elevation-1"
        >
        </v-data-table>
        <chart v-else :chartdata="chartdata" :options="options" />
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
    filled: false,
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
    },
    chartdata: {
      labels: [],
      datasets: [
        {
          label: "Процент",
          backgroundColor: ["red", "blue", "green"],
          data: []
        }
      ]
    }
  }),
  mounted() {
    this.sources.forEach(source => {
      this.chartdata.labels.push(source.name);
      this.chartdata.datasets[0].data.push(source.percent);
    });
    this.filled = true;
  }
};
</script>
