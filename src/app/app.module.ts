import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { appRouting, routingComponents } from './app.routing';
import { AUTH_ENABLED, SOCKET_IO } from './app.tokens';
import { mockIO } from './mocks/mock-socket';
import { ShowErrorComponent } from './show-error/show-error.component';
import { TaskItemComponent } from './tasks/task-list/task-item.component';
import { CustomValidatorsModule } from './custom-validators/custom-validators.module';


export function socketIoFactory(): SocketIOClientStatic {
  if (environment.e2eMode) {
    return mockIO as SocketIOClientStatic;
  }
  return io;
}

const enableAuthentication = false;

@NgModule({
  imports: [BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    appRouting,
    HttpClientModule,
    CustomValidatorsModule,
  ],
  providers: [
    Title,
    {provide: AUTH_ENABLED, useValue: enableAuthentication},
    {provide: SOCKET_IO, useFactory: socketIoFactory},
  ],
  declarations: [AppComponent,
    routingComponents,
    TaskItemComponent,
    ShowErrorComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
