<template>
  <div class="dashboard">
    <line-chart />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import LineChart from '@/components/LineChart.vue';

@Component({
  components: {
    LineChart,
  },
})
export default class Dashboard extends Vue {}
</script>

<style lang="scss" scoped></style>
