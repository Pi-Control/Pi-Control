import { CronJob } from 'cron';

type EventCallback = (id: number) => void;

class ScheduledTask {
  public readonly id: number;

  private onReady: EventCallback;

  private onFinished: EventCallback;

  private task: () => void;

  private cronJob?: CronJob;

  private rerun = false;

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
    if (!/^\d{2}(s|m|h|y)$/.test(value)) {
      throw new Error('Value does not fit the pattern (xx s|m|h|y)');
    }

    this.rerun = true;

    this.onReady(this.id);
    this.runCron('');

    return this.id;
  }

  private runCron(cronTime: string): void {
    this.cronJob = new CronJob(cronTime, () => {
      if (this.rerun) {
        this.runCron(cronTime);
      }
      this.task();
    });
  }
}

export default ScheduledTask;

// Scheduler.call(() => {}).every("5s");
