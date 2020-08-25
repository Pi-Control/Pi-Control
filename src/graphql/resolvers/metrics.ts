import { cpu, mem, Systeminformation } from 'systeminformation';

import { CpuMetric, MemoryMetric } from '../../db/models/Metrics';

export default {
  Query: {
    currentCpu: async (): Promise<Systeminformation.CpuData> => cpu(),

    currentMemory: async (): Promise<Systeminformation.MemData> => mem(),

    historyCpu(): Promise<CpuMetric[]> {
      return CpuMetric.find();
    },

    historyMemory(): Promise<MemoryMetric[]> {
      return MemoryMetric.find();
    },
  },
};
