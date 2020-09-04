import {
  createConnection,
  getConnection,
  Entity,
  getRepository,
} from 'typeorm';

import MetricsCollector from './MetricsCollector';
import { Metric } from '../../db/models/Metrics';

@Entity()
class TestMetric extends Metric {}

type CollectorData = {
  id: number;
  data: number;
};

const mockCollector = jest.fn(
  () =>
    new Promise<CollectorData>(() => {
      return {
        id: 1,
        data: 2,
      };
    }),
);

beforeEach(() => {
  return createConnection({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [TestMetric],
    synchronize: true,
    logging: false,
  });
});

afterEach(() => {
  const conn = getConnection();
  return conn.close();
});

it('should be instantiated with the collector', () => {
  const collector = new MetricsCollector(
    'test',
    mockCollector,
    '1s',
    (data) => ({ value: data.data, unit: 'px' }),
    TestMetric,
  );

  collector.start();
  collector.stop();
});
