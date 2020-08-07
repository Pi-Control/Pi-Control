import {
  cpuTemperature,
  Systeminformation,
  currentLoad,
  mem,
} from 'systeminformation';

import MetricsCollector from '../lib/metrics/MetricsCollector';

import CpuMetrics from '../db/models/CpuMetrics';
import MemoryMetrics from '../db/models/MemoryMetrics';

let cpuLoadMetrics: MetricsCollector<Systeminformation.CurrentLoadData>;
let cpuTemperatureMetrics: MetricsCollector<Systeminformation.CpuTemperatureData>;

let memoryAvailableMetrics: MetricsCollector<Systeminformation.MemData>;

const scrapeInterval = '5s';

export function initializeMetrics(): void {
  cpuLoadMetrics = new MetricsCollector(
    'cpu_load',
    currentLoad,
    scrapeInterval,
    (data) => ({ value: data.currentload, unit: 'Percentage' }),
    CpuMetrics,
  );

  cpuTemperatureMetrics = new MetricsCollector(
    'cpu_temperature',
    cpuTemperature,
    scrapeInterval,
    (data) => ({ value: data.main, unit: 'Degress' }),
    CpuMetrics,
  );

  memoryAvailableMetrics = new MetricsCollector(
    'mem_available',
    mem,
    scrapeInterval,
    (data) => ({ value: data.available, unit: 'Byte' }),
    MemoryMetrics,
  );
}

export function startCollecting(): void {
  if (cpuLoadMetrics) {
    cpuLoadMetrics.start();
  }

  if (cpuTemperatureMetrics) {
    cpuTemperatureMetrics.start();
  }

  if (memoryAvailableMetrics) {
    memoryAvailableMetrics.start();
  }
}
