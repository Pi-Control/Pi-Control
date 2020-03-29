import { networkInterfaces, Systeminformation } from 'systeminformation';

export default {
  network: async (): Promise<Systeminformation.NetworkInterfacesData[]> =>
    networkInterfaces(),
};
