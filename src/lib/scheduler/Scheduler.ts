import ScheduledTask from './ScheduledTask';

class Scheduler {
  private idState = 0;

  private activeSchedulers: ScheduledTask[] = [];

  public call(task: () => void): ScheduledTask {
    this.idState += 1;

    const scheduledTask = new ScheduledTask(
      this.idState,
      task,
      () => {
        this.activeSchedulers.push(scheduledTask);
      },
      id => {
        const taskIndex = this.activeSchedulers.findIndex(t => t.id === id);
        this.activeSchedulers.slice(taskIndex, 1);
      }
    );

    return scheduledTask;
  }
}
