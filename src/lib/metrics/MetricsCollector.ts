import debug from 'debug';

import Metrics from '../../models/Metrics';
import Scheduler from '../scheduler/Scheduler';

export const logger = debug('metrics-collector');

type Collection = { value: number; unit: string };

// TODO: Add specific intervals(every 5s). e.g. 10:05, 10:10, 10:15

class MetricsCollector<T> {
  private collector: () => Promise<T>;

  private scrapeInterval: string;

  private transformer: (data: T) => Collection;

  private targetTable: typeof Metrics;

  constructor(
    collector: () => Promise<T>,
    scrapeInterval: string,
    transformer: (data: T) => Collection,
    targetTable: typeof Metrics
  ) {
    this.collector = collector;
    this.scrapeInterval = scrapeInterval;
    this.transformer = transformer;
    this.targetTable = targetTable;
  }

  public start(): void {
    Scheduler.call(() => {
      this.collector().then(data => {
        const formattedData = this.transformer(data);

        this.targetTable
          .create({
            value: formattedData.value,
            unit: formattedData.unit,
          })
          .then(() => {
            logger('scrape succesful', this.targetTable.tableName);
          });
      });
    }).every(this.scrapeInterval);
  }
}

export default MetricsCollector;
