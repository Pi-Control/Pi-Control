import CpuMetrics from '../../models/CpuMetrics';
import MemoryMetrics from '../../models/MemoryMetrics';

export default {
  Query: {
    metrics: (): {} => ({ cpu: null, memory: null }),
  },

  MetricsCollection: {
    cpu(): Promise<CpuMetrics[]> {
      return CpuMetrics.findAll();
    },

    memory(): Promise<MemoryMetrics[]> {
      return MemoryMetrics.findAll();
    },
  },
};
