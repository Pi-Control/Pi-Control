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

    const onReady = () => {
      Scheduler.instance().activeSchedulers.push(scheduledTask);
      logger(`Registered new task with id ${Scheduler.instance().idState}.`);
    };

    const onFinished = (id: number) => {
      logger(`Task with id ${id} finished.`);
      const taskIndex = Scheduler.instance().activeSchedulers.findIndex(
        (t) => t.id === id,
      );
      if (taskIndex >= 0) {
        Scheduler.instance().activeSchedulers.slice(taskIndex, 1);
      }
    };

    const scheduledTask = new ScheduledTask(
      Scheduler.instance().idState,
      task,
      onReady,
      onFinished,
    );

    return scheduledTask;
  }

  public static stop(id: number): void {
    const task = Scheduler.instance().activeSchedulers.find(
      (scheduler) => scheduler.id === id,
    );

    if (task) {
      task.stop();
    } else {
      logger(`No task with id ${id} running`);
    }
  }
}
