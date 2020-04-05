import { currentLoad, Systeminformation } from 'systeminformation';

export default {
  systemLoad: async (): Promise<Systeminformation.CurrentLoadData> =>
    currentLoad(),
};
