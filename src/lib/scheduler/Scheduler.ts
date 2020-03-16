import ScheduledTask from './ScheduledTask';
import debug from 'debug';

export const logger = debug('scheduler');

let INSTANCE: Scheduler;

export default class Scheduler {
  private idState = 0;

  private activeSchedulers: ScheduledTask[] = [];

  private constructor() {
    //
  }

  private static instance(): Scheduler {
    if (!INSTANCE) {
      INSTANCE = new Scheduler();
    }
    return INSTANCE;
  }

  public static call(task: () => void): ScheduledTask {
    Scheduler.instance().idState += 1;

    const scheduledTask = new ScheduledTask(
      Scheduler.instance().idState,
      task,
      () => {
        Scheduler.instance().activeSchedulers.push(scheduledTask);
        logger(`Registered new task with id ${Scheduler.instance().idState}.`);
      },
      id => {
        logger(`Task with id ${id} finished.`);
        const taskIndex = Scheduler.instance().activeSchedulers.findIndex(
          t => t.id === id
        );
        Scheduler.instance().activeSchedulers.slice(taskIndex, 1);
      }
    );

    return scheduledTask;
  }
}
