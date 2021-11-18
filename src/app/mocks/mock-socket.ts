import { Socket } from 'socket.io-client';
import { Action } from '../services/stores/action';

export class MockSocket {
  emit(action: string, data: any) {
  }
  addEventListener(l: any) {
  }
  removeEventListener(l: any) {
  }
}

export function mockIO(url: string): any {
    return new MockSocket();
}
