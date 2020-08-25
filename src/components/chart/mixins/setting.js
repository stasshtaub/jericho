import { mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  mixins: [reactiveProp],
  data: () => ({
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
            },
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  }),
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
