import { cpuTemperature, Systeminformation, cpu, mem } from 'systeminformation';

import MetricsCollector from '../lib/metrics/MetricsCollector';

import CpuMetrics from '../models/CpuMetrics';
import MemoryMetrics from '../models/MemoryMetrics';

let cpuSpeedMetrics: MetricsCollector<Systeminformation.CpuData>;
let cpuTemperatureMetrics: MetricsCollector<Systeminformation.CpuTemperatureData>;

let memoryAvailableMetrics: MetricsCollector<Systeminformation.MemData>;

const scrapeInterval = '5s';

export function initializeMetrics(): void {
  cpuSpeedMetrics = new MetricsCollector(
    'cpu_speed',
    cpu,
    scrapeInterval,
    data => ({ value: parseFloat(data.speed), unit: 'GHz' }),
    CpuMetrics
  );

  cpuTemperatureMetrics = new MetricsCollector(
    'cpu_temperature',
    cpuTemperature,
    scrapeInterval,
    data => ({ value: data.main, unit: 'Degress' }),
    CpuMetrics
  );

  memoryAvailableMetrics = new MetricsCollector(
    'mem_available',
    mem,
    scrapeInterval,
    data => ({ value: data.available, unit: 'Byte' }),
    MemoryMetrics
  );
}

export function startCollecting(): void {
  if (cpuSpeedMetrics) {
    cpuSpeedMetrics.start();
  }

  if (cpuTemperatureMetrics) {
    cpuTemperatureMetrics.start();
  }

  if (memoryAvailableMetrics) {
    memoryAvailableMetrics.start();
  }
}
