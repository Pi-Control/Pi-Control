import CpuMetrics from '../../models/CpuMetrics';
import MemoryMetrics from '../../models/MemoryMetrics';

export default {
  metrics: {
    cpu(): Promise<CpuMetrics[]> {
      return CpuMetrics.findAll();
    },

    memory(): Promise<MemoryMetrics[]> {
      return MemoryMetrics.findAll();
    },
  },
};
