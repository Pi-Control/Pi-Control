<template>
  <div class="processes">
    <table border="1">
      <thead>
        <tr>
          <th>PID</th>
          <th>Name</th>
          <th>User</th>
          <th>State</th>
          <th>Path</th>
          <th>Running since</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in processData" :key="index">
          <td v-text="data.pid" />
          <td v-text="data.name" />
          <td v-text="data.user" />
          <td v-text="data.state" />
          <td v-text="data.path" />
          <td v-text="data.started" />
          <td>
            <a href="#" @click="killProcess(data.pid)">Kill</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Network extends Vue {
  processData = [];

  mounted() {
    this.fetchData();
  }

  fetchData() {
    const query = `
query {
  processes {
    list {pid state name user started path}
  }
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
        this.processData = data.data.processes.list;
      });
  }

  killProcess(pid: number): void {
    const query = `
mutation {
  killProcess(pid: ${pid})
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
        console.log(data);
      });
  }
}
</script>
<style lang="scss" scoped>
.processes {
  display: flex;
  justify-content: center;
}
</style>
