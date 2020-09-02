import { CronJob } from 'cron';
import moment from 'moment';

type EventCallback = (id: number) => void;

// TODO: Add more explicit regex checks
const msRegex = /^\d+ms$/;
const secRegex = /^\d+s$/;
const minRegex = /^\d+m$/;
const hourRegex = /^\d+h$/;
const dayRegex = /^\d+d$/;
const monthRegex = /^\d+M$/;
const yearRegex = /^\d+y$/;

class ScheduledTask {
  public readonly id: number;

  private onReady?: EventCallback;

  private onFinished?: EventCallback;

  private task: () => void;

  private cronJob?: CronJob;

  constructor(
    id: number,
    task: () => void,
    onReady?: EventCallback,
    onFinished?: EventCallback,
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

  public every(value: string, executions = -1): number {
    let cron = '';
    switch (true) {
      case secRegex.test(value):
        cron = `*/${parseInt(value, 10)} * * * * *`;
        break;
      case minRegex.test(value):
        cron = `0 */${parseInt(value, 10)} * * * *`;
        break;
      case hourRegex.test(value):
        cron = `0 0 */${parseInt(value, 10)} * * *`;
        break;
      case dayRegex.test(value):
        cron = `0 0 0 */${parseInt(value, 10)} * *`;
        break;
      case monthRegex.test(value):
        cron = `0 0 0 0 */${parseInt(value, 10)} *`;
        break;
      case yearRegex.test(value):
        cron = `0 0 0 0 0 */${parseInt(value, 10)}`;
        break;
      default:
        throw new Error('Value does not fit the pattern (xx s|m|h|y)');
    }

    this.runCron(cron, executions);

    return this.id;
  }

  public in(value: string): number {
    let cronTime: moment.Moment;

    switch (true) {
      case msRegex.test(value):
        cronTime = moment().add(parseInt(value, 10), 'milliseconds');
        break;
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
        throw new Error('Value does not fit the pattern (xx ms|s|m|h|y)');
    }

    this.runCron(cronTime);

    return this.id;
  }

  public custom(value: string | moment.Moment): number {
    this.runCron(value);

    return this.id;
  }

  private runCron(cronTime: string | moment.Moment, executions = 1): void {
    // call all events immediately and return without starting the cronjob
    if (executions === 0) {
      this.isReady();
      this.hasFinished();
      return;
    }

    const infinityTask = executions === -1;
    let executionsLeft = executions;

    const task = infinityTask
      ? this.task
      : () => {
          this.task();
          executionsLeft--;
          if (executionsLeft <= 0) {
            this.stop();
          }
        };

    this.cronJob = new CronJob(cronTime, task, this.hasFinished.bind(this));
    this.isReady();
    this.cronJob.start();
  }

  private isReady() {
    if (this.onReady) {
      this.onReady(this.id);
    }
  }

  private hasFinished() {
    if (this.onFinished) {
      this.onFinished(this.id);
    }
  }
}

export default ScheduledTask;
