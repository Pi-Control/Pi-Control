import { cpu, Systeminformation } from 'systeminformation';

export default {
  Query: {
    cpu: async (): Promise<Systeminformation.CpuData> => cpu(),
  },
};
