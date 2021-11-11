import { BehaviorSubject, Observable } from 'rxjs';
import {Task} from '../../models/model-interfaces';
import {Injectable} from '@angular/core';
import { Action, ADD, EDIT, LOAD, REMOVE } from './action';

@Injectable({
  providedIn: 'root'
})
export class TaskStore {
  private tasks: Task[] = [];
  private items$ = new BehaviorSubject<Task[]>([]);

  selectItems(): Observable<Task[]> {
    return this.items$.asObservable();
  }

  dispatch(action: Action) {
    this.tasks = this.reduce(this.tasks, action);
    this.items$.next(this.tasks);
  }

  private reduce(tasks: Task[], action: Action) {
    switch (action.type) {
      case LOAD:
        return [...action.data];
      case ADD:
        return [...tasks, action.data];
      case EDIT:
        return tasks.map(task => {
          const editedTask = action.data;
          if (task.id !== editedTask.id) {
            return task;
          }
          return editedTask;
        });
      case REMOVE:
        return tasks.filter(task => task.id !== action.data.id);
      default:
        return tasks;
    }
  }
}
