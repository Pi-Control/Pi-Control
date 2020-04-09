import { users, Systeminformation } from 'systeminformation';

export default {
  Query: {
    users: async (): Promise<Systeminformation.UserData[]> => users(),
  },
};
