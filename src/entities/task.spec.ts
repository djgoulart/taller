import { describe, it, expect } from 'vitest';
import { Task, ITask } from './task';

describe('Task Entity', () => {
  it('should create a new task with the correct properties', () => {
    const taskData: ITask = {
      id: 1,
      title: 'Sample Task',
      completed: false,
    };

    const task = new Task(taskData);

    expect(task.id).toBe(taskData.id);
    expect(task.title).toBe(taskData.title);
    expect(task.completed).toBe(taskData.completed);
  });

  it('should allow updating the title via the setter', () => {
    const task = new Task({
      id: 2,
      title: 'Original Title',
      completed: false,
    });

    task.title = 'Updated Title';

    expect(task.title).toBe('Updated Title');
  });

  it('should allow updating the completed status via the setter', () => {
    const task = new Task({
      id: 3,
      title: 'Check Completed',
      completed: false,
    });

    task.completed = true;

    expect(task.completed).toBe(true);
  });

  it('should retain the updated title and completed status', () => {
    const task = new Task({
      id: 4,
      title: 'Some Task',
      completed: false,
    });

    task.title = 'Another Title';
    task.completed = true;

    expect(task.title).toBe('Another Title');
    expect(task.completed).toBe(true);
  });
});
