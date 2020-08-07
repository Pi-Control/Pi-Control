import CpuMetrics from '../../db/models/CpuMetrics';
import MemoryMetrics from '../../db/models/MemoryMetrics';

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
