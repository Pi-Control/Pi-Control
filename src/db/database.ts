import { createConnection, Connection } from 'typeorm';

import User from './models/User';
import { CpuMetrics, MemoryMetrics } from './models/Metrics';

export function establishConnection(): Promise<Connection> {
  return createConnection({
    type: 'sqlite',
    database: ':memory:',
    entities: [User, CpuMetrics, MemoryMetrics],
    synchronize: true,
  });
}
