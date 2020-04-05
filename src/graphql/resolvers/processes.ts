import { processes, Systeminformation } from 'systeminformation';

export default {
  processes: async (): Promise<Systeminformation.ProcessesData> => processes(),
};
