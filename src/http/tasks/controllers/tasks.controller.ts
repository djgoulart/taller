// src/controllers/tasks.controller.ts
import { Request, RequestHandler, Response } from 'express';
import { InMemoryTaskRepository } from './../../../repositories/in-memory-task-repository';
import { NotFoundError } from './../../../shared/errors/not-found-error';

type TaskBody = {
  title?: string,
  completed?: boolean
}

const repository = new InMemoryTaskRepository();

export const tasksController = {

  listTasks: ((req: Request, res: Response): void => {
    const tasks = repository.listTasks();
    res.json(tasks);
  }) as RequestHandler,

  showTask: (req: Request, res: Response): void => {
    try {
      const id = parseInt(req.params.id, 10);
      const task = repository.showTask(id);
      res.json(task);
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  },

  createTask: (req: Request, res: Response): void => {
    const { title, completed } = req.body;

    if (typeof title !== 'string' || !title) {
      res.status(400).json({ message: 'title must be a string' });
      return;
    }

    const newTask = repository.createTask({
      title,
      completed: completed ?? false,
    });

    res.status(201).json(newTask);
  },

   editTask: ((req: Request, res: Response): void => {
    try {
      const id = parseInt(req.params.id, 10);
      const { title, completed } = req.body;

      if (typeof title !== 'undefined') {
        if (typeof title !== 'string' || !title.trim()) {
          res.status(400).json({ message: 'title must be a non-empty string' });
          return;
        }
      }

      const updateFields = {} as TaskBody;

      if (typeof title !== 'undefined') {
        updateFields.title = title.trim(); 
      }

      if (typeof completed !== 'undefined') {
        updateFields.completed = completed;
      }

      const updatedTask = repository.editTask(id, updateFields);
      
      res.json(updatedTask);
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }) as RequestHandler,

  deleteTask: ((req: Request, res: Response): void => {
    try {
      const id = parseInt(req.params.id, 10);
      repository.deleteTask(id);
      res.status(204).send(); // 204: No Content
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }) as RequestHandler,
};
