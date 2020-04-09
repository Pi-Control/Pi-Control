import { networkInterfaces, Systeminformation } from 'systeminformation';

export default {
  Query: {
    network: async (): Promise<Systeminformation.NetworkInterfacesData[]> =>
      networkInterfaces(),
  },
};
