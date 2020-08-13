import { cpu, mem, Systeminformation } from 'systeminformation';

import { CpuMetrics, MemoryMetrics } from '../../db/models/Metrics';

export default {
  Query: {
    currentCpu: async (): Promise<Systeminformation.CpuData> => cpu(),

    currentMemory: async (): Promise<Systeminformation.MemData> => mem(),

    historyCpu(): Promise<CpuMetrics[]> {
      return CpuMetrics.find();
    },

    historyMemory(): Promise<MemoryMetrics[]> {
      return MemoryMetrics.find();
    },
  },
};
