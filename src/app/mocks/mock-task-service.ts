import { BehaviorSubject, Observable, of } from 'rxjs';
import {Task} from '../models/model-interfaces';

export class MockTaskService {
  selectTasks(): Observable<Task[]> {
    return of([]);
  }

  findTasks(query: string) {
    return of([]);
  }

  saveTask(task: Task) {
  }

  deleteTask(task: Task): Observable<Task> {
    return of({});
  }

  getTask(id: number | string) {
    return of({});
  }
}
