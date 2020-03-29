import { users, Systeminformation } from 'systeminformation';

export default {
  users: async (): Promise<Systeminformation.UserData[]> => users(),
};
