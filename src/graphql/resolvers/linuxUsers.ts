import { users, Systeminformation } from 'systeminformation';

export default {
  Query: {
    linuxUsers: async (): Promise<Systeminformation.UserData[]> => users(),
  },
};
