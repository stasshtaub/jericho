<template>
  <div class="stats-sales">
    <p class="text-h6">
      Статистика продаж
    </p>
    <div class="stats-sales__formats">
      <p>
        Форма представления данных:
      </p>
      <v-radio-group row>
        <v-radio
          v-for="format in formats"
          :key="format.id"
          :label="format.name"
          :value="format.id"
        ></v-radio>
      </v-radio-group>
    </div>
    <div style="max-width: 800px">
      <chart :chartdata="chartdata" :options="options" />
    </div>
  </div>
</template>

<script>
export default {
  name: "stats-sales",
  components: {
    chart: () => import("./chart")
  },
  data: () => ({
    formats: [
      { id: 0, name: "Табличная" },
      { id: 1, name: "Схематичная" }
    ],
    chartdata: {
      labels: [
        "Обратившиеся клиенты",
        "Уточнение информации",
        "Клиенты, которые приобрели товар"
      ],
      datasets: [
        {
          label: "Процент",
          backgroundColor: ["red", "blue", "green"],
          data: [80, 60, 20]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        displayColors: false
      },
      scales: {
        xAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: false
            }
          }
        ]
      }
    }
  })
};
</script>

<style></style>
