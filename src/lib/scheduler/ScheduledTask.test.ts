import ScheduledTask from './ScheduledTask';

it('should call the task after 50ms±20ms', (done) => {
  const taskID = 0;
  const milliseconds = 50;
  const start = process.hrtime.bigint();

  new ScheduledTask(taskID, () => {
    const end = process.hrtime.bigint();

    const timerMillis = Number((end - start) / BigInt(1e6));

    expect(timerMillis - milliseconds).not.toBeGreaterThan(20);

    done();
  }).in(milliseconds + 'ms');
});

it('should fail if the input is invalid', () => {
  const taskID = 0;
  const task = jest.fn();

  const scheduledTask = new ScheduledTask(taskID, task);

  const testValues = ['100', 'ms', '-100ms'];
  testValues.forEach((val) => {
    const t = () => {
      scheduledTask.in(val);
    };
    expect(t).toThrow(Error);
  });

  expect(task).not.toHaveBeenCalled();
});

it('should call onFinished after the task has finished', (done) => {
  const taskID = 0;
  const onReady = jest.fn();
  const task = jest.fn();

  const onFinished = () => {
    expect(task).toHaveBeenCalled();
    done();
  };

  new ScheduledTask(taskID, task, onReady, onFinished).in('50ms');

  expect(onReady).toHaveBeenCalled();
});

it('should call the task every 1s and succeed after two executions', (done) => {
  const taskID = 0;
  const onReady = jest.fn();
  const task = jest.fn();

  const onFinished = () => {
    expect(onReady).toHaveBeenCalledTimes(1);
    expect(task).toHaveBeenCalledTimes(2);
    done();
  };

  new ScheduledTask(taskID, task, onReady, onFinished).every('1s', 2);
});

it('should stop immediately and dont call the task', (done) => {
  const taskID = 0;
  const onReady = jest.fn();
  const task = jest.fn();

  const onFinished = () => {
    expect(task).toHaveBeenCalledTimes(0);
    done();
  };

  new ScheduledTask(taskID, task, onReady, onFinished).every('1s', 0);

  expect(onReady).toHaveBeenCalledTimes(1);
});

it('should handle custom cronjob syntax', (done) => {
  const taskID = 0;
  const onReady = jest.fn();
  const task = jest.fn();

  const onFinished = () => {
    expect(task).toHaveBeenCalledTimes(1);
    done();
  };

  new ScheduledTask(taskID, task, onReady, onFinished).custom('*/1 * * * * *');

  expect(onReady).toHaveBeenCalledTimes(1);
});
