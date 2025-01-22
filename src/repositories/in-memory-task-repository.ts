import { ITask, Task } from "../entities/task";
import { NotFoundError } from "../shared/errors/not-found-error";
import { TaskRepository } from "./task-repository";


export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [];
  private nextId: number = 1;

  listTasks(): Task[] {
    return this.tasks;
  }

  createTask({ title, completed }: Omit<ITask, 'id'>): Task {
    const newTask = new Task({
      id: this.nextId++,
      title,
      completed
    });

    this.tasks.push(newTask);
    return newTask;
  }
  
  showTask(id: number): Task {
    const task = this.tasks.find((t) => t.id === id);
    
    if (!task) {
      throw new NotFoundError();
    }

    return task;
  }

  editTask(id: number, updates: Partial<{ title: string; completed: boolean }>): Task {
    const task = this.showTask(id);

    if (updates.title !== undefined) {
      task.title = updates.title;
    }

    if (updates.completed !== undefined) {
      task.completed = updates.completed;
    }

    return task;
  }
  
  deleteTask(id: number): void {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    
    if (taskIndex === -1) {
      throw new NotFoundError();
    }
    
    this.tasks.splice(taskIndex, 1);
  }
  
}