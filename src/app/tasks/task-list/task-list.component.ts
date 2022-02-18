import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { FormControl } from '@angular/forms';
import { Task } from '../../models/model-interfaces';
import { TaskService } from '../../services/task-service/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, mergeMap, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'pjm-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  selectedTaskId: string | number | null = null;

  tasks$!: Observable<any>;

  destroyed$ = new Subject<void>();

  searchTerm = new FormControl();

  constructor(private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit() {
      this.tasks$ = this.searchTerm.valueChanges.pipe(
        debounceTime(400),
        mergeMap(query => this.taskService.findTasks(query)),
        tap(tasks => console.log('Tasks:', tasks)));

      const paramsStream$ = this.route.queryParams.pipe(
        map(params => decodeURI(params['query'] ?? '')),
        tap(query => this.searchTerm.setValue(query)));

      const searchTermStream$ = this.searchTerm.valueChanges.pipe(
        debounceTime(400),
        tap(query => this.adjustBrowserUrl(query)));

      this.tasks$ = merge(
        paramsStream$,
        searchTermStream$,
        this.taskService.taskSaved$
      ).pipe(
        distinctUntilChanged(),
        switchMap(() => this.taskService.findTasks(this.searchTerm.value))
      );
    /*
    this.tasks$ = this.taskService.selectTasks().pipe(
      takeUntil(this.destroyed$)
    );
    */
          
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }


  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe();
  }

  selectTask(taskId: string | number) {
    this.selectedTaskId = taskId;
    this.router.navigate([{ outlets: { 'right': ['overview', taskId] } }], { relativeTo: this.route });
  }

  findTasks(queryString: string) {
    // jetzt über type-ahead gelöst
    // this.tasks$ = this.taskService.findTasks(queryString);
    // this.adjustBrowserUrl(queryString);
  }

  adjustBrowserUrl(queryString = '') {
    const absoluteUrl = this.location.path().split('?')[0];
    const queryPart = queryString !== '' ? `query=${queryString}` : '';

    this.location.replaceState(absoluteUrl, queryPart);
  }

}
