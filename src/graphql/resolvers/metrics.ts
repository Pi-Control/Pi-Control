import CpuMetrics from '../../models/CpuMetrics';
import MemoryMetrics from '../../models/MemoryMetrics';

export default {
  Query: {
    metricsCpu(): Promise<CpuMetrics[]> {
      return CpuMetrics.findAll();
    },

    metricsMemory(): Promise<MemoryMetrics[]> {
      return MemoryMetrics.findAll();
    },
  },
};
