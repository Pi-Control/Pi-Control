<template>
  <div class="general">
    <h3>Memory</h3>
    <table width="400" border="1">
      <thead>
        <tr>
          <th>Total</th>
          <th>Swap</th>
          <th>Buffers</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ (memoryData.total / 1000 / 1000).toFixed(2) }} MB</td>
          <td>{{ (memoryData.swaptotal / 1000 / 1000).toFixed(2) }} MB</td>
          <td>{{ (memoryData.buffers / 1000 / 1000).toFixed(2) }} MB</td>
        </tr>
      </tbody>
    </table>
    <h3>CPU</h3>
    <table width="400" border="1">
      <thead>
        <tr>
          <th>Manufacturer</th>
          <th>Vendor</th>
          <th>Speed</th>
          <th>Cores</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ cpuData.manufacturer }}</td>
          <td>{{ cpuData.vendor }}</td>
          <td>{{ cpuData.speedmin }}GHz - {{ cpuData.speedmax }}GHz</td>
          <td>{{ cpuData.physicalCores }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class General extends Vue {
  memoryData = [];
  cpuData = [];

  mounted() {
    this.fetchData();
  }

  fetchData() {
    const query = `
query {
  cpu {manufacturer vendor speedmin speedmax physicalCores}
  memory {total swaptotal buffers}
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
        this.memoryData = data.data.memory;
        this.cpuData = data.data.cpu;
      });
  }
}
</script>

<style lang="scss" scoped>
.general {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
