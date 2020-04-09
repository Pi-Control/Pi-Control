import { processes, Systeminformation } from 'systeminformation';
import { exec } from 'child_process';

export default {
  Query: {
    processes: async (): Promise<Systeminformation.ProcessesData> =>
      processes(),
  },

  Mutation: {
    killProcess: ({ pid }: { pid: number }): Promise<boolean> => {
      return new Promise<boolean>((resolve, reject) => {
        // TODO: Move to lib
        exec(`kill ${pid}`, (error, stdout, stderr) => {
          if (error) {
            reject(stderr);
          } else {
            resolve(true);
          }
        });
      });
    },
  },
};
