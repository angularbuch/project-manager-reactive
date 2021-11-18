import {InjectionToken} from '@angular/core';
import { Socket } from 'socket.io-client';

export const AUTH_ENABLED = new InjectionToken<boolean>('AUTH_ENABLED');

export const SOCKET_IO = new InjectionToken<Socket>('socket-io');

