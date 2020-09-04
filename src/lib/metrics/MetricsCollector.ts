import debug from 'debug';

import { Metric } from '../../db/models/Metrics';
import Scheduler from '../scheduler/Scheduler';

export const logger = debug('metrics-collector');

type Collection = { value: number; unit: string };

// TODO: Add specific intervals(every 5s).

class MetricsCollector<T> {
  private schedulerId?: number;

  private type: string;
  private collector: () => Promise<T>;
  private scrapeInterval: string;
  private transformer: (data: T) => Collection;
  private targetTable: typeof Metric;

  constructor(
    type: string,
    collector: () => Promise<T>,
    scrapeInterval: string,
    transformer: (data: T) => Collection,
    targetTable: typeof Metric,
  ) {
    this.type = type;
    this.collector = collector;
    this.scrapeInterval = scrapeInterval;
    this.transformer = transformer;
    this.targetTable = targetTable;
  }

  public start(): void {
    this.schedulerId = Scheduler.call(() => {
      this.collector().then((data) => {
        const formattedData = this.transformer(data);

        const metric = new this.targetTable();
        metric.type = this.type;
        metric.value = formattedData.value;
        metric.unit = formattedData.unit;
        metric.timestamp = Date.now();
        metric.save().then((metric) => {
          logger('scrape succesful for ', metric.type);
        });
      });
    }).every(this.scrapeInterval);
  }

  public stop(): void {
    if (this.schedulerId) {
      Scheduler.stop(this.schedulerId);
    }
  }
}

export default MetricsCollector;
