<template>
  <div class="network">
    <table border="1">
      <thead>
        <tr>
          <th>Interface</th>
          <th>IPv4 Address</th>
          <th>IPv6 Address</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in networkData" :key="index">
          <td v-text="data.ifaceName" />
          <td v-text="data.ip4" />
          <td v-text="data.ip6" />
          <td v-text="data.type" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Network extends Vue {
  networkData = [];

  mounted() {
    this.fetchData();
  }

  fetchData() {
    const query = `
query {
  network {ifaceName ip4 ip6 type}
}`;

    fetch('http://192.168.2.58:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query }),
    })
      .then(r => r.json())
      .then(data => {
        this.networkData = data.data.network;
      });
  }
}
</script>

<style lang="scss" scoped>
.network {
  display: flex;
  justify-content: center;
}
</style>
