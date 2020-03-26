<template>
  <div>
    <div class="small">
      <line-chart :chart-data="memoryChartData" :options="options"></line-chart>
    </div>
    <div class="small">
      <line-chart :chart-data="cpuChartData" :options="options"></line-chart>
    </div>
  </div>
</template>

<script>
import LineChart from './LineChart.js';

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
      const dice = 3;
      const sides = 6;
      const query = `
query {
  metrics {
    memory {type value timestamp}
    cpu {type value timestamp}
  }
}`;

      fetch('http://192.168.2.58:3000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { dice, sides },
        }),
      })
        .then(r => r.json())
        .then(data => {
          const memoryData = data.data.metrics.memory;
          const cpuData = data.data.metrics.cpu.filter(
            cpu => cpu.type === 'cpu_temperature'
          );

          const cpuSpeed = data.data.metrics.cpu.filter(
            cpu => cpu.type === 'cpu_speed'
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
                label: 'Memory Usage',
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
                label: 'CPU Speed',
                borderColor: '#303F9F',
                backgroundColor: 'rgba(48,63,159, 0.3)',
                data: cpuSpeed.map(mem => mem.value),
              },
              {
                label: 'CPU Temperature',
                borderColor: '#d32f2f',
                backgroundColor: 'rgba(211,47,47, 0.3)',
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
