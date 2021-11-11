import { TaskService } from '../../services/task-service/task.service';

import { RouterTestingModule } from '@angular/router/testing';

import { BehaviorSubject, of, Subject } from 'rxjs';

import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { EditTaskComponent } from './edit-task.component';
import { ShowErrorComponent } from '../../show-error/show-error.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MockTaskService } from '../../mocks/mock-task-service';
import { CustomValidatorsModule } from 'src/app/custom-validators/custom-validators.module';

@Component({
  template: '<router-outlet></router-outlet>'
})
class TestComponent {
}

describe('EditTask Component', () => {
  let taskService: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CustomValidatorsModule, FormsModule, RouterTestingModule.withRoutes([
        { path: 'new', component: EditTaskComponent },
        { path: 'edit/:id', component: EditTaskComponent }
      ],
      )],
      declarations: [EditTaskComponent, ShowErrorComponent, TestComponent],
      providers: [
        Title,
        { provide: TaskService, useClass: MockTaskService },
      ]
    });
    taskService = TestBed.inject(TaskService);
  });

  it('should load the task in Edit-Mode', async () => {
    const fixture = TestBed.createComponent(EditTaskComponent);

    const route = TestBed.inject(ActivatedRoute);
    (<Subject<Params>>route.params).next({ id: '42' });

    const element = fixture.nativeElement;
    const fakeTask = { title: 'Task1', assignee: { name: 'John' } };

    const spy = spyOn(taskService, 'getTask').and.returnValue(of(fakeTask));

    fixture.autoDetectChanges(true);
    await fixture.whenStable;
    expect(spy).toHaveBeenCalledWith('42');
    const titleInput = element.querySelector('#title');
    expect(titleInput.value).toBe(fakeTask.title);

    const assigneeInput = element.querySelector('#assignee_name');
    expect(assigneeInput.value).toBe(fakeTask.assignee.name);
  });


it('should load the correct task (with router)', fakeAsync(async () => {
  const spy = spyOn(taskService, 'getTask');
  const fakeTask = { title: 'Task1', assignee: { name: 'John' } };
  spy.and.returnValue(new BehaviorSubject(fakeTask));

  const fixture = TestBed.createComponent(TestComponent);
  const router = TestBed.inject(Router);

  router.navigateByUrl('edit/42');

  await fixture.whenStable();
  fixture.detectChanges();
  tick();
  expect(spy).toHaveBeenCalledWith('42');
  const titleInput = fixture.nativeElement.querySelector('#title');
  expect(titleInput.value).toBe(fakeTask.title);
}));

  it('should work without passing URL-Parameter', fakeAsync(() => {
    const fixture = TestBed.createComponent(TestComponent);
    const router = TestBed.inject(Router);
    router.navigateByUrl('new');
    const spy = spyOn(taskService, 'getTask');
    fixture.whenStable().then(() => {
      tick();
      expect(spy).not.toHaveBeenCalled();
      const titleInput = fixture.nativeElement.querySelector('#title');
      expect(titleInput.value).toBe('');
    });
  }));


});
