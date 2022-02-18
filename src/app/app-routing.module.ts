import {Routes, RouterModule, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {SettingsComponent} from './settings/settings.component';
import {AboutComponent} from './about/about.component';
import {LoginComponent, LoginGuard} from './login';
import {NotFoundComponent} from './not-found/not-found.component';
import {tasksRoutes, tasksRoutingComponents} from './tasks/tasks.routing';
import {NgModule} from '@angular/core';
import {ShowErrorComponent} from "./show-error/show-error.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {CustomValidatorsModule} from "./custom-validators/custom-validators.module";
import {RxDemoComponent} from "./rxdemo/rxdemo.component";
import {TaskItemComponent} from "./tasks/task-list/task-item.component";

export function resolveToken(route: ActivatedRouteSnapshot,
                             state: RouterStateSnapshot) {
  return localStorage.getItem('token');
}

export const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, data: {title: 'Startseite'}}, // Dashboard unter /dashboard
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {
    path: 'settings', component: SettingsComponent,
    data: {
      title: 'Einstellungen'
    },
  },
  {path: 'about', component: AboutComponent, data: {title: 'Über uns'}},
  {path: 'login', component: LoginComponent},
  {path: 'rxdemo', component: RxDemoComponent, data: {title: 'RxJS Demo'}},
  {path: 'tasks', canActivate: [LoginGuard], children: tasksRoutes},
  /** Redirect Konfigurationen **/
  {path: '**', component: NotFoundComponent}, // immer als letztes konfigurieren - erste Route die matched wird angesteuert
];

@NgModule({
  declarations: [
    DashboardComponent,
    SettingsComponent,
    AboutComponent,
    LoginComponent,
    NotFoundComponent,
    ShowErrorComponent,
    RxDemoComponent,
    TaskItemComponent,
    ...tasksRoutingComponents],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomValidatorsModule,
    RouterModule.forRoot(routes, {useHash: false})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

