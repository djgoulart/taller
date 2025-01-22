// tests/in-memory-task-repository.spec.ts

import { describe, it, expect, beforeEach } from 'vitest';
import { InMemoryTaskRepository } from './in-memory-task-repository';
import { NotFoundError } from '../shared/errors/not-found-error';

describe('InMemoryTaskRepository', () => {
  let repository: InMemoryTaskRepository;

  beforeEach(() => {
    repository = new InMemoryTaskRepository();
  });

  describe('listTasks', () => {
    it('should return an empty list initially', () => {
      const tasks = repository.listTasks();
      expect(tasks).toEqual([]);
    });

    it('should return all created tasks', () => {
      const task1 = repository.createTask({ title: 'Task 1', completed: false });
      const task2 = repository.createTask({ title: 'Task 2', completed: true });

      const tasks = repository.listTasks();

      expect(tasks).toHaveLength(2);
      expect(tasks).toContain(task1);
      expect(tasks).toContain(task2);
    });
  });

  describe('createTask', () => {
    it('should create and return a new task', () => {
      const createdTask = repository.createTask({ title: 'New Task', completed: false });
      
      expect(createdTask).toBeDefined();
      expect(createdTask.id).toBe(1);
      expect(createdTask.title).toBe('New Task');
      expect(createdTask.completed).toBe(false);
    });

    it('should increment the ID for each created task', () => {
      const task1 = repository.createTask({ title: 'Task A', completed: false });
      const task2 = repository.createTask({ title: 'Task B', completed: true });

      expect(task1.id).toBe(1);
      expect(task2.id).toBe(2);
    });
  });

  describe('showTask', () => {
    it('should return the existing task by ID', () => {
      const createdTask = repository.createTask({ title: 'Existing Task', completed: false });
      const foundTask = repository.showTask(createdTask.id);

      expect(foundTask).toBe(createdTask);
    });

    it('should throw NotFoundError if task does not exist', () => {
      expect(() => repository.showTask(999)).toThrow(NotFoundError);
    });
  });

  describe('editTask', () => {
    it('should update specified fields on the task', () => {
      const originalTask = repository.createTask({ title: 'Original Title', completed: false });

      const updatedTask = repository.editTask(originalTask.id, { title: 'Updated Title', completed: true });

      expect(updatedTask.title).toBe('Updated Title');
      expect(updatedTask.completed).toBe(true);
    });

    it('should throw NotFoundError if task to edit does not exist', () => {
      expect(() => repository.editTask(999, { title: 'Impossible' })).toThrow(NotFoundError);
    });
  });

  describe('deleteTask', () => {
    it('should delete the task with the specified ID', () => {
      const taskToDelete = repository.createTask({ title: 'Delete Me', completed: false });

      repository.deleteTask(taskToDelete.id);

      expect(() => repository.showTask(taskToDelete.id)).toThrow(NotFoundError);
      expect(repository.listTasks()).toHaveLength(0);
    });

    it('should throw NotFoundError if task to delete does not exist', () => {
      expect(() => repository.deleteTask(999)).toThrow(NotFoundError);
    });
  });
});
