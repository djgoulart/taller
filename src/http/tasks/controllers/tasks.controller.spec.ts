import { Request, Response } from 'express';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { tasksController } from './tasks.controller';
import { InMemoryTaskRepository } from './../../../repositories/in-memory-task-repository';
import { NotFoundError } from './../../../shared/errors/not-found-error';

describe('tasksController', () => {

  let listTasksSpy: ReturnType<typeof vi.fn>;
  let showTaskSpy: ReturnType<typeof vi.fn>;
  let createTaskSpy: ReturnType<typeof vi.fn>;
  let editTaskSpy: ReturnType<typeof vi.fn>;
  let deleteTaskSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    listTasksSpy = vi.spyOn(InMemoryTaskRepository.prototype, 'listTasks') as unknown as ReturnType<typeof vi.fn>;
    showTaskSpy = vi.spyOn(InMemoryTaskRepository.prototype, 'showTask') as unknown as ReturnType<typeof vi.fn>;
    createTaskSpy = vi.spyOn(InMemoryTaskRepository.prototype, 'createTask') as unknown as ReturnType<typeof vi.fn>;
    editTaskSpy = vi.spyOn(InMemoryTaskRepository.prototype, 'editTask') as unknown as ReturnType<typeof vi.fn>;
    deleteTaskSpy = vi.spyOn(InMemoryTaskRepository.prototype, 'deleteTask') as unknown as ReturnType<typeof vi.fn>;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  
  function mockReqRes(overrides?: Partial<Request>): { req: Request; res: Response } {
    const req = {
      body: {},
      params: {},
      ...overrides,
    } as Request;

    const res = {
      json: vi.fn().mockReturnThis(),
      status: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    } as unknown as Response;

    return { req, res };
  }

  describe('listTasks', () => {
    it('should return tasks via res.json', () => {
      const tasks = [
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: true },
      ];

      listTasksSpy.mockReturnValueOnce(tasks);

      const { req, res } = mockReqRes();

      tasksController.listTasks(req, res, () => {});

      expect(listTasksSpy).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(tasks);
    });
  });

  describe('showTask', () => {
    it('should return a task if found', () => {
      const mockTask = { id: 123, title: 'Found Task', completed: false };
      showTaskSpy.mockReturnValueOnce(mockTask);

      const { req, res } = mockReqRes({ params: { id: '123' } });
      tasksController.showTask(req, res);

      expect(showTaskSpy).toHaveBeenCalledWith(123);
      expect(res.json).toHaveBeenCalledWith(mockTask);
    });

    it('should return 404 if NotFoundError is thrown', () => {
      showTaskSpy.mockImplementation(() => {
        throw new NotFoundError('Task with ID 999 not found');
      });

      const { req, res } = mockReqRes({ params: { id: '999' } });
      tasksController.showTask(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Task with ID 999 not found' });
    });

    it('should return 500 if an unknown error is thrown', () => {
      showTaskSpy.mockImplementation(() => {
        throw new Error('Database error');
      });

      const { req, res } = mockReqRes({ params: { id: '999' } });
      tasksController.showTask(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
  });

  describe('createTask', () => {
    it('should create a new task and return 201', () => {
      const mockBody = { title: 'New Task', completed: false };
      const createdTask = { id: 1, ...mockBody };
      createTaskSpy.mockReturnValueOnce(createdTask);

      const { req, res } = mockReqRes({ body: mockBody });
      tasksController.createTask(req, res);

      expect(createTaskSpy).toHaveBeenCalledWith(mockBody);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdTask);
    });

    it('should return 400 if title is not a string', () => {
      const { req, res } = mockReqRes({ body: { title: 123, completed: false } });
      tasksController.createTask(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'title must be a string' });
      expect(createTaskSpy).not.toHaveBeenCalled();
    });
  });

  describe('editTask', () => {
    it('should update the task and return it', () => {
      const updatedTask = { id: 10, title: 'Updated', completed: true };
      editTaskSpy.mockReturnValueOnce(updatedTask);

      const { req, res } = mockReqRes({
        params: { id: '10' },
        body: { title: 'Updated', completed: true },
      });
      
      tasksController.editTask(req, res, () => {});

      expect(editTaskSpy).toHaveBeenCalledWith(10, { title: 'Updated', completed: true });
      expect(res.json).toHaveBeenCalledWith(updatedTask);
    });

    it('should return 404 if NotFoundError is thrown', () => {
      editTaskSpy.mockImplementation(() => {
        throw new NotFoundError('Task with ID 999 not found');
      });
      const { req, res } = mockReqRes({
        params: { id: '999' },
        body: { title: 'New title' },
      });

      tasksController.editTask(req, res, () => {});

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Task with ID 999 not found' });
    });

    it('should return 500 for unknown errors', () => {
      editTaskSpy.mockImplementation(() => {
        throw new Error('Unknown DB error');
      });
      const { req, res } = mockReqRes({
        params: { id: '999' },
        body: { title: 'New title' },
      });

      tasksController.editTask(req, res, () => {});

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
  });

  describe('deleteTask', () => {
    it('should return 204 on successful deletion', () => {
      const mockTask = { id: 11, title: 'Found Task', completed: false };
      deleteTaskSpy.mockReturnValueOnce(mockTask);

      const { req, res } = mockReqRes({ params: { id: '11' } });
      tasksController.deleteTask(req, res, () => {});

      expect(deleteTaskSpy).toHaveBeenCalledWith(11);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it('should return 404 if NotFoundError is thrown', () => {
      deleteTaskSpy.mockImplementation(() => {
        throw new NotFoundError('Task with ID 999 not found');
      });
      const { req, res } = mockReqRes({ params: { id: '999' } });

      tasksController.deleteTask(req, res, () => {});

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Task with ID 999 not found' });
    });

    it('should return 500 for unknown errors', () => {
      deleteTaskSpy.mockImplementation(() => {
        throw new Error('Unknown DB error');
      });
      const { req, res } = mockReqRes({ params: { id: '999' } });

      tasksController.deleteTask(req, res, () => {});

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
  });
});
