export interface ITask {
  id: number;
  title: string;
  completed: boolean;
}

export class Task {
  private _id: number;
  private _title: string;
  private _completed: boolean;

  constructor({ id, title, completed }: ITask) {
    this._id = id;
    this._title = title;
    this._completed = completed;
  }

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get completed(): boolean {
    return this._completed;
  }

  set completed(value: boolean) {
    this._completed = value;
  }
}
