import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AUTH_ENABLED, SOCKET_IO} from './app.tokens';
import {io, Socket} from 'socket.io-client';
import {AppRoutingModule} from "./app-routing.module";


export function socketIoFactory(): (url: string) => Socket {
  return io;
}

const enableAuthentication = false;

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule],
  providers: [
    Title,
    {provide: AUTH_ENABLED, useValue: enableAuthentication},
    {provide: SOCKET_IO, useFactory: socketIoFactory},
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
