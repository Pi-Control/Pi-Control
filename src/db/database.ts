import { createConnection, Connection } from 'typeorm';

import User from './models/User';
import Group from './models/Group';
import Right from './models/Right';
import { CpuMetric, MemoryMetric } from './models/Metrics';

export function establishConnection(): Promise<Connection> {
  return createConnection({
    type: 'sqlite',
    database: ':memory:',
    entities: [User, Group, Right, CpuMetric, MemoryMetric],
    synchronize: true,
  });
}
