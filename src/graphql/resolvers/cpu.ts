import { cpu, Systeminformation } from 'systeminformation';

export default {
  cpu: async (): Promise<Systeminformation.CpuData> => cpu(),
};
