import { CronJob } from 'cron';

type EventCallback = (id: number) => void;

class ScheduledTask {
  public readonly id: number;

  private onReady: EventCallback;

  private onFinished: EventCallback;

  private task: () => void;

  private cronJob?: CronJob;

  private endlessTask = false;

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

  public every(value: string): number {
    this.endlessTask = true;

    // TODO: Add more explicit regex checks
    switch (true) {
      case /^\d+s$/.test(value):
        this.runCron(`*/${parseInt(value, 10)} * * * * *`);
        break;
      case /^\d+m$/.test(value):
        this.runCron(`0 */${parseInt(value, 10)} * * * *`);
        break;
      case /^\d+h$/.test(value):
        this.runCron(`0 0 */${parseInt(value, 10)} * * *`);
        break;
      case /^\d+d$/.test(value):
        this.runCron(`0 0 0 */${parseInt(value, 10)} * *`);
        break;
      case /^\d+M$/.test(value):
        this.runCron(`0 0 0 0 */${parseInt(value, 10)} *`);
        break;
      case /^\d+y$/.test(value):
        this.runCron(`0 0 0 0 0 */${parseInt(value, 10)}`);
        break;
      default:
        throw new Error('Value does not fit the pattern (xx s|m|h|y)');
    }

    return this.id;
  }

  private runCron(cronTime: string): void {
    this.cronJob = new CronJob(cronTime, this.task);
    this.onReady(this.id);
    this.cronJob.start();
  }
}

export default ScheduledTask;
