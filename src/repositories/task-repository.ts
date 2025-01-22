import { ITask, Task } from "../entities/task";

export interface TaskRepository {
  listTasks(): Task[]
  createTask(data: Omit<ITask, 'id'>): Task
  showTask(id: number): Task
  editTask(id: number, updates: Partial<{ title: string; completed: boolean }>): Task
  deleteTask(id: number): void
}