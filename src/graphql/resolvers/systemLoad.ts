import { currentLoad, Systeminformation } from 'systeminformation';

export default {
  Query: {
    systemLoad: async (): Promise<Systeminformation.CurrentLoadData> =>
      currentLoad(),
  },
};
