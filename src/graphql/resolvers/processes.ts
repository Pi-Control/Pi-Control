import { processes, Systeminformation } from 'systeminformation';

export default {
  Query: {
    processes: async (): Promise<Systeminformation.ProcessesData> =>
      processes(),
  },

  Mutation: {
    killProcess: async (
      parent: void,
      {
        pid,
        signal = 15,
      }: {
        pid: number;
        signal: number;
      }
    ): Promise<boolean> => {
      // TODO: Move to lib
      await process.kill(pid, signal);
      return true;
    },
  },
};
