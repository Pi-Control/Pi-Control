import { CronJob } from 'cron';
import moment from 'moment';

type EventCallback = (id: number) => void;

// TODO: Add more explicit regex checks
const secRegex = /^\d+s$/;
const minRegex = /^\d+m$/;
const hourRegex = /^\d+h$/;
const dayRegex = /^\d+d$/;
const monthRegex = /^\d+M$/;
const yearRegex = /^\d+y$/;

class ScheduledTask {
  public readonly id: number;

  private onReady: EventCallback;

  private onFinished: EventCallback;

  private task: () => void;

  private cronJob?: CronJob;

  constructor(
    id: number,
    task: () => void,
    onReady: EventCallback,
    onFinished: EventCallback
  ) {
    this.id = id;
    this.task = task;
    this.onReady = onReady;
    this.onFinished = onFinished;
  }

  public stop(): void {
    if (this.cronJob) {
      this.cronJob.stop();
    }
  }

  public every(value: string): number {
    switch (true) {
      case secRegex.test(value):
        this.runCron(`*/${parseInt(value, 10)} * * * * *`);
        break;
      case minRegex.test(value):
        this.runCron(`0 */${parseInt(value, 10)} * * * *`);
        break;
      case hourRegex.test(value):
        this.runCron(`0 0 */${parseInt(value, 10)} * * *`);
        break;
      case dayRegex.test(value):
        this.runCron(`0 0 0 */${parseInt(value, 10)} * *`);
        break;
      case monthRegex.test(value):
        this.runCron(`0 0 0 0 */${parseInt(value, 10)} *`);
        break;
      case yearRegex.test(value):
        this.runCron(`0 0 0 0 0 */${parseInt(value, 10)}`);
        break;
      default:
        throw new Error('Value does not fit the pattern (xx s|m|h|y)');
    }

    return this.id;
  }

  public in(value: string): number {
    let cronTime: moment.Moment;

    switch (true) {
      case secRegex.test(value):
        cronTime = moment().add(parseInt(value, 10), 'second');
        break;
      case minRegex.test(value):
        cronTime = moment().add(parseInt(value, 10), 'minute');
        break;
      case hourRegex.test(value):
        cronTime = moment().add(parseInt(value, 10), 'hour');
        break;
      case dayRegex.test(value):
        cronTime = moment().add(parseInt(value, 10), 'day');
        break;
      case monthRegex.test(value):
        cronTime = moment().add(parseInt(value, 10), 'month');
        break;
      case yearRegex.test(value):
        cronTime = moment().add(parseInt(value, 10), 'year');
        break;
      default:
        throw new Error('Value does not fit the pattern (xx s|m|h|y)');
    }

    this.runCron(cronTime);

    return this.id;
  }

  public custom(value: string | moment.Moment): number {
    this.runCron(value);

    return this.id;
  }

  private runCron(cronTime: string | moment.Moment): void {
    this.cronJob = new CronJob(cronTime, this.task);
    this.onReady(this.id);
    this.cronJob.start();
  }
}

export default ScheduledTask;
