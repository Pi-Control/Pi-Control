import { mem, Systeminformation } from 'systeminformation';

export default {
  Query: {
    memory: async (): Promise<Systeminformation.MemData> => mem(),
  },
};
