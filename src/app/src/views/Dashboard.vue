<template>
  <div class="Dashboard">
    <div class="small">
      <line-chart :chart-data="memoryChartData" :options="options"></line-chart>
    </div>
    <div class="small">
      <line-chart :chart-data="cpuChartData" :options="options"></line-chart>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.js';

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      cpuChartData: null,
      memoryChartData: null,

      options: {
        responsive: true,
        maintainAspectRatio: false,

        elements: {
          line: {
            tension: 0,
          },
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 0,
          },
        },
      },
    };
  },
  mounted() {
    this.fetchData();

    setInterval(() => {
      this.fetchData();
    }, 5000);
  },

  methods: {
    fetchData() {
      const query = `
query {
  metricsCpu {type value timestamp}
  metricsMemory {type value timestamp}
}`;

      fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ query }),
      })
        .then(r => r.json())
        .then(data => {
          const memoryData = data.data.metricsMemory;
          const cpuData = data.data.metricsCpu.filter(
            cpu => cpu.type === 'cpu_temperature'
          );

          const cpuSpeed = data.data.metricsCpu.filter(
            cpu => cpu.type === 'cpu_load'
          );

          this.memoryChartData = {
            labels: memoryData.map(mem => {
              const date = new Date(parseInt(mem.timestamp, 10));
              return (
                date.getHours() +
                ':' +
                date.getMinutes() +
                ':' +
                date.getSeconds()
              );
            }),
            datasets: [
              {
                label: 'Memory Usage (MB)',
                borderColor: '#d32f2f',
                backgroundColor: 'rgba(211,47,47, 0.3)',
                data: memoryData.map(mem =>
                  (mem.value / 1000 / 1000).toFixed(2)
                ),
              },
            ],
          };

          this.cpuChartData = {
            labels: cpuData.map(mem => {
              const date = new Date(parseInt(mem.timestamp, 10));
              return (
                date.getHours() +
                ':' +
                date.getMinutes() +
                ':' +
                date.getSeconds()
              );
            }),
            datasets: [
              {
                label: 'CPU Load (%)',
                borderColor: '#303F9F',
                backgroundColor: 'rgba(48,63,159, 0.3)',
                data: cpuSpeed.map(mem => mem.value),
              },
              {
                label: 'CPU Temperature (°C)',
                borderColor: '#d32f2f',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                data: cpuData.map(mem => mem.value),
              },
            ],
          };
        });
    },
  },
};
</script>

<style>
.small {
  max-width: 80%;
  margin: 50px auto;
}
</style>
