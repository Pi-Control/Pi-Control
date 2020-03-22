import debug from 'debug';

import Metrics from '../../models/Metrics';
import Scheduler from '../scheduler/Scheduler';

export const logger = debug('metrics-collector');

type Collection = { value: number; unit: string };

// TODO: Add specific intervals(every 5s).

class MetricsCollector<T> {
  private type: string;

  private collector: () => Promise<T>;

  private scrapeInterval: string;

  private transformer: (data: T) => Collection;

  private targetTable: typeof Metrics;

  constructor(
    type: string,
    collector: () => Promise<T>,
    scrapeInterval: string,
    transformer: (data: T) => Collection,
    targetTable: typeof Metrics
  ) {
    this.type = type;
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
            type: this.type,
            value: formattedData.value,
            unit: formattedData.unit,
            timestamp: Date.now(),
          })
          .then(() => {
            logger('scrape succesful for: ', this.targetTable.tableName);
          });
      });
    }).every(this.scrapeInterval);
  }
}

export default MetricsCollector;
