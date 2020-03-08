import { mem, Systeminformation } from 'systeminformation';

export default {
  memory: async (): Promise<Systeminformation.MemData> => mem(),
};
