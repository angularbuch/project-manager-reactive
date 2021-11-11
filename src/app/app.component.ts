import {Component, Inject, OnInit, Optional} from '@angular/core';
import {
  Router,
  NavigationEnd,
  ActivatedRoute,
} from '@angular/router';
import {LoginService} from './services/login-service/login-service';
import {Title} from '@angular/platform-browser';
import {TaskService} from './services/task-service/task.service';
import {Task} from './models/model-interfaces';
import {AUTH_ENABLED} from './app.tokens';
import {filter, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'pjm-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {

  defaultTitle = 'title';

  numberInProgress!: number;
  numberInProgress$!: Observable<number>;

  constructor(@Optional() @Inject(AUTH_ENABLED) public authEnabled: boolean,
              public loginService: LoginService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private taskService: TaskService,
              private titleService: Title) {
  }

  ngOnInit(): void {
    this.defaultTitle = this.titleService.getTitle();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        this.setBrowserTitle();
      });

    this.numberInProgress$ = this.taskService.selectTasks().pipe(
      map(tasks => tasks.filter(task => task.state === 'IN_PROGRESS').length)
    );

    this.taskService.selectTasks().subscribe((tasks) => {
      this.numberInProgress = tasks.filter(
        (task: Task) => task.state === 'IN_PROGRESS').length;
    });
  }

  setBrowserTitle() {

    let title = this.defaultTitle;
    let route = this.activatedRoute;
    // firstChild gibt die Haupt-Kindroute der übergebenen Route zurück
    while (route.firstChild) {
      route = route.firstChild;
      title = route.snapshot.data['title'] || title;
    }
    this.titleService.setTitle(title);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['login']);
    return false;
  }


}

