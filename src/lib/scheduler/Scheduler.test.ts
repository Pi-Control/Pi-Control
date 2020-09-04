import { mocked } from 'ts-jest/utils';

import Scheduler from './Scheduler';
import ScheduledTask from './ScheduledTask';

jest.mock('./ScheduledTask');

beforeEach(() => {
  mocked(ScheduledTask).mockClear();
});

it('should create a scheduled task', () => {
  const task = jest.fn();

  Scheduler.call(task);

  expect(ScheduledTask).toBeCalledTimes(1);
});
